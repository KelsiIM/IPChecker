const express = require('express');
const cors = require('cors'); // import the cors package
const { countryIP } = require('./function'); // correct path to your function.js
const app = express();
const port = 3001;

// enable CORS for all routes
app.use(cors());
app.use(express.json()); // middleware to parse JSON bodies

app.get('/', (req, res) => {
    const items = req.query.items;

    if (!items) {
        return res.status(400).json({ error: "IP Address Missing"});
    }

    const countryips = countryIP(items);

    if (countryips.error) {
        return res.status(400).json({ error: countryips.error});
    }

    // send back the countries if successful
    return res.status(200).json({ error: false, countryips});
});

app.listen(port, () => {
    console.log(`Server running at http://0.0.0.0:${port}/`);
});