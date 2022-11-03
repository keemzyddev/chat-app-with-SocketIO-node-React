import express from "express";
import http from "http";
import cors from "cors";
// import { Server } from "socket.io";
import chat from "./Controllers/Chat.js"

const app = express();
app.use(cors());

const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     // methods: ["GET", "POST"],
//   },
// });


server.listen(5000, () => console.log(`server listening on port 5000`));
chat(server);