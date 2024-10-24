import { Server as SocketIOServer, Socket } from "socket.io";
export default function setUpSocket(server: Express.Application) {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN || "",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();
  const disconnect = (socket: Socket, userId: string) => {
    console.log(`Client Disconnected: ${socket.id}`);
    userSocketMap.delete(userId);
  };
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
    }
    socket.on("disconnect", () => disconnect(socket, userId));
  });
}
