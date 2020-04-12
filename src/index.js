require('dotenv').config();

const Server = require('./Server.js');
const server = new Server(process.env.PORT);

server.start();
