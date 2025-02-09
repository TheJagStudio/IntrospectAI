import React, { useEffect, useState, useRef } from "react";
import { useAtom } from "jotai";
import { isRecordingAtom, speakFunctionAtom, conversationAtom } from "../Variables";
import { FaCirclePlay } from "react-icons/fa6";
import { IoMicOffOutline, IoMicOutline } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import StreamingAvatar, { AvatarQuality, StreamingEvents, TaskType, TaskMode, VoiceEmotion } from "@heygen/streaming-avatar";
import ReportModal from "./ReportModal";

const VideoChat = ({ session }) => {
	// Existing recording state
	const [isRecording, setIsRecording] = useAtom(isRecordingAtom);
	const [conversation, setConversation] = useAtom(conversationAtom);
	const [isLoading, setIsLoading] = useState(false);
	// New avatar-related state
	const [streamingAvatar, setStreamingAvatar] = useState(null);
	const [stream, setStream] = useState(null);
	const videoRef = useRef(null);
	const avatarId = session?.module?.avatarId;
	const knowledgeId = session?.module?.knowledgeId;
	const language = "en";
	const [speakFunction, setSpeakFunction] = useAtom(speakFunctionAtom);
	const [report, setReport] = useState("");
	const [isReportModalOpen, setIsReportModalOpen] = useState(false);
	const [isGeneratingReport, setIsGeneratingReport] = useState(false);

	// Utility functions from Demo
	const generateRandomString = (length = 32) => {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join("");
	};

	const generateApiKey = async () => {
		const zid = generateRandomString();
		const headers = {
			"x-zid": zid,
		};
		const params = new URLSearchParams({
			zid: zid,
			sid: "no_sid",
		});
		try {
			const response = await fetch(`https://thejagstudio-corsanywhere1.hf.space/https://api2.heygen.com/v1/pacific/account/free.get?${params}`, { headers });
			const data = await response.json();
			return data.data.token;
		} catch (error) {
			console.error("Error generating API key:", error);
			return null;
		}
	};

	const fetchAccessToken = async () => {
		try {
			const apiKey = await generateApiKey();
			if (!apiKey) throw new Error("Failed to generate API key");
			const response = await fetch("https://thejagstudio-corsanywhere1.hf.space/https://api.heygen.com/v1/streaming.create_token", {
				method: "POST",
				headers: { "x-api-key": apiKey },
			});
			let token = await response.text();
			token = JSON.parse(token).data.token;
			// console.log("Access Token:", token);
			return token;
		} catch (error) {
			console.error("Error fetching access token:", error);
			return "";
		}
	};

	const startChatCreation = async () => {
		setIsLoading(true);
		const token = await fetchAccessToken();
		if (!token) {
			console.error("No valid token received.");
			return;
		}
		const avatar = new StreamingAvatar({ token });
		// Set up event listeners
		avatar.on(StreamingEvents.AVATAR_START_TALKING, () => {
			console.log("Avatar started talking");
		});
		avatar.on(StreamingEvents.STREAM_DISCONNECTED, () => {
			console.log("Stream disconnected");
			cleanup();
		});
		avatar.on(StreamingEvents.STREAM_READY, (event) => {
			// console.log("Stream ready", event.detail);
			setStream(event.detail);
			setIsLoading(false);
		});
		try {
			await avatar.createStartAvatar({
				version: "v2",
				wait_list: false,
				video_encoding: "H264",
				quality: AvatarQuality.High,
				avatarName: avatarId,
				knowledgeId: knowledgeId,
				voice: { rate: 1.0, emotion: VoiceEmotion.NEUTRAL },
				language: language,
			});
			setStreamingAvatar(avatar);
		} catch (error) {
			console.error("Error initializing avatar session:", error);
		}
	};

	const cleanup = () => {
		if (streamingAvatar) {
			streamingAvatar.stopAvatar();
			setStreamingAvatar(null);
			setStream(null);
		}
	};

	// UI Handlers
	const handleRecordingToggle = async () => {
		if (!isRecording) {
			try {
				setIsRecording(true);
			} catch (error) {
				console.error("Error starting recording:", error);
			}
		} else {
			try {
				setIsRecording(false);
			} catch (error) {
				console.error("Error stopping recording:", error);
			}
		}
	};

	const handleEndCall = () => {
		console.log("Call ended");
		cleanup();
	};

	async function speechGen() {
		if (streamingAvatar) {
			let tempMessages = [];
			for (let i = 0; i < conversation.length; i++) {
				tempMessages.push({
					role: conversation[i].type,
					content: [{ type: "text", text: conversation[i].message }],
				});
			}

			fetch(`${import.meta.env.VITE_SERVER_URL}/api/generate/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					messages: tempMessages,
					system: session?.module?.system,
					sessionId: session?.uuid,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.status === "success") {
						setConversation((prev) => {
							return [
								...prev,
								{
									speaker: session?.module?.name,
									message: data.response,
									type: "assistant",
								},
							];
						});
						streamingAvatar.speak({
							text: data.response,
							taskType: TaskType.REPEAT,
							taskMode: TaskMode.SYNC,
						});
					} else {
						console.error("API Error:", data.message);
					}
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
	}

	const handleGenerateReport = () => {
		setIsGeneratingReport(true);
		let tempMessages = [];
		for (let i = 0; i < conversation.length; i++) {
			tempMessages.push({
				role: conversation[i].type,
				content: [{ type: "text", text: conversation[i].message }],
			});
		}

		fetch(`${import.meta.env.VITE_SERVER_URL}/api/generate-report/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				messages: tempMessages,
				sessionId: session?.uuid,
				reportSystem: session?.module?.reportSystem,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.status === "success") {
					// You can add UI feedback here if needed
					setReport(data.response);
					localStorage.setItem("introspectReport", data.response);
					setIsReportModalOpen(true);
				} else {
					console.error("API Error:", data.message);
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			})
			.finally(() => {
				setIsGeneratingReport(false);
			});
	};

	// Attach stream to video element when available
	useEffect(() => {
		if (stream && videoRef.current) {
			videoRef.current.srcObject = stream;
			videoRef.current.play().catch((error) => console.error("Error playing video:", error));
		}
	}, [stream]);

	useEffect(() => {
		speechGen();
	}, [speakFunction]);

	return (
		<>
			{isGeneratingReport && (
				<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
					<div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-3">
						<AiOutlineLoading3Quarters className="h-8 w-8 text-purple-500 animate-spin" />
						<p className="text-gray-700 font-medium">Generating Report...</p>
					</div>
				</div>
			)}
			<div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl overflow-hidden mb-6 border border-slate-300 w-full ">
				<div className="w-full h-fit aspect-[16/9] relative">
					{/* Avatar video feed */}
					{stream && <video ref={videoRef} autoPlay playsInline className="object-cover w-full h-full" />}
					{!stream && <img src={session?.module?.profileImg} className="object-cover w-full h-full blur-xl animate-pulse duration-[3000] opacity-50" />}
					<div className={"absolute flex space-x-3 " + (!stream ? "w-full justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : "justify-between w-full md:w-auto bottom-[5%] left-[3%]")}>
						{!stream && (
							<button onClick={startChatCreation} className="p-4 hover:scale-125 transition-all rounded-full aspect-square bg-white/80 hover:bg-white cursor-pointer">
								{!isLoading && <FaCirclePlay className="h-8 w-8 text-gray-700" />}
								{isLoading && <AiOutlineLoading3Quarters className="h-8 w-8 text-gray-700 animate-spin" />}
							</button>
						)}
						{stream && (
							<>
								<button onClick={handleRecordingToggle} className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
									{!isRecording ? <IoMicOffOutline className="h-6 w-6" /> : <IoMicOutline className="h-6 w-6" />}
								</button>
								<button onClick={handleEndCall} className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
									</svg>
								</button>
							</>
						)}
					</div>
					<button onClick={handleGenerateReport} className="group absolute hue-rotate-[-160deg] bottom-[5%] right-[3%] outline-0 bg-sky-500 [--sz-btn:40px] [--space:calc(var(--sz-btn)/5.5)] [--gen-sz:calc(var(--space)*2)] [--sz-text:calc(var(--sz-btn)-var(--gen-sz))] h-[var(--sz-btn)] w-fit group-hover:!w-10 border border-solid border-transparent rounded-lg flex items-center justify-center aspect-square cursor-pointer transition-transform duration-200 active:scale-[0.95] bg-[linear-gradient(45deg,#b27c0a,#ffd60f)] [box-shadow:#3c40434d_0_1px_2px_0,#3c404326_0_2px_6px_2px,#0000004d_0_30px_60px_-30px,#34343459_0_-2px_6px_0_inset]">
						<svg className="absolute z-10 overflow-visible transition-all duration-300 text-[#ffea50] group-hover:text-white top-[calc(var(--sz-text)/7)] left-[calc(var(--sz-text)/7)] h-[var(--gen-sz)] w-[var(--gen-sz)] group-hover:h-[var(--sz-text)] group-hover:w-[var(--sz-text)] group-hover:left-[calc(var(--sz-text)/4)] group-hover:top-[calc(calc(var(--gen-sz))/2)]" stroke="none" viewBox="0 0 24 24" fill="currentColor">
							<path fillRule="evenodd" clipRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" />
						</svg>
						<span className=" font-extrabold leading-none text-yellow-900 transition-all duration-200 group-hover:scale-100 group-hover:translate-x-6 group-hover:text-white group-hover:pr-8 px-3">Introspect</span>
					</button>
				</div>
			</div>
			<ReportModal report={report} isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
		</>
	);
};

export default VideoChat;
