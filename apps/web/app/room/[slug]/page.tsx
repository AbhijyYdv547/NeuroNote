import ChatRoomClient from "../../../components/ChatRoomClient";
import {Editor} from "../../../components/Editor";

export default function RoomPage({ params }: { params: { slug: string } }) {
  return (
    
      <div>
      <Editor docId={params.slug} />
      <ChatRoomClient roomId={params.slug} />
      </div>
    
  )
}
