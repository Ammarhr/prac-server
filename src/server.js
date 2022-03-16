const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const signupRouter = require('./routs/signup');
const signInRouter = require('./routs/signin');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(signupRouter);
app.use(signInRouter);

app.get('*', (req, res) => {
    res.status(404).send('page not found');
});

const server = {
    app: app,
    start: (PORT) => {
        app.listen(PORT, () => {
            console.log('we are on port' + PORT);
        })
    }
}

module.exports = server;