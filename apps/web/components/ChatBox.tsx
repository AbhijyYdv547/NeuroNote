"use client";

import { useEffect, useState, useRef } from "react";
import { getToken } from "../hooks/useAuthToken";

interface ChatMessage {
  sender: string;
  message: string;
}

export default function ChatBox({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const ws = new WebSocket(`ws://localhost:8080?token=${token}`);

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join_room", roomId }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "chat") {
        setMessages((prev) => [...prev, { sender: data.sender, message: data.message }]);
      }
    };

    setSocket(ws);

    return () => {
      ws.send(JSON.stringify({ type: "leave_room", roomId }));
      ws.close();
    };
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    if (!input.trim() || !socket) return;

    const messageData = {
      type: "chat",
      message: input,
      roomId
    };

    socket.send(JSON.stringify(messageData));
setInput("");
  }

  return (
    <div className="text-white p-4 max-w-2xl mx-auto">
      <h2 className="text-xl mb-4 font-bold">Connected to room: {roomId}</h2>

      <div className="bg-zinc-900 h-80 overflow-y-auto p-4 rounded mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="text-blue-400 font-semibold">{msg.sender}:</span>
            <span className="ml-2">{msg.message}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-2 bg-zinc-800 rounded border border-zinc-700"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
