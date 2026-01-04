import { NextRequest } from "next/server";
import { Server } from "socket.io";

let io: Server | null = null;

export async function GET(req: NextRequest) {
  if (!io) {
    io = new Server(globalThis as any, {
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);
        const newdataa = [
          {
            a1: true,
            title: "connect to server socket.io successfully",
          },
          {
            a2: true,
            title: "you are client",
          }
        ]
    });
  }
}
