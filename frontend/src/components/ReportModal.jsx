import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { IoClose } from "react-icons/io5";
import remarkGfm from 'remark-gfm';

const ReportModal = ({ report, isOpen, onClose }) => {
	if (!isOpen) return null;

	// Format the report text by replacing \n with actual newlines
	const formattedReport = report?.replace(/\\n/g, '\n') || "No report available";

	return (
		<div className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center p-10">
			<div className="bg-white rounded-lg w-auto h-full aspect-[9/12] overflow-y-auto noScrollBars relative">
				<button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100">
					<IoClose className="w-6 h-6" />
				</button>
				<div className="p-8">
					<ReactMarkdown 
						remarkPlugins={[remarkGfm]}
						components={{
							h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-6" {...props} />,
							h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mt-4 mb-2" {...props} />,
							p: ({node, ...props}) => <p className="mb-4" {...props} />,
							ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-4" {...props} />,
							ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-4" {...props} />,
							li: ({node, ...props}) => <li className="mb-1" {...props} />,
							a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
                            thead: ({node, ...props}) => <thead className="bg-purple-100" {...props} />,
                            th: ({node, ...props}) => <th className="border border-purple-200 p-1" {...props} />,
                            tr: ({node, ...props}) => <tr className="border border-purple-200" {...props} />,
                            td: ({node, ...props}) => <td className="border border-purple-200 p-1" {...props} />,
						}}
						className="prose max-w-none"
					>
						{formattedReport}
					</ReactMarkdown>
				</div>
			</div>
		</div>
	);
};

export default ReportModal;
