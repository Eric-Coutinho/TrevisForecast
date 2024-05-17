const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

require('./startup/db')();

app.use(cors({
    origin: '*'
}));

require('dotenv').config();
require('./startup/routes')(app);

const port = 8080;

app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));