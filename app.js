require('dotenv').config();
const express = require('express');
var cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(cors());

const usersRouter = require('./routes/users');
const reunionsRouter = require('./routes/reunions');
const Users = require('./db/users');

//authMiddleware
async function authMiddleware(req, res, next) {
    token = req.headers['x-user-token']; // Validar el token 
    jwt.verify(token, 'secret', function (err, decoded) {
        if (err) {
            res.status(401);
            console.log("Token invalido");
            res.end("Token invalido");
        } else {
            console.log("decoded");
            console.log(decoded.email);
            console.log(decoded.name);
            req.name = decoded.name;
            req.email = decoded.email;
            next();
        }
    });
}
//login
app.post('/login', async function (req, res) {
    Users.findOne({
        email: req.body.email
    }, (err, data) => {
        if (err) {
            res.statusCode = 400;
            res.end("Credenciales incorrectas");
        } else {
            //comparar pswds
            if (req.body.password == data.password) {
                let token = jwt.sign({
                    name: data.name,
                    email: data.email
                }, 'secret');
                console.log("Usuario logueado con token");
                console.log("token");
                console.log(token);
                res.statusCode = 200;
                res.end(token);
            } else {
                res.statusCode = 400;
                res.end("Credenciales incorrectas");
            }
        }
    })
});

//loggedin to get info del usuario logueado
app.get('/loggedIn', authMiddleware, (req, res) => {
    res.send({
        'email': req.email,
        'name': req.name
    });
});

app.use('/api/users', usersRouter);
app.use('/api/reunions', reunionsRouter);
app.get('/', function (req, res) {
    res.end('Hello there from mongofunctions service!');
});

app.listen(port, () => {
    console.log(`Backend Server Users running on port ${port}`);
});