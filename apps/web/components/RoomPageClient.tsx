'use client';

import { use, useState } from 'react';
import ChatRoomClient from "../components/ChatRoomClient";
import { Editor } from "../components/Editor";
import { clearToken } from '../hooks/useAuthToken';
import { useRouter } from "next/navigation";
import SummarizationBox from './SummarizationBox';

export default function RoomPage({ roomId }: { roomId:string}) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSumOpen, setIsSumOpen] = useState(false);
  const router = useRouter();

  const handleLogout = ()=> {
    clearToken();
    router.push("/");
  }

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setIsSumOpen(false);
  };

  const toggleSum = () => {
    setIsChatOpen(false)
    setIsSumOpen(!isSumOpen);
    
  };

  return (
    <div className="h-screen flex flex-col bg-black">

      {/* Top Navigation Bar */}
      <nav className="bg-black shadow-sm border-b border-gray-200 px-4 py-3 flex justify-between items-center z-20">
        {/* Left side - Logo/Title */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-300">
            Document Editor
          </h1>
          <span className="text-sm text-gray-500">
            Room: {roomId}
          </span>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex items-center space-x-3">

          {/* AI Summarization Button */}
          <button
            onClick={toggleSum}
            className={`p-2 rounded-lg transition-all duration-200 ${isSumOpen
              ? 'bg-blue-100 text-orange-600 hover:bg-orange-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            title="Toggle Summarizer"
          >
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>

          </button>


          {/* Chat Toggle Button */}
          <button
            onClick={toggleChat}
            className={`p-2 rounded-lg transition-all duration-200 ${isChatOpen
                ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            title="Toggle Chat"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200"
            title="Logout"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-auto">
        {/* Editor Section */}
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${isChatOpen || isSumOpen ? 'mr-80' : 'mr-0'
            }`}
        >
          <div className="h-full p-4">
            <div className="h-full bg-gray-950 rounded-lg shadow-sm border border-gray-200 overflow-auto">
              <Editor docId={roomId} />
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div
          className={`fixed right-0 top-16 bottom-0 w-80 h-full shadow-lg border-l border-gray-200 transform transition-transform duration-300 ease-in-out z-10 ${isChatOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          
          {/* Chat Content */}
          <div className="h-full pb-16">
            <ChatRoomClient roomId={roomId} />
          </div>
        </div>

        {/* Overlay for mobile */}
        {isChatOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-5 lg:hidden md:hidden"
            onClick={toggleChat}
          />
        )}

        {/* Summarization Sidebar */}
        <div
          className={`fixed right-0 top-16 bottom-0 w-80 h-full shadow-lg border-l border-gray-200 transform transition-transform duration-300 ease-in-out z-10 ${isSumOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          
          {/* Summarization Content */}
          <div className="h-full pb-16">
            <SummarizationBox roomId={roomId} />
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSumOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-5 lg:hidden md:hidden"
            onClick={toggleSum}
          />
        )}
      </div>
    </div>
  );
}