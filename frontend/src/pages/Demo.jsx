import React, { useEffect, useState, useRef } from "react";
import StreamingAvatar, { AvatarQuality, StreamingEvents, TaskType, TaskMode, VoiceEmotion } from "@heygen/streaming-avatar";

const Demo = () => {
	const [streamingAvatar, setStreamingAvatar] = useState(null);
	const [isVoiceChatActive, setIsVoiceChatActive] = useState(false);
	const [stream, setStream] = useState(null);
	const [avatarId] = useState("Ann_Doctor_Standing2_public");
	const [knowledgeId] = useState("4f40877e1ed34c768b9fcaa305be68df");
	const [language] = useState("en");

	const videoRef = useRef(null);

	// Utility function to generate random string
	const generateRandomString = (length = 32) => {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
	};

	// Generate HeyGen API key
	const generateApiKey = async () => {
		const zid = generateRandomString();
		const headers = {
			'accept': 'application/json, text/plain, */*',
			'accept-language': 'en-US,en;q=0.9',
			'heygen_route': 'labs',
			'origin': 'https://labs.heygen.com',
			'priority': 'u=1, i',
			'sec-ch-ua': '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
			'sec-ch-ua-mobile': '?0',
			'sec-ch-ua-platform': '"Windows"',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-site',
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
			'x-path': '/guest/interactive-avatar',
			'x-ver': '4.1.0',
			'x-zid': zid,
		};

		const params = new URLSearchParams({
			zid: zid,
			sid: 'no_sid',
		});

		try {
			const response = await fetch(`https://thejagstudio-corsanywhere1.hf.space/https://api2.heygen.com/v1/pacific/account/free.get?${params}`, {
				headers: headers
			});
			const data = await response.json();
			return data.data.token;
		} catch (error) {
			console.error("Error generating API key:", error);
			return null;
		}
	};

	// Fetch access token from your API
	const fetchAccessToken = async () => {
		try {
			const apiKey = await generateApiKey();
			if (!apiKey) throw new Error("Failed to generate API key");

			const response = await fetch("https://thejagstudio-corsanywhere1.hf.space/https://api.heygen.com/v1/streaming.create_token", {
				method: "POST",
				headers: {
					"x-api-key": apiKey,
				},
			});
			let token = await response.text();
			token = JSON.parse(token).data.token;
			console.log("Access Token:", token);
			return token;
		} catch (error) {
			console.error("Error fetching access token:", error);
			return "";
		}
	};

	// Initialize the avatar session
	const startChatCreation = async () => {
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
			console.log("Stream ready", event.detail);
			setStream(event.detail);
		});

		try {
			await avatar.createStartAvatar({
				version: "v2",
				wait_list: false,
				video_encoding: "H264",
				quality: AvatarQuality.High,
				avatarName: avatarId,
				knowledgeId: knowledgeId,
				voice: {
					// Optionally set your voice parameters here
					rate: 1.0,
					emotion: VoiceEmotion.NEUTRAL,
				},
				language: language,
			});
			setStreamingAvatar(avatar);
		} catch (error) {
			console.error("Error initializing avatar session:", error);
		}
	};

	// Start the voice chat session
	const startVoiceChat = async () => {
		if (!streamingAvatar) return;
		try {
			await streamingAvatar.startVoiceChat({ useSilencePrompt: true });
			setIsVoiceChatActive(true);
		} catch (error) {
			console.error("Error starting voice chat:", error);
		}
	};

	// Instruct the avatar to speak
	const speak = async (text) => {
		if (!streamingAvatar) return;
		try {
			await streamingAvatar.speak({
				text,
				taskType: TaskType.REPEAT,
				taskMode: TaskMode.SYNC,
			});
		} catch (error) {
			console.error("Error during speak:", error);
		}
	};

	// Cleanup resources when needed
	const cleanup = () => {
		if (streamingAvatar) {
			if (isVoiceChatActive) {
				streamingAvatar.closeVoiceChat();
				setIsVoiceChatActive(false);
			}
			streamingAvatar.stopAvatar();
			setStreamingAvatar(null);
			setStream(null);
		}
	};

	// Cleanup on component unmount
	useEffect(() => {
		return () => {
			cleanup();
		};
	}, []);

	// Attach the stream to the video element when available
	useEffect(() => {
		if (stream && videoRef.current) {
			videoRef.current.srcObject = stream;
			videoRef.current.play().catch((error) => console.error("Error playing video:", error));
		}
	}, [stream]);

	return (
		<div className="p-4">
			<h1 className="text-2xl mb-4">Avatar Demo</h1>
			<div className="space-x-2 mb-4">
				<button onClick={startChatCreation} className="btn btn-primary">
					Initialize Avatar
				</button>
				<button onClick={startVoiceChat} className="btn btn-secondary">
					Start Voice Chat
				</button>
				<button onClick={() => speak("Hello, how are you?")} className="btn btn-info">
					Test Speech
				</button>
				<button onClick={cleanup} className="btn btn-danger">
					Cleanup
				</button>
			</div>
			{stream ? <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxWidth: "600px" }} /> : <p>No video stream available.</p>}
		</div>
	);
};

export default Demo;
