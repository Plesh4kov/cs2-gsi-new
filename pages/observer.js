import { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

export default function Observer() {
    const [currentPlayer, setCurrentPlayer] = useState(null);

    useEffect(() => {
        socket = io();
        socket.on("update", (data) => {
            setCurrentPlayer(data.observer.target);
        });
    }, []);

    if (!currentPlayer) return <div>Загрузка...</div>;

    const cameraURL = `https://vdo.ninja/?view=${currentPlayer}`;

    return (
        <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
            <iframe
                src={cameraURL}
                style={{ width: "100%", height: "100%", border: "none" }}
                allow="camera; microphone"
            />
        </div>
    );
}
