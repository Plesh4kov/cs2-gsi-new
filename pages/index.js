import { useState, useEffect } from "react";

export default function Home() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/sse");
            const data = await response.json();
            setPlayers(Object.keys(data.players || {}));
        };

        fetchData();

        const interval = setInterval(fetchData, 5000); // Обновляем каждые 5 секунд
        return () => clearInterval(interval);
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
