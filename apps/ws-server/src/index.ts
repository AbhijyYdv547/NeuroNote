import { WebSocket,WebSocketServer } from "ws";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import {prismaClient} from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User{
    ws:WebSocket,
    rooms:string[],
    userId:string
}

const users:User[] =[];


function checkUser(token: string): string | null {
    try{
        const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded == "string") {
        return null;
    }
    if (!decoded || !decoded.userId) {
        return null;
    }
    return decoded.userId;
    }catch(e){
        return null;
    }
    return null;
}

wss.on("connection", function connection(ws, request) {
    const url = request.url;
    if (!url) return;
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";
    const userId = checkUser(token);

    if (userId==null) {
        ws.close()
        return
    }

    users.push({
        userId,
        rooms:[],
        ws
    })

    ws.on("message",async (data) => {
        let parsedData;
        if(typeof data !== "string"){
            parsedData = JSON.parse(data.toString())
        }else{
            parsedData = JSON.parse(data);
        }

        if(parsedData.type == "join_room"){
            const user = users.find(x => x.ws === ws)
            user?.rooms.push(parsedData.roomId)
        }

        if(parsedData.type == "leave_room"){
            const user = users.find(x => x.ws === ws);
            if(!user){
                return;
            }
            user.rooms = user?.rooms.filter(x => x === parsedData.room.toString())
        }

        if(parsedData.type == "chat"){
            const roomId = parsedData.roomId;
            const message = parsedData.message;
            if (!roomId || !message) return;


            await prismaClient.chat.create({
                data:{
                    roomId:Number(roomId),
                    message,
                    senderId:Number(userId)
                }
            })
            
            users.forEach(user =>{
                console.log(`Checking user ${user.userId} in rooms: ${user.rooms}`);
                if(user.rooms.includes(roomId.toString())){
                    console.log(`Sending message to user ${user.userId}`);
                    user.ws.send(JSON.stringify({
                        type:"chat",
                        message:message,
                        roomId,
                        sender:userId
                    }))
                }
            })

            
        }
    })

    ws.on("close", () => {
    const index = users.findIndex(u => u.ws === ws);
    if (index !== -1) {
        users.splice(index, 1);
    }
});


})