import { React, useRef, useEffect } from "react";
import { useAtomValue, useAtom } from "jotai";
import { isRecordingAtom, conversationAtom, speakFunctionAtom, userAtom } from "../Variables";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import Artyom from "artyom.js";

const AudioVisualizer = () => {
	const [user, setUser] = useAtom(userAtom);
	const [isRecording, setIsRecording] = useAtom(isRecordingAtom);
	const [conversation, setConversation] = useAtom(conversationAtom);
	const [speakFunction, setSpeakFunction] = useAtom(speakFunctionAtom);
	const audioRef = useRef();
	const waveSurferRef = useRef(null);
	const recordRef = useRef(null);
	const artyomRef = useRef(null);

	useEffect(() => {
		// Initialize Artyom and add a wildcard command to capture any speech.
		// This command will fire whenever Artyom recognizes a phrase.
		artyomRef.current = new Artyom();
		artyomRef.current.addCommands({
			// The wildcard "*" allows any spoken words to be captured.
			indexes: ["*"],
			smart: true,
			action: (i, wildcard) => {
				const currentTranscript = wildcard.trim();
				console.log("Artyom recognized:", currentTranscript);

				// Here, we mimic your original logic to either update the last message
				// if the new transcript contains it or add a new conversation message?.
				setConversation((prev) => {
					const lastMessage = prev[prev.length - 1];
					if (lastMessage && lastMessage?.message && currentTranscript.includes(lastMessage?.message)) {
						return [
							...prev.slice(0, -1),
							{
								speaker: user?.displayName,
								message: currentTranscript,
								type: "user",
							},
						];
					}
					return [
						...prev,
						{
							speaker: user?.displayName,
							message: currentTranscript,
							type: "user",
						},
					];
				});
				try {
					setSpeakFunction(currentTranscript);
					// add auto scroll to the bottom of the conversation
					document.getElementById("chatScroller").scrollTop = document.getElementById("chatScroller").scrollHeight;
				} catch (e) {
					console.error("Error setting speak function:", e);
				}
			},
		});

		// WaveSurfer initialization
		if (audioRef.current) {
			waveSurferRef.current = WaveSurfer.create({
				container: audioRef.current,
				waveColor: "#59168b",
				progressColor: "#dab2ff",
				height: 50,
				barWidth: 3,
				barHeight: 5,
				barGap: 5,
				barRadius: 5,
				interact: false,
				cursorWidth: 0,
				normalize: true,
			});

			// Initialize the Record plugin
			recordRef.current = waveSurferRef.current.registerPlugin(
				RecordPlugin.create({
					renderRecordedAudio: false,
					scrollingWaveform: true,
					continuousWaveform: false,
				})
			);
		}

		// Cleanup: destroy WaveSurfer and stop Artyom when the component unmounts.
		return () => {
			if (waveSurferRef.current) {
				waveSurferRef.current?.destroy();
			}
			if (artyomRef.current) {
				artyomRef.current.fatality();
			}
		};
	}, [setConversation]);

	useEffect(() => {
		if (artyomRef.current && recordRef.current) {
			if (isRecording) {
				// Start Artyom listening when recording starts.
				artyomRef.current
					.initialize({
						lang: "en-US",
						continuous: true,
						listen: true,
						debug: false,
						speed: 1,
					})
					.then(() => {
						console.log("Artyom is listening...");
					})
					.catch((err) => {
						console.error("Artyom initialization error:", err);
					});
				recordRef.current.startRecording();
			} else {
				// Stop Artyom listening when recording stops.
				artyomRef.current.fatality().then(() => {
					console.log("Artyom has been stopped.");
				});
				recordRef.current.stopRecording();
			}
		}
	}, [isRecording]);

	return (
		<div className="flex items-center gap-2">
			<div style={{ width: "200px", height: "50px" }} className="audio" ref={audioRef}></div>
		</div>
	);
};

const ChatInput = () => {
	const conversation = useAtomValue(conversationAtom);
	const [user, setUser] = useAtom(userAtom);
	return (
		<div className="bg-white rounded-2xl p-3 border border-slate-300 h-full flex flex-col">
			<div className="flex flex-col  items-center justify-between bg-slate-200/25 shadow-inner rounded-xl p-3 h-32">
				<div className="flex items-center justify-center">
					<img className="w-12 h-12 aspect-square rounded-full mr-2" src={user?.photoURL} alt="User" />
					<div className="w-64">
						<div className="text-sm">{user?.displayName}</div>
						<div className="text-xs text-gray-500">Speaking...</div>
					</div>
				</div>
				<div className="w-fit">
					<AudioVisualizer />
				</div>
			</div>
			<div id="chatScroller" className="mt-4 px-4 text-sm text-gray-700 h-full overflow-y-auto space-y-4 noScrollBars scroll-smooth">
				{conversation.map((message, index) => (
					<div key={index} className="bg-gray-100 p-3 rounded-lg">
						<div className={`text-xs font-medium ${message?.type === "user" ? "text-purple-600" : "text-blue-600"} mb-1`}>{message?.speaker}</div>
						<p className="text-xs leading-relaxed">{message?.message}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default ChatInput;
