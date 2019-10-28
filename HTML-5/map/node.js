const express = require('express');
const server = express();

server.listen(2378);

server.use(express.static('./'));