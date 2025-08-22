import DashboardNav from "@/components/DashboardNav";
import { JoinRoomBox } from "@/components/JoinRoomBox";
import CreateRoomBox from "@/components/CreateRoomBox";


export default function Dashboard() {
  return (
    <div>
    <DashboardNav/>
    <div className="min-h-screen bg-black text-white py-20 overflow-y-hidden">
      <div className="flex md:flex-row flex-col md:justify-evenly gap-8">
      <CreateRoomBox/>
          <div className="hidden md:block w-px bg-white mx-8" />
      <JoinRoomBox/>
      </div>
    </div>
    </div>
  );
}
