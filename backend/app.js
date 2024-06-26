// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware pentru a parsa cererile JSON
app.use(express.json());

// Răspunde la cererile GET pe ruta rădăcină
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Pornește serverul
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});