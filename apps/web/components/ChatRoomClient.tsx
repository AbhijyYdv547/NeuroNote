"use client";

import { useEffect, useRef, useState } from "react";
import ChatBox from "./ChatBox";
import { wsURL } from "@/config/url";
import { getToken } from "@/hooks/useAuthToken";

export default function ChatRoomClient({ roomId }: { roomId: string }) {
  const socketRef = useRef<WebSocket | null>(null);
  const [token,setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const t = await getToken();
      if (t) setToken(t);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if(!token) return;

    const socket = new WebSocket(`${wsURL}?token=${token}`);
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
  }, [roomId,token]);

  return <ChatBox roomId={roomId} />;
}
