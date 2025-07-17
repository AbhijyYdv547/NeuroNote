"use client";

import { useEffect, useState, useRef } from "react";
import { getToken } from "../hooks/useAuthToken";
import { jwtDecode } from "jwt-decode";
import { backendURL, wsURL } from "@/config/url";

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
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Step 1: Decode token and set current user
  useEffect(() => {
    const token = getToken();
    if (!token) return;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      if (decoded?.userId) {
        setCurrentUser(decoded.userId.toString());
      } else {
        console.warn("Token missing 'userId'");
      }
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  }, []);

  // Step 2: After currentUser is set, setup WebSocket and fetch messages
  useEffect(() => {
    if (!currentUser) return;

    const token = getToken();
    if (!token) return;

    const ws = new WebSocket(`${wsURL}?token=${token}`);

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join_room", roomId }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "chat") {
        setMessages((prev) => [
          ...prev,
          {
            sender: data.sender.toString(),
            message: data.message,
            timestamp: data.timestamp,
          },
        ]);
      }

      if (data.type === "typing" && data.sender !== currentUser) {
        setTypingUsers((prev) => [...new Set([...prev, data.sender])]);
        setTimeout(() => {
          setTypingUsers((prev) => prev.filter((u) => u !== data.sender));
        }, 2000);
      }

      if (data.type === "online_users" && data.roomId === roomId) {
        setOnlineUsers(
          Array.from(new Set(data.users.map((id: any) => id.toString())))
        );
      }

      if (data.type === "user_joined" && data.roomId === roomId) {
        setOnlineUsers((prev) =>
          Array.from(new Set([...prev.map(id => id.toString()), data.userId.toString()]))
        );
      }

      if (data.type === "user_left" && data.roomId === roomId) {
        setOnlineUsers((prev) => prev.filter((id) => id !== data.userId.toString()));
      }
    };

    // Fetch chat history
    fetch(`${backendURL}/api/room/chats/${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        const formattedMessages = (data.messages || []).map((msg: any) => ({
          sender: msg.senderId.toString(),
          message: msg.message,
          timestamp: msg.timestamp,
        }));
        setMessages(formattedMessages);
      });

    setSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "leave_room", roomId }));
      }
      ws.close();
    };
  }, [roomId, currentUser]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleTyping() {
    if (socket && currentUser) {
      socket.send(JSON.stringify({ type: "typing", sender: currentUser, roomId }));
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
    <div className="h-full flex flex-col bg-zinc-950 text-white min-h-0">
      {/* Online Users */}
      <div className="flex-shrink-0 p-3 border-b border-zinc-800 bg-zinc-900">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-gray-400">Online:</span>
          {[...new Set(onlineUsers)].map((userId, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-xs font-medium shadow-sm transition-colors
                ${userId === currentUser
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-800 text-gray-200"
                }`}
            >
              {userId === currentUser ? "You" : userId}
            </span>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgb(39 39 42);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgb(82 82 91);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgb(113 113 122);
          }
        `}</style>
        <div className="space-y-3 custom-scrollbar">
          {messages.map((msg, index) => {
            const isSelf = msg.sender.toString() === currentUser;

            return (
              <div
                key={index}
                className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-xl px-3 py-2 max-w-[85%] break-words shadow-md ${isSelf
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-zinc-800 text-gray-100 rounded-bl-none"
                    }`}
                >
                  <div className="text-xs text-gray-400 mb-1 font-medium">
                    {isSelf ? "You" : msg.sender}
                  </div>
                  <div className="text-sm">{msg.message}</div>
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
      </div>

      {/* Typing indicator */}
      {typingUsers.length > 0 && (
        <div className="flex-shrink-0 px-3 py-1 text-sm italic text-gray-400 bg-zinc-900 border-t border-zinc-800">
          {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"} typing...
        </div>
      )}

      {/* Input */}
      <div className="flex-shrink-0 p-3 border-t border-zinc-800 bg-zinc-900">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
              else handleTyping();
            }}
            placeholder="Type your message..."
            className="flex-1 p-2 text-sm bg-zinc-800 rounded border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed text-sm font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}