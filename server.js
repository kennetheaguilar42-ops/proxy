require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

// Endpoint: obtener detalles del gamepass
app.get('/gamepass/:id', async (req, res) => {
  const id = req.params.id;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ success: false, error: "ID inválido" });
  }

  try {
    const robloxUrl = `https://economy.roblox.com/v2/assets/${id}/details`;
    const response = await fetch(robloxUrl);
    const data = await response.json();

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.toString() });
  }
});

app.get('/', (req, res) => {
  res.send('Roblox Proxy funcionando. Usa /gamepass/ID');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
