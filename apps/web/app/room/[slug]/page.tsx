import ChatRoomClient from "../../../components/ChatRoomClient";
import {Editor} from "../../../components/Editor";

export default function RoomPage({ params }: { params: { slug: string } }) {
  return (
    <div className="flex">
      <Editor docId={params.slug} />
      <ChatRoomClient roomId={params.slug} />
    </div>
  )
}
