import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useAtom } from "jotai";
import { userAtom } from "../Variables";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { CgMenuGridO } from "react-icons/cg";
import { IoVideocam } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa6";

const AIModules = () => {
	const [user, setUser] = useAtom(userAtom);
	const [modules, setModules] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchModules();
	}, []);

	const fetchModules = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/modules/`);
			if (!response.ok) {
				throw new Error("Failed to fetch modules");
			}
			const data = await response.json();
			setModules(data.modules);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen bg-slate-50 noScrollBars overflow-hidden">
			<Sidebar activeTab={0} />
			<div className="w-full ml-20">
				{/* Top Bar */}
				<div className="flex items-center justify-between mb-2 bg-white p-4 border-b border-slate-300 fixed top-0 left-20 w-[calc(100vw-5rem)] h-20 z-10">
					<div className="flex items-center space-x-3">
						<div className="w-8 h-8 rounded-md text-white bg-purple-500 flex items-center justify-center">
							<CgMenuGridO className="w-5 h-5" />
						</div>
						<div className="text-lg font-medium">AI Modules</div>
					</div>
					<div className="flex items-center space-x-6">
						<div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-xl">
							<div className="w-9 h-9 rounded-xl overflow-hidden">
								<img src={user?.photoURL} alt="User" className="w-full h-full object-cover" />
							</div>
							<Link to="/profile" className="hover:text-blue-200 transition">
								<span className="font-medium">{user?.displayName}</span>
							</Link>
						</div>
					</div>
				</div>

				{/* Main Content */}
				<div className="mt-24 p-6">
					{loading ? (
						<div className="flex items-center justify-center h-64">
							<Loader2 className="w-8 h-8 animate-spin text-purple-600" />
						</div>
					) : error ? (
						<div className="text-center text-red-500">{error}</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{modules.map((module) => (
								<div key={module?.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
									<img src={module?.profileImg || "https://via.placeholder.com/50"} alt={module?.name} className="w-full h-fit rounded-lg object-cover mb-2" />
									<div className="flex items-start space-x-4">
										<div className="flex-1">
											<h3 className="text-xl font-semibold mb-2">{module?.name}</h3>
											<div className="text-xs mb-4 bg-orange-500 rounded-full px-4  py-1 text-white w-fit">{module?.role}</div>
											<p className="text-gray-600 text-sm mb-3">{module?.description}</p>

											<button
												onClick={() => {
													// start chat
                                                    fetch(`${import.meta.env.VITE_SERVER_URL}/api/session-maker/`, {
                                                        method: "POST",
                                                        headers: {
                                                            "Content-Type": "application/json",
                                                        },
                                                        body: JSON.stringify({
                                                            moduleId: module?.id,
                                                            user: user,
                                                        }),
                                                    }).then((response) => response.json())
                                                        .then((data) => {
                                                            if (data.status === "success") {
                                                                window.location.href = "/session/"+data?.sessionId;
                                                            } else {
                                                                console.error("API Error:", data.message);
                                                            }
                                                        })
                                                        .catch((error) => {
                                                            console.error("Error:", error);
                                                        });
												}}
												className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
											>
												Start Chat
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AIModules;
