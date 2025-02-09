import React, { useEffect, useState, useRef } from "react";
import { useAtom } from "jotai";
import { isRecordingAtom, speakFunctionAtom,conversationAtom } from "../Variables";
import { FaCirclePlay } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import StreamingAvatar, { AvatarQuality, StreamingEvents, TaskType, TaskMode, VoiceEmotion } from "@heygen/streaming-avatar";

const VideoChat = ({session}) => {
	// Existing recording state
	const [isRecording, setIsRecording] = useAtom(isRecordingAtom);
	const [conversation,setConversation] = useAtom(conversationAtom);
	const [isLoading, setIsLoading] = useState(false);
	// New avatar-related state
	const [streamingAvatar, setStreamingAvatar] = useState(null);
	const [stream, setStream] = useState(null);
	const videoRef = useRef(null);
	const avatarId = session?.module?.avatarId;
	const knowledgeId = session?.module?.knowledgeId;
	const language = "en";
	const [speakFunction, setSpeakFunction] = useAtom(speakFunctionAtom);

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
					content: [{"type": "text", "text": conversation[i].message}],
				});
			}
			// [
			// 	{
			// 		"role": "user",
			// 		"content": [{"type": "text", "text": speakFunction}],
			// 	}
			// ]

			fetch(`${import.meta.env.VITE_SERVER_URL}/api/generate/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					messages: tempMessages,
					system: session?.module?.system,
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.status === "success") {
						setConversation((prev) => {
							return [
								...prev,
								{
									speaker: "John Doe",
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
		<div className="bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl overflow-hidden mb-6 border border-slate-300 w-full ">
			<div className="w-full h-fit aspect-[16/9] relative">
				{/* Avatar video feed */}
				{stream && <video ref={videoRef} autoPlay playsInline className="object-cover w-full h-full" />}
				<div className={"absolute flex space-x-3 " + (!stream ? "w-full justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : "justify-between w-full md:w-auto bottom-4 left-4")}>
					{!stream && (
						<button onClick={startChatCreation} className="p-4 hover:scale-125 transition-all rounded-full aspect-square bg-white/80 hover:bg-white cursor-pointer">
							{!isLoading && <FaCirclePlay className="h-8 w-8 text-gray-700" />}
							{isLoading && <AiOutlineLoading3Quarters className="h-8 w-8 text-gray-700 animate-spin" />}
						</button>
					)}
					{stream && (
						<>
							<button onClick={handleRecordingToggle} className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
								{!isRecording ? (
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
									</svg>
								) : (
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
									</svg>
								)}
							</button>
							<button onClick={handleEndCall} className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
								</svg>
							</button>
						</>
					)}
				</div>
				{stream && (
					<button className="absolute bottom-[5%] right-[3%] w-[10%] h-10 text-center rounded-lg bg-gradient-to-br from-purple-300 to-purple-500 text-white text-sm hover:shadow-2xl hover:shadow-white transition duration-200 border border-purple-900 overflow-hidden">
						<div className="absolute inset-x-0 h-1 w-full mx-auto -top-px shadow-2xl  bg-purple-700" />
						<span className="relative z-20 font-semibold text-xl">AI Prep</span>
					</button>
				)}
			</div>
		</div>
	);
};

export default VideoChat;
