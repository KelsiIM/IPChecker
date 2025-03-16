const express = require('express');
const cors = require('cors'); // import the cors package
const { classifyIP } = require('./function'); // correct path to your function.js
const app = express();
const port = 3000;

// enable CORS for all routes
app.use(cors());
app.use(express.json()); // middleware to parse JSON bodies

app.get('/', (req, res) => {
    const items = req.query.items;

    if (!items) {
        return res.status(400).json({ error: "IP Address Missing" });
    }

    const classifications = classifyIP(items);
    
    if (classifications.error) {
        return res.status(400).json({ error: classifications.error });
    }

    // Send back the classifications if everything is successful
    return res.status(200).json({ error: false, classifications });
});

app.listen(port, () => {
    console.log(`Server running at http://0.0.0.0:${port}/`);
});