import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TranslateSection from "../components/TranslateSection";
import LiveChatSection from "../components/LiveChatSection";
import ChatInput from "../components/ChatInput";
import { IoVideocam } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { FiRefreshCcw } from "react-icons/fi";
import VideoChat from "../components/VideoChat";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom, conversationAtom } from "../Variables";
import ReportModal from "../components/ReportModal";

const Home = () => {
	const [user, setUser] = useAtom(userAtom);
	const [conversation, setConversation] = useAtom(conversationAtom);
	const { sessionId } = useParams();
	const [session, setSession] = useState(null);
	const [isReportModalOpen, setIsReportModalOpen] = useState(false);
	useEffect(() => {
		fetch(`${import.meta.env.VITE_SERVER_URL}/api/session/${sessionId}`)
			.then((response) => response.json())
			.then((response) => {
				setSession(response);
				let tempConversation = [];
				for (const message of response?.conversation) {
					tempConversation.push({
						type: message?.role,
						speaker: message?.role == "user" ? user?.displayName : response?.module?.name,
						message: message?.content[0]?.text,
					});
				}
				setConversation(tempConversation);
			})
			.catch((error) => {});
		let autoScrollInterval = setInterval(() => {
			document.getElementById("chatScroller").scrollTop = document.getElementById("chatScroller").scrollHeight;
		}, 2000);
	}, []);
	return (
		<div className="flex min-h-screen bg-slate-50 noScrollBars overflow-hidden">
			<Sidebar activeTab={1} />
			<div className="w-full ml-20">
				{/* Top Bar */}
				<div className="flex items-center justify-between mb-2 bg-white p-4 border-b border-slate-300 fixed top-0 left-20 w-[calc(100vw-5rem)] h-20 z-10">
					<div className="flex items-center space-x-3">
						<div className="w-8 h-8 rounded-md text-white bg-purple-500 flex items-center justify-center">
							<IoVideocam className="w-5 h-5" />
						</div>
						<div className="text-lg font-medium">Room Meeting</div>
						<div className="px-3 py-1 text-sm bg-purple-50 text-purple-500 rounded-full">Live Record</div>
					</div>
					<div className="flex items-center space-x-6">
						{/* User profile */}
						<div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-xl">
							<div className="w-9 h-9 rounded-xl overflow-hidden">
								<img src={user?.photoURL} alt="User" className="w-full h-full object-cover" />
							</div>
							<Link to="/profile" className="hover:text-purple-700 transition">
								<span className="font-medium">{user?.displayName}</span>
							</Link>
						</div>
					</div>
				</div>
				{/* Main Content */}
				<div className="flex-1 flex flex-row mt-20">
					{/* Center Content */}
					<div className="flex-1">
						<div className="p-6">
							{/* Generate Link */}
							<div className="bg-white rounded-2xl p-3 mb-6 border border-slate-300 flex items-center justify-between">
							<div>
									<div className="font-semibold">{session?.module?.name}</div>
									<div className="text-sm text-gray-500 mb-2 truncate w-96">{session?.module?.description}</div>
								</div>
								{session?.isReported ? (
									<button 
										onClick={() => setIsReportModalOpen(true)}
										className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
									>
										See Report
									</button>
								) : (
									<div className="flex items-center justify-between w-96 p-2 border border-slate-300 bg-slate-200/25 rounded-xl text-sm">
										<input type="text" className="w-full px-2 pr-6 focus:outline-none" defaultValue="us04web.zoom.us/1892789" />
										<div className="w-9 h-9 bg-purple-300 text-purple-900 rounded-md flex items-center justify-center">
											<FiRefreshCcw />
										</div>
									</div>
								)}
							</div>

							<VideoChat session={session} />
						</div>
					</div>

					{/* Right Sidebar */}
					<div className="w-96   p-6 pl-0 space-y-4 h-[calc(100vh-5rem)] ">
						{/* <TranslateSection /> */}
						{/* <LiveChatSection /> */}
						<ChatInput session={session} />
					</div>
				</div>
			</div>
			<ReportModal 
				report={session?.report}
				isOpen={isReportModalOpen} 
				onClose={() => setIsReportModalOpen(false)} 
			/>
		</div>
	);
};

export default Home;
