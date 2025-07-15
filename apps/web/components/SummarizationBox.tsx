"use client";

import React, { useEffect, useRef, useState } from 'react'

const SummarizationBox = ({ roomId }: { roomId: string }) => {

      const [messages, setMessages] = useState<[]>([]);
      const bottomRef = useRef<HTMLDivElement | null>(null);

      const sendMessage = ()=>{

      }

    return (
        <div className="h-full flex flex-col bg-zinc-950 text-white min-h-0">
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
                <div className="space-y-3 custom-scrollbar">
                    
                    <div ref={bottomRef} />
                </div>
            </div>

            {/* Input */}
            <div className="flex justify-center items-center p-3 border-t border-zinc-800 bg-zinc-900">
                    <button
                        className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 text-sm font-medium flex gap-1"
                    >
                    <div>
                        Summarize document 
                    </div>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className='h-5 w-5'>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    </button>

            </div>
        </div>
    );
}

export default SummarizationBox