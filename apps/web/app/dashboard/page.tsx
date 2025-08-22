import DashboardNav from "@/components/DashboardNav";
import { JoinRoomBox } from "@/components/JoinRoomBox";
import CreateRoomBox from "@/components/CreateRoomBox";


export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row  items-center py-10 px-4 gap-10">
      <DashboardNav/>
      <CreateRoomBox/>
      <JoinRoomBox/>
    </div>
  );
}
