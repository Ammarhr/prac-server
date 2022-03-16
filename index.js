const server = require('./src/server');
const pg = require('pg');
require('dotenv').config();
const client = require('./src/database');

const PORT = process.env.PORT;

client.connect().then(() => {

    server.start(PORT);

});