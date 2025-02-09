import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useAtom } from "jotai";
import { userAtom } from "../Variables";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { FaBookmark } from "react-icons/fa6";
import ReportModal from "../components/ReportModal";

const History = () => {
    const [user] = useAtom(userAtom);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    useEffect(() => {
        fetchSessions();
    }, [user]);

    const fetchSessions = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/list-sessions/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user }),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch sessions");
            }
            const data = await response.json();
            setSessions(data.sessions);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (sessionId) => {
        if (!confirm('Are you sure you want to delete this session?')) return;
        
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/delete-session/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sessionId }),
            });
            if (!response.ok) throw new Error("Failed to delete session");
            
            // Remove session from local state
            setSessions(sessions.filter(session => session.uuid !== sessionId));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 noScrollBars overflow-hidden">
            <Sidebar activeTab={2} />
            <div className="w-full ml-20">
                <div className="flex items-center justify-between mb-2 bg-white p-4 border-b border-slate-300 fixed top-0 left-20 w-[calc(100vw-5rem)] h-20 z-10">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-md text-white bg-purple-500 flex items-center justify-center">
                            <FaBookmark className="w-4 h-4" />
                        </div>
                        <div className="text-lg font-medium">Chat History</div>
                    </div>
                    <div className="flex items-center space-x-6">
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

                <div className="mt-24 p-6">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500">{error}</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sessions.map((session) => (
                                <div key={session?.uuid} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                    <img 
                                        src={session?.module?.profileImg || "https://via.placeholder.com/50"} 
                                        alt={session?.module?.name} 
                                        className="w-full h-fit rounded-lg object-cover mb-4"
                                    />
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-xl font-semibold">{session?.module?.name}</h3>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(session?.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="text-xs mb-4 bg-orange-500 rounded-full px-4 py-1 text-white w-fit">
                                                {session?.module?.role}
                                            </div>
                                            <p className="text-gray-600 text-sm mb-3">
                                                {session?.conversation?.length} messages
                                            </p>
                                            <div className="flex space-x-2">
                                                <Link to={`/session/${session?.uuid}`} className="flex-1">
                                                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                                                        Continue Chat
                                                    </button>
                                                </Link>
                                                {session?.isReported && (
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedReport(session?.report);
                                                            setIsReportModalOpen(true);
                                                        }}
                                                        className="bg-purple-100 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-200 transition-colors"
                                                    >
                                                        View Report
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleDelete(session?.uuid)}
                                                    className="bg-red-100 text-red-600 py-2 px-4 rounded-lg cursor-pointer hover:bg-red-200 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <ReportModal 
                report={selectedReport}
                isOpen={isReportModalOpen} 
                onClose={() => setIsReportModalOpen(false)} 
            />
        </div>
    );
};

export default History;
