"use client";
import React from "react";


export default function RoomList() {
   

    if (rooms.length === 0) {
        return <p className="text-gray-400">You have not joined or created any rooms yet.</p>;
    }

    return (
        <div className="space-y-4">
            {rooms.map((room) => (
                <div
                    key={room.id}
                    className="p-4 bg-zinc-800 rounded flex justify-between items-center"
                >
                    <div>
                        <h4 className="font-semibold text-white">{room.name || room.slug}</h4>
                        <p className="text-gray-400 text-sm">Slug: {room.slug}</p>
                        <p className="text-gray-400 text-sm">Admin: {room.admin.name}</p>
                    </div>
                    <button
                        onClick={() => router.push(`/room/${room.id}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                        Open
                    </button>
                </div>
            ))}
        </div>
    );
}
