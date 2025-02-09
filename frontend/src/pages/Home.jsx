import React from "react";
import TranslateSection from "../components/TranslateSection";
import LiveChatSection from "../components/LiveChatSection";
import ChatInput from "../components/ChatInput";
import { CgMenuGridO } from "react-icons/cg";
import { IoVideocam } from "react-icons/io5";
import { FaBookmark, FaCalendarDays } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { FiRefreshCcw } from "react-icons/fi";
import VideoChat from "../components/VideoChat";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="flex min-h-screen bg-slate-50 noScrollBars overflow-hidden">
			{/* Left Sidebar */}
			<div className="w-20 bg-white border-r border-slate-300 fixed top-0 left-0 h-full z-10">
				<div className="flex flex-col items-center">
					<div className="border-b border-slate-300 w-full flex items-center justify-center h-20">
						<div className="w-full h-full transition-transform cursor-pointer">
							<img src="https://img.freepik.com/premium-vector/round-circle-logo-icon-sign-symbol-red-design-vector-illustration_685751-586.jpg" alt="Logo" className="w-full h-full object-contain p-5 hue-180" />
						</div>
					</div>
					<div className="flex flex-col items-center space-y-6 py-5">
						{/* Replace all icons with placeholders - you should import proper icons */}
						{[<CgMenuGridO />, <IoVideocam />, <FaBookmark />, <FaCalendarDays />, <IoMdSettings />].map((icon, index) => (
							<div key={index} className="w-14 h-14 bg-slate-100 border border-slate-300 rounded-xl flex items-center justify-center transition-all hover:bg-emerald-100 hover:border-emerald-300 hover:text-emerald-600 cursor-pointer">
								{icon}
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="w-full ml-20">
				{/* Top Bar */}
				<div className="flex items-center justify-between mb-2 bg-white p-4 border-b border-slate-300 fixed top-0 left-20 w-[calc(100vw-5rem)] h-20 z-10">
					<div className="flex items-center space-x-3">
						<div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
						<div className="text-lg font-medium">Room Meeting</div>
						<div className="px-3 py-1 text-sm bg-red-50 text-red-500 rounded-full">Live Record</div>
					</div>
					<div className="flex items-center space-x-6">
						{/* Control buttons */}
						<div className="flex space-x-2">
							{["code", "screen", "settings"].map((control, index) => (
								<div key={index} className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center transition-all hover:bg-emerald-100 hover:text-emerald-600 cursor-pointer">
									{/* // TODO: Replace with proper icon component */}
								</div>
							))}
						</div>

						{/* User profile */}
						<div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-xl">
							<Link to="/landing" className="hover:text-blue-200 transition">
								<span className="font-medium">Landing</span>{" "}
							</Link>
							<div className="w-9 h-9 rounded-xl overflow-hidden">
								<img src="https://kzmjkpl20vslk25w1efi.lite.vusercontent.net/placeholder.svg?height=128&width=128" alt="User" className="w-full h-full object-cover" />
							</div>
							<Link to="/profile" className="hover:text-blue-200 transition">
								<span className="font-medium">Vincentius R</span>{" "}
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
									<div className="font-semibold">Generate Link</div>
									<div className="text-sm text-gray-500 mb-2">Language : Hindi</div>
								</div>
								<div className="flex items-center justify-between w-96 p-2 border border-slate-300 bg-slate-200/25 rounded-xl text-sm">
									<input type="text" className="w-full px-2 pr-6 focus:outline-none" defaultValue="us04web.zoom.us/1892789" />
									<div className="w-9 h-9 bg-purple-300 text-purple-900 rounded-md flex items-center justify-center">
										<FiRefreshCcw />
									</div>
								</div>
							</div>

							<VideoChat />
						</div>
					</div>

					{/* Right Sidebar */}
					<div className="w-96   p-6 pl-0 space-y-4 h-[calc(100vh-5rem)] ">
						<TranslateSection />
						{/* <LiveChatSection /> */}
						<ChatInput />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
