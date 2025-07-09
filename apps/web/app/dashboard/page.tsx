"use client";
import { useEffect, useState } from "react";
import { getToken, clearToken } from "../../hooks/useAuthToken";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [roomSlug, setRoomSlug] = useState("");
    const [roomName, setRoomName] = useState("");
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [loadingJoin, setLoadingJoin] = useState(false);
    const [loadingShow, setLoadingShow] = useState(false);
    const [rooms, setRooms] = useState([]);
    const router = useRouter();
    const token = getToken();

  useEffect(() => {

    showRooms();
  }, []);

    async function createRoom() {
        setLoadingCreate(true);
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
            alert("Room created!");
            showRooms();
        } else {
            alert(data.message);
        }
    }

    async function joinRoom() {
        setLoadingJoin(true);
      const res = await fetch(`http://localhost:3001/room/${roomSlug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        }
      });
        const data = await res.json();
        setLoadingJoin(false);

        if (data.room) {
            router.push(`/room/${data.room.id}`);
        } else {
            alert("Room not found");
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

    function handleLogout() {
        clearToken();
        router.push("/signin");
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
          />
          <button
            onClick={createRoom}
            className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
            disabled={loadingCreate}
          >
            {loadingCreate ? "Creating..." : "Create"}
          </button>
        </div>

        {/* JOIN ROOM */}
        <div>
          <h3 className="font-semibold mb-2">Join Room</h3>
          <select
            className="w-full px-4 py-2 mb-2 bg-zinc-800 border border-zinc-700 rounded text-white focus:outline-none"
            value={roomSlug}
            onChange={(e) => setRoomSlug(e.target.value)}
          >
            <option value="">Select a room</option>
            {rooms.map((room: { slug: string; name: string }) => (
              <option key={room.slug} value={room.slug}>
                {room.name} ({room.slug})
              </option>
            ))}
          </select>
          <button
            onClick={joinRoom}
            className="w-full bg-green-600 py-2 rounded hover:bg-green-700 transition"
            disabled={loadingJoin}
          >
            {loadingJoin ? "Joining..." : "Join"}
          </button>
        </div>
      </div>
    </div>
  );
}
