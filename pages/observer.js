import { useState, useEffect } from "react";

export default function Observer() {
    const [observer, setObserver] = useState(null);

    useEffect(() => {
        const eventSource = new EventSource("/api/sse");

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setObserver(data.observer?.target || null);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>
            <h1>Наблюдатель</h1>
            {observer ? <p>Текущий игрок: {observer}</p> : <p>Нет наблюдателя</p>}
        </div>
    );
}
