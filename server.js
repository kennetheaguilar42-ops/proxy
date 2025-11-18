const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔹 Endpoint 1 — Obtener información de un gamepass específico
app.get("/gamepass/:id", async (req, res) => {
    const id = req.params.id;
    const url = `https://economy.roblox.com/v2/developer-products/${id}`;

    try {
        const response = await axios.get(url, {
            headers: { "User-Agent": "Mozilla/5.0" }
        });

        res.json({ success: true, data: response.data });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

// 🔹 Endpoint 2 — Obtener TODOS los gamepasses creados por un usuario (como PLS DONATE)
app.get("/gamepasses/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const url = `https://catalog.roblox.com/v1/search/items?category=GamePass&creatorTargetId=${userId}&limit=30`;

    try {
        const response = await axios.get(url, {
            headers: { "User-Agent": "Mozilla/5.0" }
        });

        res.json({ success: true, data: response.data });
    } catch (err) {
        res.json({ success: false, error: err.message });
    }
});

// 🔹 Página principal
app.get("/", (req, res) => {
    res.send("Roblox Proxy API is running ✔");
});

// 🔹 Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
