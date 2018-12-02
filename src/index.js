const express = require('express');
const bodyParser = require('body-parser');
const swaggerize = require('swaggerize-express');

const api = require('./config/swagger');

const headerMiddleware = require('./middleware/header.middleware');

const APP_PORT = process.env.PORT || 8080;
const handlers = './handlers';

const { APP_SECRET } = require('../config/auth');
const session = require('express-session');

const app = express();

app.use(bodyParser.json());
app.use(headerMiddleware);

// app.use(session({
//     secret: APP_SECRET,
//     saveUninitialized: false,
//     resave: false
// }));

app.get('/status', (req, res, next) => res.send('OK'));
app.get('/install', require('./handlers/install').get);
app.get('/auth', require('./handlers/auth').get);
app.get('/inventory', require('./handlers/inventory').get);

app.post('/discount', require('./handlers/discount').post);

// 404 response
app.use((req, res, next) => {
    res.status(404).send('API endpoint not found');
});

// Error response
app.use((err, req, res, next) => {
    if (err) {
        console.log('Error', err);

        res.status(err.code || 500)
            .send(err.message || 'General error');
    } else {
        next(res);
    }
});

app.listen(APP_PORT, (res, err) => {
    console.log(`App listening on port ${APP_PORT}`);
});
