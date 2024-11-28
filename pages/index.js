import { useState, useEffect } from "react";

export default function Home() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource("/api/sse");

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setPlayers(Object.keys(data.players || {}));
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>
            <h1>Список игроков</h1>
            <ul>
                {players.map((player) => (
                    <li key={player}>{player}</li>
                ))}
            </ul>
        </div>
    );
}
