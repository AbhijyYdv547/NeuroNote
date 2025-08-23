'use client';

import ChatRoomClient from "@/components/ChatRoomClient";
import { Editor } from "@/components/Editor";
import SummarizationBox from './SummarizationBox';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { AppSidebar } from './RoomSidebar';
import { useRoomStore } from '@/store/RoomStore';

export default function RoomPage({ roomId }: { roomId:string}) {

  const { chatOpen,sumOpen,toggleChat,toggleSum } = useRoomStore();

  return (
    <div className="h-screen flex flex-col bg-black">

      <SidebarProvider>
        <div className="flex flex-1 overflow-auto">

        {/* Editor Section */}
        <div className='flex'>
            <AppSidebar />
            <SidebarTrigger/>
        </div>

        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${chatOpen || sumOpen ? 'mr-80' : 'mr-0'
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
          className={`fixed right-0 top-0 bottom-0 w-80 shadow-lg border-l border-gray-200 transform transition-transform duration-300 ease-in-out z-10 ${chatOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          
          {/* Chat Content */}
          <div className="h-full pb-16">
            <ChatRoomClient roomId={roomId} />
          </div>
        </div>

        {/* Overlay for mobile */}
        {chatOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-5 lg:hidden md:hidden"
            onClick={()=>toggleChat()}
          />
        )}

        {/* Summarization Sidebar */}
        <div
          className={`fixed right-0 top-0 bottom-0 w-80 shadow-lg border-l border-gray-200 transform transition-transform duration-300 ease-in-out z-10 ${sumOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          
          {/* Summarization Content */}
          <div className="h-full pb-16">
            <SummarizationBox roomId={roomId} />
          </div>
        </div>

        {/* Overlay for mobile */}
        {sumOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-5 lg:hidden md:hidden"
            onClick={()=>toggleSum()}
          />
        )}
      </div>

      </SidebarProvider>
    </div>
  );
}