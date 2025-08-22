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

        const router = useRouter()

const {rooms,showRooms,joinRoomViaId} = useRoomStore()

      useEffect(() => {
        showRooms();
      }, [showRooms]);


    return (
        <div>
            <h3 className="font-semibold mb-2">Room List</h3>
            {rooms.length === 0 ? (
                <p className="text-gray-400">You haven&apos;t joined any rooms yet.</p>
            ) : (
        <Command className="rounded-lg border shadow-md md:min-w-[450px]">
            <CommandInput placeholder="Type a room name or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandSeparator />
                <CommandGroup heading="Rooms">
                    {rooms.map((room: { id: number; name: string; slug: string }) => (                  
                    <CommandItem key={room.id}>
                        <span>{room.slug}</span>
                        <CommandShortcut className="hover:bg-zinc-500" onClick={() => joinRoomViaId(room.id,router)}>Go</CommandShortcut>
                    </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>)}
        </div>
    )
}
