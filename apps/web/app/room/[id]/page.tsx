import ChatRoomClient from "../../../components/ChatRoomClient";

export default function RoomPage({ params }: { params: { slug: string } }) {
  return <ChatRoomClient roomId={params.slug} />;
}
