import ChatRoomClient from "../../../components/ChatRoomClient";
import {Editor} from "../../../components/Editor";

export default function RoomPage({ params }: { params: { slug: string } }) {
  return (
    <Editor/>
    // <ChatRoomClient roomId={params.slug} />
  )
}
