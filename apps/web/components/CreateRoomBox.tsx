"use client";
import axios from '@/lib/axios';
import { useRoomStore } from '@/store/RoomStore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CreateRoomBox = () => {
  const [loadingCreate, setLoadingCreate] = useState(false);
    const [secretCode, setSecretCode] = useState(""); 
    const [copySuccess, setCopySuccess] = useState("");
    const [roomName, setRoomName] = useState("");
    const [secretCodeInput, setSecretCodeInput] = useState("");

      const router = useRouter();

      const { showRooms,joinRoom,loadingJoin } = useRoomStore()

    
      function copyToClipboard() {
        navigator.clipboard.writeText(secretCode).then(() => {
          setCopySuccess("Copied!");
          setTimeout(() => setCopySuccess(""), 2000); 
        });
      }

    async function createRoom() {
        setLoadingCreate(true);
        setCopySuccess("");
        try {
            const res = await axios.post("/api/dashboard/room", {
                name: roomName,
            });

            if (res.data.secretCode) {
                setSecretCode(res.data.secretCode);
                alert("Room created!");
                showRooms();
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.log("ERROR CR:", err);
            alert("Error creating room");
        } finally {
            setLoadingCreate(false);
        }
    }




  return (
      <div className="w-full max-w-md bg-zinc-900 p-6 rounded-xl shadow-lg space-y-6">
          <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Dashboard</h2>
          </div>

          {/* CREATE ROOM */}
          <div>
              <h3 className="font-semibold mb-2">Create Room</h3>
              <input
                  placeholder="Room Name"
                  className="w-full px-4 py-2 mb-2 bg-zinc-800 border border-zinc-700 rounded text-white placeholder-gray-400 focus:outline-none"
                  onChange={(e) => setRoomName(e.target.value)}
                  value={roomName}
              />
              <button
                  onClick={createRoom}
                  className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
                  disabled={loadingCreate}
              >
                  {loadingCreate ? "Creating..." : "Create"}
              </button>

              {secretCode && (
                  <div className="mt-4 p-3 bg-zinc-700 rounded text-white flex items-center justify-between">
                      <span>Secret Code: <strong>{secretCode}</strong></span>
                      <button
                          onClick={copyToClipboard}
                          className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                      >
                          Copy
                      </button>
                      {copySuccess && <span className="ml-2 text-green-400">{copySuccess}</span>}
                  </div>
              )}
          </div>

          {/* JOIN ROOM */}
          <div>
              <h3 className="font-semibold mb-2">Join Room</h3>
              <input
                  placeholder="Enter Secret Code"
                  className="w-full px-4 py-2 mb-2 bg-zinc-800 border border-zinc-700 rounded text-white placeholder-gray-400 focus:outline-none"
                  value={secretCodeInput}
                  onChange={(e) => setSecretCodeInput(e.target.value)}
              />
              <button
                  onClick={()=> joinRoom(secretCode,router)}
                  className="w-full bg-green-600 py-2 rounded hover:bg-green-700 transition"
                  disabled={loadingJoin || !secretCodeInput}
              >
                  {loadingJoin ? "Joining..." : "Join"}
              </button>
          </div>


      </div>
  )
}

export default CreateRoomBox