'use client';

import { useState } from 'react';
import ChatRoomClient from "@/components/ChatRoomClient";
import { Editor } from "@/components/Editor";
import { clearToken } from '@/hooks/useAuthToken';
import { useRouter } from "next/navigation";
import SummarizationBox from './SummarizationBox';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { AppSidebar } from './RoomSidebar';

export default function RoomPage({ roomId }: { roomId:string}) {
  const [docContent, setDocContent] = useState<string>();
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


      <SidebarProvider>
        <div className="flex flex-1 overflow-auto">

        {/* Editor Section */}
        <div className='flex'>

            <AppSidebar />
            <SidebarTrigger/>
        </div>

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

      </SidebarProvider>
    </div>
  );
}