import { useState, useEffect } from "react";

export default function Home() {
    const [players, setPlayers] = useState([]);
    const [observer, setObserver] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/gsi");
            const data = await response.json();
            setPlayers(Object.values(data.players || {}));
            setObserver(data.observer);
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
                    <li key={player.name}>
                        {player.name} (Team: {player.team})
                    </li>
                ))}
            </ul>
            <h2>Наблюдатель</h2>
            {observer ? <p>Текущий игрок: {observer.target}</p> : <p>Нет наблюдателя</p>}
        </div>
    );
}
