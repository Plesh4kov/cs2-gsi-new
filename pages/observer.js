import { useState, useEffect } from "react";

export default function Observer() {
    const [observer, setObserver] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/sse");
            const data = await response.json();
            setObserver(data.observer?.target || null);
        };

        fetchData();

        const interval = setInterval(fetchData, 5000); // Обновляем каждые 5 секунд
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Наблюдатель</h1>
            {observer ? <p>Текущий игрок: {observer}</p> : <p>Нет наблюдателя</p>}
        </div>
    );
}
