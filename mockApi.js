// mockStockAPI.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const PORT = process.env.PORT
// Mock stock price generator
let stockPrice = 100;

setInterval(() => {
    stockPrice += stockPrice * (Math.random() - 0.5) * 0.01;
}, 1000);

app.get('/api/stock-price', (req, res) => {
    res.json({ price: stockPrice.toFixed(2) });
});

app.listen(PORT, () => {
    console.log(`Mock stock API running on http://localhost:${PORT}`);
});
