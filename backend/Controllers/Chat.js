import { Server } from "socket.io";

export default (server) => {

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    // methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => { 
  console.log("User connected", socket.id)

  socket.on("join_Room", (data) => {
    socket.join(data)
    socket.emit("welcome_message", "Welcome to the chat")
  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data)
  })

  socket.on("disconnect", () => {
    console.log("A User has left the chat", socket.id);
    io.emit("userLeave_message", "A User has left the chat")
  });


})
}
