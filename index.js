const Game = require('./Classes/Game.js');
const Player = require('./Classes/Player.js');

const cors = require('cors')
const express = require('express')
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http,{
  cors: {
    origins: ["*"],
    methods: ["GET","POST","PUT","DELETE"]
  }
})

const PORT = process.env.PORT || 3001
app.use(express.json());
app.use(cors())

http.listen(PORT, () =>
  console.log(`Express server is running on localhost:${PORT}`)
);

global.games = {}
global.players = {}
global.games.append(new Game())



io.on('connection', socket =>{
    console.log(`client ${socket.id} connected`)

    socket.on('login', (data) => {
        console.log(data)  
        global.players.append(new Player(data.name, socket))
    })

    socket.on('disconnect',() => {
        console.log(`client ${socket.id} disconnected`)
    })
})