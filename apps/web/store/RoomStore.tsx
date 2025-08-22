import { create } from "zustand"
import axios from "@/lib/axios"

interface RoomStoreState {
    loadingShow: boolean;
    loadingJoin: boolean;
    rooms: [];
    showRooms: () => Promise<void>
    joinRoom: (secretCode: string, router:any) => Promise<void>;
    joinRoomViaId: (roomId: number, router: any) => Promise<void>; 
}


export const useRoomStore = create<RoomStoreState>((set) => ({
    loadingShow: false,
    loadingJoin: false,
    rooms: [],

    showRooms: async () => {
        set({ loadingShow: true});
        try {
            const res = await axios.get("/api/dashboard/rooms");
            set({rooms:res.data.rooms});
        } catch (err: any) {
            console.log("ERROR SR:", err);
            alert(err.response?.data?.message || "Error loading rooms");
        } finally {
            set({loadingShow: false});
        }
    },

    joinRoom: async (secretCode,router) => {
        set({ loadingJoin: true });
        try {
            const res = await axios.post("/api/dashboard/join-room", {
                secretCode: secretCode,
            });

            const data = res.data;

            if (data.room) {
                router.push(`/room/${data.room.id}`);
            } else {
                alert(data.message || "Room not found or invalid code");
            }
        } catch (err) {
            console.log("ERROR JR:", err);
            alert("Error joining room");
        } finally {
            set({ loadingJoin: true });
        }
    },

    joinRoomViaId: async (roomId, router) => {
        set({loadingJoin: true})
        try {
            const res = await axios.get(`/api/dashboard/room/${roomId}`);
            const data = res.data;

            if (data.room) {
                router.push(`/room/${data.room.id}`);
            } else {
                alert(data.message || "Room not found or invalid code");
            }
        } catch (err: any) {
            console.log("ERROR JRI:", err);
            alert(err.response?.data?.message || "Error joining room");
        } finally {
            set({loadingJoin: false})
        }
    }


}))