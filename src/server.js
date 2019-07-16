const http = require('http');
const router = require('./router')

const server = http.createServer(router);
server.listen(4000);
module.exports = server
