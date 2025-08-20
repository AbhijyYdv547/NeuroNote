"use client";

import { useEffect, useRef } from "react";
import ChatBox from "./ChatBox";
import { wsURL } from "@/config/url";

export default function ChatRoomClient({ roomId }: { roomId: string }) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {

    const socket = new WebSocket(`${wsURL}?roomId=${roomId}`);
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
