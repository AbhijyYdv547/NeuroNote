"use client";
import axios from '@/lib/axios';
import { useRoomStore } from '@/store/RoomStore';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';

const CreateRoomBox = () => {
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [secretCode, setSecretCode] = useState("");
    const [copySuccess, setCopySuccess] = useState("");
    const roomRef = useRef<HTMLInputElement>(null);
    const codeRef = useRef<HTMLInputElement>(null);


    const router = useRouter();

    const { showRooms, joinRoom, loadingJoin } = useRoomStore()


    function copyToClipboard() {
        navigator.clipboard.writeText(secretCode).then(() => {
            setCopySuccess("Copied!");
            setTimeout(() => setCopySuccess(""), 2000);
        });
    }

    async function createRoom() {
        setLoadingCreate(true);
        setCopySuccess("");
        const roomName = roomRef.current?.value.trim();

        if (!roomName) {
            alert("Room name is required");
            return;
        }
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
        <div className="shadow-input mx-auto w-full max-w-md p-4 rounded-2xl md:p-8 bg-zinc-900">
            <div className="flex items-center">
                <div className="flex-1 text-center">
                    <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 text-center">
                        Create Rooms or Join a room
                    </h2>
                    <p className="mt-2 max-w-sm mx-auto text-sm text-neutral-800 dark:text-neutral-200 text-center">
                        Start your collaboration Journey
                    </p>
                </div>
            </div>

            {/* CREATE ROOM */}
            <form className="my-8" onSubmit={(e)=>{
                e.preventDefault(); 
                createRoom();
            }
                }>

                    <LabelInputContainer className="mb-4 ">
                        <Label htmlFor="" className="text-white">Create Room</Label>
                        <Input
                            id="roomName"
                            placeholder="Room Name"
                            type="text"
                            ref={roomRef}
                            autoComplete="name"
                        />
                    </LabelInputContainer>
                <button
                    className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br dark:from-black dark:to-neutral-600 font-medium text-white dark:shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] bg-zinc-800 from-zinc-900 to-zinc-900 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                    type="submit"
                >
                    {loadingCreate ? "Creating..." : "Create"}
                </button>

            </form>

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

            {/* JOIN ROOM */}
            <form className="my-8" onSubmit={(e) => {
                e.preventDefault()
                joinRoom(codeRef, router)
            }}>
                <LabelInputContainer className="mb-4 ">
                    <Label htmlFor="name" className="text-white">Join Room</Label>
                    <Input
                        id="roomCode"
                        placeholder="Room Code"
                        type="text"
                        ref={codeRef}
                        autoComplete="name"
                    />
                </LabelInputContainer>
                <button
                    className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br dark:from-black dark:to-neutral-600 font-medium text-white dark:shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] bg-zinc-800 from-zinc-900 to-zinc-900 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                    type="submit"
                >
                    {loadingJoin ? "Joining..." : "Join"}
                </button>

            </form>


        </div>
        
    )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default CreateRoomBox

