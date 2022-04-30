
const cors = require('cors')
const express = require('express');
const Player = require('./Classes/Player.js');
const GameState = require('./Classes/GameState.js');
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

app.use('/', function(req,res){
  res.sendFile(__dirname + '/index.html')
})

http.listen(PORT, () =>
  console.log(`Express server is running on localhost:${PORT}`)
);

global.players = []

io.on('connection', socket =>{
    console.log(`client ${socket.id} connected`)

    socket.on('login', (name) => {
      global.players.push(new Player(name, socket.id))
      console.log(socket.id)
    })

    socket.on('challenge', (opponentId) => {
      let challenger = getPlayerWithSocketId(socket.id)
      let opponent = getPlayerWithSocketId(opponentId)
      if(challenger != null && opponent != null){
        challenger.opponent = opponentId
        opponent.opponent = socket.id
        challenger.gameState = new GameState()
        opponent.gameState = new GameState()
        challenger.gameState.isTurn = true
        opponent.gameState.isTurn = false
      }
    })

    socket.on('draw', () =>{
      let player = getPlayerWithSocketId(socket.id)
      player.gameState.hand.push(player.gameState.deck.shift())
    })

    socket.on('useCard', (cardIndexInHand) =>{
      let player = getPlayerWithSocketId(socket.id)
      player.gameState.board.push(player.gameState.hand.splice(cardIndexInHand,1)[0])
    })

    socket.on('attack', (attackerIndex, targetIndex) =>{
      let player = getPlayerWithSocketId(socket.id)
      let opponent = getPlayerWithSocketId(player.opponent)
      let attacker = player.gameState.board[attackerIndex] 
      let target = opponent.gameState.board[targetIndex] 
      attacker.life -= target.power
      target.life -= attacker.power

      console.log("noremove")
      console.log(attacker)
      console.log(target)

      if(attacker.life <= 0)
        player.gameState.board.splice(attackerIndex, 1)
      if(target.life <= 0)
        opponent.gameState.board.splice(targetIndex, 1)

      console.log("remove")
      console.log(player)
      console.log(opponent)
    })

    socket.on('disconnect',() => {
      onDisconnect(socket.id)
    })
})

function getPlayerWithSocketId(socketId){
  var index = null
  index = global.players.findIndex(p =>p.socketId === socketId)
  if(index != null)
    return players.at(index)
  return null
}

function onDisconnect(id){
  const index = global.players.findIndex(p =>p.socket_id === id)
  if(index)
    global.players.splice(index,1)
  console.log(`client ${id} disconnected`)
}