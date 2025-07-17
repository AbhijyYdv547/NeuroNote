import { wsURL } from "@/config/url";

let socket: WebSocket | null = null;

export function connectToRoom(roomId: string, token: string) {
  socket = new WebSocket(`${wsURL}?token=${token}`);

  socket.onopen = () => {
    socket?.send(JSON.stringify({ type: "join_room", roomId }));
  };

  return socket;
}

export function sendMessage(roomId: string, message: string) {
  socket?.send(JSON.stringify({ type: "chat", roomId, message }));
}

export function onMessage(callback: (data: any) => void) {
  if (!socket) return;
  socket.onmessage = (event) => {
    const parsed = JSON.parse(event.data);
    callback(parsed);
  };
}
