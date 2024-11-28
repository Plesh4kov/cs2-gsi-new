import { Server } from "socket.io";

let players = {};
let observer = null;

export default function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;

        // Обработка данных GSI
        if (data.player) {
            players[data.player.name] = data.player;
        }
        if (data.observer) {
            observer = data.observer;
        }

        // Обновляем через WebSocket
        io.emit("update", { players, observer });

        return res.status(200).json({ message: "GSI updated" });
    }

    // Возвращаем список игроков
    if (req.method === "GET") {
        return res.status(200).json({ players, observer });
    }

    res.status(405).end(); // Method Not Allowed
}

let io;
if (!io) {
    io = new Server({
        path: "/api/socketio",
    });
    io.on("connection", (socket) => {
        console.log("Client connected");
        socket.emit("update", { players, observer });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
}
