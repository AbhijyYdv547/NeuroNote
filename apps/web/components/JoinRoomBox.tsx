"use client";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { useRoomStore } from "@/store/RoomStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export function JoinRoomBox() {

    const router = useRouter();

    const { rooms, showRooms, joinRoomViaId } = useRoomStore()

    useEffect(() => {
        showRooms();
    }, [showRooms]);


    return (
        <div className="shadow-input mx-auto w-full max-w-md p-4 rounded-2xl md:p-8 bg-zinc-300">
            <div className="flex items-center">
                <div className="flex-1 text-center">
                    <h2 className="text-xl font-bold text-neutral-800 text-center">
                        Join a already joined room
                    </h2>
                </div>
            </div>
            <div className="flex items-center w-full mt-5">
                {rooms.length === 0 ? (
                    <p className="text-gray-400">You haven&apos;t joined any rooms yet.</p>
                ) : (
                    <Command className="rounded-lg border shadow-md md:min-w-full">
                        <CommandInput placeholder="Type a room name or search..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandSeparator />
                            <CommandGroup heading="Rooms">
                                {rooms.map((room: { id: number; name: string; slug: string }) => (
                                    <CommandItem key={room.id}>
                                        <span>{room.slug}</span>
                                        <CommandShortcut className="hover:bg-zinc-500" onClick={() => joinRoomViaId(room.id, router)}>Go</CommandShortcut>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>)}
            </div>
        </div>
    )
}
