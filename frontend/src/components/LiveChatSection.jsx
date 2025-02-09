import React from 'react';

const LiveChatSection = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-300">
      <div className="flex items-center justify-between border-b border-slate-300 p-3">
        <div className="font-semibold">Live Chat</div>
        <button className="px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
          Group
        </button>
      </div>
      
      <div className="space-y-4 p-6">
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-xl overflow-hidden mr-3">
            <img src="https://kzmjkpl20vslk25w1efi.lite.vusercontent.net/placeholder.svg?height=128&width=128" alt="User" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-sm font-medium">Alexandra - 3 Minutes ago</div>
            <a href="#" className="text-xs text-purple-600 hover:text-purple-700">
              Inspiration: AI tutor
            </a>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-purple-100 text-sm p-3 rounded-xl max-w-[80%]">
            Thank you, Alexandra
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-8 h-8 rounded-xl overflow-hidden mr-3">
            <img src="https://kzmjkpl20vslk25w1efi.lite.vusercontent.net/placeholder.svg?height=128&width=128" alt="User" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-sm font-medium">Margaretha - 1 Minutes ago</div>
            <div className="text-sm text-slate-600">Wow.. Thank you Alexandra</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveChatSection;
