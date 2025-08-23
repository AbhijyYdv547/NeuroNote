import { create } from "zustand"
import axios from "@/lib/axios"
import { RefObject } from "react";
import { clearToken } from "@/hooks/useAuthToken";
import { toast } from "sonner";

interface RoomStoreState {
    loadingShow: boolean;
    loadingJoin: boolean;
    chatOpen: boolean;
    sumOpen: boolean;
    rooms: [];
    showRooms: () => Promise<void>
    joinRoom: (secretCode: RefObject<HTMLInputElement | null>, router: any) => Promise<void>;
    joinRoomViaId: (roomId: number, router: any) => Promise<void>;
    handleLogout: (router: any) => Promise<void>
    toggleChat: () => void
    toggleSum: () => void
}


export const useRoomStore = create<RoomStoreState>((set) => ({
    loadingShow: false,
    loadingJoin: false,
    chatOpen: false,
    sumOpen: false,
    rooms: [],

    showRooms: async () => {
        set({ loadingShow: true });
        try {
            const res = await axios.get("/api/dashboard/rooms");
            set({ rooms: res.data.rooms });
        } catch (err: any) {
            console.log("ERROR SR:", err);
            toast(err.response?.data?.message || "Error loading rooms");
        } finally {
            set({ loadingShow: false });
        }
    },

    joinRoom: async (secretCode, router) => {
        set({ loadingJoin: true });
        const code = secretCode.current?.value.trim();

        if (!code) {
            toast("Room code is required");
            return;
        }
        try {
            const res = await axios.post("/api/dashboard/join-room", {
                secretCode: code,
            });

            const data = res.data;

            if (data.room) {
                router.push(`/room/${data.room.id}`);
            } else {
                toast(data.message || "Room not found or invalid code");
            }
        } catch (err) {
            console.log("ERROR JR:", err);
            toast("Error joining room");
        } finally {
            set({ loadingJoin: true });
        }
    },

    joinRoomViaId: async (roomId, router) => {
        set({ loadingJoin: true })
        try {
            const res = await axios.get(`/api/dashboard/room/${roomId}`);
            const data = res.data;

            if (data.room) {
                router.push(`/room/${data.room.id}`);
            } else {
                toast(data.message || "Room not found or invalid code");
            }
        } catch (err: any) {
            console.log("ERROR JRI:", err);
            toast(err.response?.data?.message || "Error joining room");
        } finally {
            set({ loadingJoin: false })
        }
    },

    handleLogout: async(router) => {
        clearToken();
        router.push("/")
    },
    
    toggleChat: () => set((state) => ({
        chatOpen: !state.chatOpen,
        sumOpen: false
    })),

    toggleSum: () => set((state) => ({
        sumOpen: !state.sumOpen,
        chatOpen: false
    })),





}))