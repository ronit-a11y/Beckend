const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    // HOME ROUTE
    if (req.method === "GET" && pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to Notes API");
    }

    // NOTES ROUTE  ✅ (moved inside server)
    else if (req.method === "GET" && pathname === "/notes") {

        fs.readFile("notes.json", "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error reading notes");
                return;
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
        });
    }

    // DEFAULT ROUTE
    else {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Server is running");
    }
});

server.listen(3000, () => {
    console.log("Server on http://localhost:3000");
});
