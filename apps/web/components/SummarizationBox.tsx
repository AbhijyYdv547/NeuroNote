"use client";

import { getToken } from '@/hooks/useAuthToken';
import { useDocContentStore } from '@/store/DocContentStore';
import React, { useEffect, useRef, useState } from 'react'


const SummarizationBox = ({ roomId }: { roomId: string }) => {
    const docContent = useDocContentStore((state) => state.docContent)
    const token = getToken();

      const [summary, setSummary] = useState<string>();
      const [grammar,setGrammar] = useState<string>();
      const bottomRef = useRef<HTMLDivElement | null>(null);
      const [loading,setLoading] = useState(false);

      const summarizeDoc = async ()=>{
          console.log("Sending content to summarize:", docContent);
          setLoading(true);
          try {
              const res = await fetch(`http://localhost:3001/api/room/summarize`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `${token}`,
                  },
                  body: JSON.stringify({ content: docContent }),
              });
              const data = await res.json();
              setSummary(data.summary)
          } catch (err) {
              alert("Error joining room");
          } finally {
              setLoading(false);
          }
      }

      const checkGrammar = async ()=>{
          console.log("Sending content to summarize:", docContent);
          setLoading(true);
          try {
              const res = await fetch(`http://localhost:3001/api/room/check-grammar`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `${token}`,
                  },
                  body: JSON.stringify({ content: docContent }),
              });
              const data = await res.json();
              setSummary(data.grammar)
          } catch (err) {
              alert("Error joining room");
          } finally {
              setLoading(false);
          }
      }

    useEffect(() => {
        if (!loading && (summary || grammar)) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [loading, summary, grammar]);

    return (
        <div className="h-full flex flex-col bg-zinc-950 text-white min-h-0">
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
                <div className="space-y-3 custom-scrollbar">

                    {loading && (
                        <div className="p-4 bg-zinc-900 rounded mt-4 text-sm italic text-zinc-400 flex items-center gap-2">
                            <span>Generating response...</span>
                            <svg
                                className="animate-spin h-4 w-4 text-white"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z"
                                />
                            </svg>
                        </div>
                    )}

                    {summary && (
                        <div className="p-4 bg-zinc-900 rounded mt-4">
                            <h2 className="text-lg font-semibold">📄 Summary</h2>
                            <p>{summary}</p>
                        </div>
                    )}

                    {grammar && (
                        <div className="p-4 bg-zinc-900 rounded mt-4">
                            <h2 className="text-lg font-semibold">📄 Grammar Check</h2>
                            <p>{grammar}</p>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
            </div>

            {/* Input */}
            <div className="flex justify-center items-center p-3 border-t border-zinc-800 bg-zinc-900 gap-3">
                <button
                    disabled={loading}
                    className={`px-3 py-2 rounded text-sm font-medium flex gap-1 items-center 
            ${loading ? "bg-blue-600 opacity-50 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                    onClick={summarizeDoc}
                >
                    <div>Summarize Document</div>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className='h-5 w-5'>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>

                <button
                    disabled={loading}
                    className={`px-3 py-2 rounded text-sm font-medium flex gap-1 items-center 
            ${loading ? "bg-blue-600 opacity-50 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                    onClick={checkGrammar}
                >
                    <div>Check Grammar</div>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className='h-5 w-5'>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default SummarizationBox