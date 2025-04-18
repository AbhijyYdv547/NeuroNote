"use client";

import { useEffect, useState, useRef } from "react";
import { getToken } from "../hooks/useAuthToken";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  userId: string;
}
interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
}

export default function ChatBox({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);


useEffect(() => {
  const token = getToken();
  // console.log("TOKEN:", token);
  if (!token) return;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    // console.log("DECODED:", decoded);

    if (decoded?.userId) {
      setCurrentUser(decoded.userId);
    } else {
      console.warn("Token missing 'id'");
    }

    const ws = new WebSocket(`ws://localhost:8080?token=${token}`);

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join_room", roomId }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "chat") {
        setMessages((prev) => [
          ...prev,
          { sender: data.sender, message: data.message,timestamp:data.timestamp },
        ]);
      }
      if (data.type === "typing" && data.sender !== currentUser) {
           setTypingUsers((prev) => [...new Set([...prev, data.sender])]);
           setTimeout(() => {
             setTypingUsers((prev) => prev.filter((u) => u !== data.sender));
           }, 2000);
         }
    };


    setSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "leave_room", roomId }));
      }
      ws.close();
    };
  } catch (err) {
    console.error("Error decoding token:", err);
  }
}, [roomId]);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 function handleTyping() {
    if (socket && currentUser) {
      socket.send(
        JSON.stringify({ type: "typing", sender: currentUser, roomId })
      );
    }
  }

  function sendMessage() {
    if (!input.trim() || !socket) return;

    const messageData = {
      type: "chat",
      message: input,
      roomId,
      timestamp: new Date().toISOString(),
    };

    socket.send(JSON.stringify(messageData));
    setInput("");
  }

  return (
    <div className="text-white p-4 max-w-3xl mx-auto flex flex-col h-[90vh]">
      <h2 className="text-xl mb-4 font-bold">Connected to room: {roomId}</h2>

      <div className="flex-1 bg-zinc-900 overflow-y-auto p-4 rounded mb-4 space-y-3">
        {messages.map((msg, index) => {
          const isSelf = msg.sender === currentUser;
          console.log("msg.sender:", msg.sender, "currentUser:", currentUser);

          return (
            <div
              key={index}
              className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[75%] break-words ${isSelf
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-800 text-gray-100"
                  }`}
              >

                <div className="text-xs text-gray-400 mb-1 font-medium">
                  {isSelf ? "You" : msg.sender}
                </div>
                
                <div>{msg.message}</div>
                <div className="text-[10px] text-gray-400 mt-1 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

       {typingUsers.length > 0 && (
        <div className="text-sm italic text-gray-400 mb-2">
          {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"} typing...
        </div>
      )}

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
           onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
            else handleTyping();
          }}
          placeholder="Type your message..."
          className="flex-1 p-2 bg-zinc-800 rounded border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
