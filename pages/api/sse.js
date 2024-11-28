let players = {};
let observer = null;

let clients = []; // Хранит открытые соединения клиентов

export default function handler(req, res) {
    if (req.method === "GET") {
        // Подключаем клиента
        clients.push(res);

        // Устанавливаем заголовки для long polling
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        // Удаляем клиента при отключении
        req.on("close", () => {
            clients = clients.filter((client) => client !== res);
        });
    } else if (req.method === "POST") {
        // Получаем данные и обновляем состояние
        const data = req.body;

        if (data.players) players = data.players;
        if (data.observer) observer = data.observer;

        // Отправляем данные всем клиентам
        clients.forEach((client) => {
            client.end(JSON.stringify({ players, observer }));
        });

        // Очищаем массив клиентов после отправки
        clients = [];

        res.status(200).json({ message: "Data sent to all clients" });
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
