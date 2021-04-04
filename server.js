require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(cors());


const usersRouter = require('./routes/users');
const reunionsRouter = require('./routes/reunions');

const Users = require('./db/users');
const Reunions = require('./db/reunions');

app.use('/api/users', usersRouter);
app.use('/api/reunions', reunionsRouter);

app.listen(port, () => {
    console.log(`Backend Server Users running on port ${port}`);
});