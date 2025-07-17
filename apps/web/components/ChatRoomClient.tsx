"use client";

import { useEffect, useRef } from "react";
import { getToken } from "@/hooks/useAuthToken";
import ChatBox from "./ChatBox";

export default function ChatRoomClient({ roomId }: { roomId: string }) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      console.error("Token not found.");
      return;
    }

    const socket = new WebSocket(`ws://localhost:8080?token=${token}`);
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "join_room", roomId }));
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "leave_room", roomId }));
        socket.close();
      }
    };
  }, [roomId]);

  return <ChatBox roomId={roomId} />;
}
