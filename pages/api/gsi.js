let players = {};
let observer = null;

export default function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;

        // Обновляем данные игроков
        if (data.player) {
            players[data.player.name] = data.player;
        }

        // Обновляем наблюдателя
        if (data.observer) {
            observer = data.observer;
        }

        // Возвращаем статус
        return res.status(200).json({ message: "GSI updated" });
    }

    // Возвращаем текущих игроков
    if (req.method === "GET") {
        return res.status(200).json({ players, observer });
    }

    res.status(405).end(); // Method Not Allowed
}
