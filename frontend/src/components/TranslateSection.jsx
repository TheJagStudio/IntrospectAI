import React from "react";
import { CgArrowsExchange } from "react-icons/cg";

const TranslateSection = () => {
	return (
		<div className="bg-white rounded-2xl border border-slate-300 mb-4">
			<div className="font-semibold border-b border-slate-300 p-4">Translate</div>
			<div className="flex items-center justify-between mb-4 pt-4 px-6 gap-3">
				<div className="flex items-center w-full border border-slate-300 p-2 rounded-lg">
					<div className="w-6 h-6 rounded-full bg-red-200 mr-2"></div>
					<div>Hindi</div>
				</div>
				<button className="w-8 h-8 aspect-square bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors">
					<CgArrowsExchange />
				</button>
				<div className="flex items-center w-full border border-slate-300 p-2 rounded-lg">
					<div className="w-6 h-6 rounded-full bg-blue-200 mr-2"></div>
					<div>United Ki...</div>
				</div>
			</div>
			<div className="space-y-4  pb-6 px-6">
				<div>
					<div className="bg-slate-50 p-3 rounded-xl text-sm mb-1">Sangat menarik</div>
					<div className="text-xs text-slate-500">14 Character</div>
				</div>
				<div>
					<div className="bg-slate-50 p-3 rounded-xl text-sm mb-1">Very interesting</div>
					<div className="text-xs text-slate-500">16 Character</div>
				</div>
			</div>
		</div>
	);
};

export default TranslateSection;
