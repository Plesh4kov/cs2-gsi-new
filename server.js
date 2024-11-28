const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

const players = {};
let observer = null;

app.prepare().then(() => {
    const server = createServer((req, res) => {
        handle(req, res);
    });

    const io = new Server(server, {
        path: "/api/socketio",
    });

    io.on("connection", (socket) => {
        console.log("Client connected");

        // Отправляем начальное состояние
        socket.emit("update", { players, observer });

        // Логика отключения
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });

    server.listen(3000, () => {
        console.log("Server running on http://localhost:3000");
    });
});
