"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes/"));
const config_1 = require("./config");
const config_2 = require("./config");
const index_1 = __importDefault(require("./routes/dashboard-routes/index"));
const index_2 = __importDefault(require("./routes/search-routes/index"));
const chat_routes_1 = __importDefault(require("./routes/chat-routes"));
const message_routes_1 = __importDefault(require("./routes/message-routes"));
const socket_io_1 = require("socket.io");
const media_upload_1 = __importDefault(require("./routes/media-upload"));
const share_routes_1 = __importDefault(require("./routes/share-routes"));
// we have to create the app where we query the content and
// the query + relevant docs are send to the gpt and then gpt 
// give the explaination
mongoose_1.default.connect(config_1.MONGODB_URL).then(() => console.log("Database is Connected")).catch((err) => console.log("Database is not Connected"));
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: "*",
    methods: ['GET', 'POST', 'DELETE', 'PUT']
}));
app.use(express_1.default.json());
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/content", index_1.default);
app.use("/api/v1/search", index_2.default);
app.use("/api/v1/chats", chat_routes_1.default);
app.use("/api/v1/message", message_routes_1.default);
app.use("/api/v1/media", media_upload_1.default);
app.use("/api/v1/share", share_routes_1.default);
;
// app.use("/api/v1/share",ShareRouter);
const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err.message
    });
};
app.use(errorHandler);
const server = app.listen(config_2.PORT, () => console.log("Server is running on the port " + process.env.PORT));
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
let connectedUser = [];
io.on("connection", function (socket) {
    console.log("User is connected", socket.id);
    socket.on("setup", (data) => {
        // socket.userId = data;
        console.log("setup", data);
        socket.join(data);
        if (!connectedUser.includes(data)) {
            connectedUser.push(data);
        }
        console.log("joined rooms", Array.from(socket.rooms));
        const allRooms = io.sockets.adapter.rooms;
        socket.emit("available-users", connectedUser);
        for (let [room, sockets] of allRooms) {
            io.to(room).emit("user-connected", data);
        }
    });
    socket.on("join-chat", function (roomId) {
        socket.join(roomId);
        console.log("join-chat", roomId);
    });
    socket.on("typing", (room) => {
        socket.to(room).emit("typing", true);
    });
    socket.on("stop-typing", (room) => {
        socket.to(room).emit("stop typing", true);
    });
    socket.on("leave-group", (room) => {
        socket.leave(room);
    });
    socket.on("new-message", (data) => {
        console.log("new-message", data);
        socket.to(data.roomId).emit("new-message", data);
    });
    socket.on("disconnecting", () => {
        const SocketRooms = Array.from(socket.rooms);
        console.log("socket-rooms", SocketRooms);
        console.log("user disconnected", SocketRooms[1]);
        //here i am removing the user
        for (let i = 0; i < connectedUser.length; i++) {
            if (connectedUser[i] == SocketRooms[1]) {
                connectedUser.splice(i, 1);
                break;
            }
        }
        for (let i = 0; i < SocketRooms.length; i++) {
            console.log(SocketRooms[i]);
            io.to(SocketRooms[i]).emit("user-disconnected", SocketRooms[1]);
        }
    });
    socket.on("disconnect", () => {
        console.log("someone-isdisconnected");
    });
});
