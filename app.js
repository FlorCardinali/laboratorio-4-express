require('dotenv').config();
const Server = require("./models/server.js");

const serv = new Server();

serv.listen();