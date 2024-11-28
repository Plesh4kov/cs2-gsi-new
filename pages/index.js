import { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

export default function Home() {
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    useEffect(() => {
        socket = io();
        socket.on("update", (data) => {
            setPlayers(Object.keys(data.players));
        });
    }, []);

    return (
        <div>
            <h1>Выберите игрока</h1>
            <select onChange={(e) => setSelectedPlayer(e.target.value)}>
                <option value="">-- Выберите игрока --</option>
                {players.map((player) => (
                    <option key={player} value={player}>
                        {player}
                    </option>
                ))}
            </select>
            {selectedPlayer && (
                <a href={`/player/${selectedPlayer}`}>
                    Подключить веб-камеру для {selectedPlayer}
                </a>
            )}
        </div>
    );
}
