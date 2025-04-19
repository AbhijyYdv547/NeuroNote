import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const users: User[] = [];


function checkUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded == "string") {
            return null;
        }
        if (!decoded || !decoded.userId) {
            return null;
        }
        return decoded.userId;
    } catch (e) {
        return null;
    }
}

wss.on("connection", function connection(ws, request) {
    const url = request.url;
    if (!url) return;
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";
    const userId = checkUser(token);

    if (userId == null) {
        ws.close()
        return
    }

    users.push({
        userId,
        rooms: [],
        ws
    })

    ws.on("message", async (data) => {
        let parsedData;
        if (typeof data !== "string") {
            parsedData = JSON.parse(data.toString())
        } else {
            parsedData = JSON.parse(data);
        }

        if (parsedData.type == "join_room") {
            const user = users.find(x => x.ws === ws)
            if (user && !user.rooms.includes(parsedData.roomId)) {
    user.rooms.push(parsedData.roomId);

    // Notify others in the room about the new user
    users.forEach((u) => {
      if (u.rooms.includes(parsedData.roomId) && u.ws !== ws) {
        u.ws.send(
          JSON.stringify({
            type: "user_joined",
            userId: user.userId,
            roomId: parsedData.roomId,
          })
        );
      }
    });

    // Also send the full list of online users in the room to the new user
    const onlineUserIds = users
      .filter((u) => u.rooms.includes(parsedData.roomId))
      .map((u) => u.userId);

    ws.send(
      JSON.stringify({
        type: "online_users",
        roomId: parsedData.roomId,
        users: onlineUserIds,
      })
    );
  }
        }

        if (parsedData.type == "leave_room") {
            const user = users.find(x => x.ws === ws);
            if (!user) {
                return;
            }
            user.rooms = user?.rooms.filter(x => x === parsedData.room)
             users.forEach((u) => {
    if (u.rooms.includes(parsedData.roomId) && u.ws !== ws) {
      u.ws.send(
        JSON.stringify({
          type: "user_left",
          userId: user.userId,
          roomId: parsedData.roomId,
        })
      );
    }})
        }

        if (parsedData.type == "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;
            const timestamp = new Date().toISOString();
            if (!roomId || !message) return;


            await prismaClient.chat.create({
                data: {
                    roomId: Number(roomId),
                    message,
                    senderId: Number(userId),
                    timestamp: new Date(),
                }
            })

            users.forEach(user => {
                console.log(`Checking user ${user.userId} in rooms: ${user.rooms}`);
                if (user.rooms.includes(roomId.toString())) {
                    console.log(`Sending message to user ${user.userId}`);
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId,
                        sender: userId,
                        timestamp
                    }))
                }
            })


        }

        if (parsedData.type === "typing") {
            const roomId = parsedData.roomId;
            const sender = userId;

            users.forEach((user) => {
                if (user.ws !== ws && user.rooms.includes(roomId)) {
                    user.ws.send(
                        JSON.stringify({
                            type: "typing",
                            sender,
                            roomId,
                        })
                    );
                }
            });
        }

    })

    ws.on("close", () => {
        const index = users.findIndex(u => u.ws === ws);
        if (index !== -1) {
            const user = users[index];
    // Notify others in all rooms the user was in
    user!.rooms.forEach((roomId) => {
      users.forEach((u) => {
        if (u.rooms.includes(roomId) && u.ws !== ws) {
          u.ws.send(
            JSON.stringify({
              type: "user_left",
              userId: user!.userId,
              roomId,
            })
          );
        }
      });
    });

            users.splice(index, 1);
        }
    });


})