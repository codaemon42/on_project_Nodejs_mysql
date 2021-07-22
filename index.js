require('dotenv').config();
const http = require('http');

const app = require('./app');
global.__basedir = __dirname;
const server = http.createServer(app);

server.listen(process.env.PORT, ()=>{
    console.log(`server started ${process.env.PORT}`);
});



