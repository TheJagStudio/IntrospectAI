import React from "react";
import { CgMenuGridO } from "react-icons/cg";
import { IoVideocam } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../App";

const Sidebar = ({ activeTab }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem("user_introspect");
            navigate("/");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="w-20 bg-white border-r border-slate-300 fixed top-0 left-0 h-full z-10">
            <div className="flex flex-col items-center h-full">
                <div className="border-b border-slate-300 w-full flex items-center justify-center h-20">
                    <Link to="/">
                        <div className="w-full h-full transition-transform cursor-pointer">
                            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain p-5 -hue-rotate-90  scale-125" />
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col items-center space-y-6 py-5">
                    <Link to="/apps">
                        <div className={"w-14 h-14  rounded-xl flex items-center justify-center transition-all border hover:bg-purple-100 hover:border-purple-500 hover:text-purple-600 cursor-pointer " + (activeTab === 0 ? "bg-purple-100 border-purple-500 text-purple-600" : "bg-slate-100 border border-slate-300")}>
                            <CgMenuGridO className="w-5 h-5" />
                        </div>
                    </Link>
                    <div className={"w-14 h-14  rounded-xl flex items-center justify-center transition-all border hover:bg-purple-100 hover:border-purple-500 hover:text-purple-600 cursor-pointer " + (activeTab === 1 ? "bg-purple-100 border-purple-500 text-purple-600" : "bg-slate-100 border border-slate-300")}>
                        <IoVideocam className="w-5 h-5" />
                    </div>
                    <Link to="/history">
                        <div className={"w-14 h-14  rounded-xl flex items-center justify-center transition-all border hover:bg-purple-100 hover:border-purple-500 hover:text-purple-600 cursor-pointer " + (activeTab === 2 ? "bg-purple-100 border-purple-500 text-purple-600" : "bg-slate-100 border border-slate-300")}>
                            <FaBookmark className="w-4 h-4" />
                        </div>
                    </Link>
                </div>
                <div className="mt-auto mb-6">
                    <button
                        onClick={handleLogout}
                        className="w-14 h-14 rounded-xl flex items-center justify-center transition-all border bg-slate-100 border-slate-300 hover:bg-red-100 hover:border-red-500 hover:text-red-600"
                    >
                        <FiLogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
