"use client";
import { useEffect, useState } from "react";
import { getToken, clearToken } from "../../hooks/useAuthToken";
import { useRouter } from "next/navigation";

export default function Dashboard() {

  function copyToClipboard() {
    navigator.clipboard.writeText(secretCode).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
    });
  }

  const [secretCodeInput, setSecretCodeInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingJoin, setLoadingJoin] = useState(false);
  const [loadingShow, setLoadingShow] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [secretCode, setSecretCode] = useState(""); 
  const [copySuccess, setCopySuccess] = useState("");
  const router = useRouter();
  const token = getToken();

  useEffect(() => {
    showRooms();
  }, []);

  async function createRoom() {
    setLoadingCreate(true);
    setCopySuccess("");
    try {
      const res = await fetch("http://localhost:3001/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ name: roomName }),
      });

      const data = await res.json();
      setLoadingCreate(false);
      if (res.ok) {
        setSecretCode(data.secretCode);
        alert("Room created!");
        showRooms();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error creating room");
    } finally {
      setLoadingCreate(false);
    }
  }

  async function joinRoom() {
    setLoadingJoin(true);
    try {
      const res = await fetch(`http://localhost:3001/join-room`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ secretCode: secretCodeInput }),
      });
      const data = await res.json();
      if (res.ok && data.room) {
        router.push(`/room/${data.room.id}`);
      } else {
        alert(data.message || "Room not found or invalid code");
      }
    } catch (err) {
      alert("Error joining room");
    } finally {
      setLoadingJoin(false);
    }
  }

  async function showRooms() {
    setLoadingShow(true);
    const res = await fetch(`http://localhost:3001/rooms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      }
    })
    const data = await res.json();
    if (res.ok) {
      setRooms(data.rooms);
      setLoadingShow(false);
    } else {
      alert(data.message);
      setLoadingShow(false);
    }
  }

  async function joinRoomviaId(roomId:number){
    setLoadingJoin(true);
    try {
      const res = await fetch(`http://localhost:3001/room/${roomId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        }
      });
      const data = await res.json();
      if (res.ok && data.room) {
        router.push(`/room/${data.room.id}`);
      } else {
        alert(data.message || "Room not found or invalid code");
      }
    } catch (err) {
      alert("Error joining room");
    } finally {
      setLoadingJoin(false);
    }
  }

  function handleLogout() {
    clearToken();
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md bg-zinc-900 p-6 rounded-xl shadow-lg space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <button
            className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
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
            onClick={joinRoom}
            className="w-full bg-green-600 py-2 rounded hover:bg-green-700 transition"
            disabled={loadingJoin || !secretCodeInput}
          >
            {loadingJoin ? "Joining..." : "Join"}
          </button>
        </div>


        <div>
          <h3 className="font-semibold mb-2">Room List</h3>
          {rooms.length === 0 ? (
            <p className="text-gray-400">You haven't joined any rooms yet.</p>
          ) : (
            <div className="space-y-3">
              {rooms.map((room: { id: number; name: string; slug: string }) => (
                <div
                  key={room.id}
                  className="bg-zinc-800 p-4 rounded border border-zinc-700 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{room.name}</p>
                    <p className="text-sm text-gray-400">Slug: {room.slug}</p>
                  </div>
                  <button
                    onClick={() => joinRoomviaId(room.id)}
                    className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
                  >
                    Go
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>


      </div>
    </div>
  );
}
