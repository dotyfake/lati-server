const express = require('express');
const path = require("path")
const morgan = require('morgan');
const http = require('http')
const { urlencoded } = require('express');
const db = require('./config/db');
const route = require('./routes')
const socketIo = require('./socket/socket')
const {Server} = require('socket.io')

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app)

const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });
  io.set('transports', ['websocket']);


app.use(morgan('combined'));

// app.use(express.static(path.join(__dirname, 'public')))


db.connect()


app.use(
    express.urlencoded({
        extended: true,
        limit: '3mb'
    }),
);
app.use(express.json({limit: '3mb'}));

route(app);

socketIo(io);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
