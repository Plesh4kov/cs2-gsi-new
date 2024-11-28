let clients = []; // Массив подключенных клиентов

export default function handler(req, res) {
    if (req.method === "GET") {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        // Добавляем клиента в массив
        clients.push(res);

        // Удаляем клиента при отключении
        req.on("close", () => {
            clients = clients.filter((client) => client !== res);
        });
    } else if (req.method === "POST") {
        // Отправляем данные всем клиентам
        const message = JSON.stringify(req.body);
        clients.forEach((client) => {
            client.write(`data: ${message}\n\n`);
        });

        res.status(200).json({ message: "Data sent to all clients" });
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
