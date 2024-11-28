export default function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;

        // Логируем данные
        console.log("GSI Data Received:", JSON.stringify(data, null, 2));

        // Сохраняем данные игроков
        if (data.player) {
            players[data.player.name] = data.player;
        }

        // Сохраняем данные наблюдателя
        if (data.observer) {
            observer = data.observer;
        }

        res.status(200).json({ players, observer, raw: data });
    } else if (req.method === "GET") {
        res.status(200).json({ players, observer });
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
