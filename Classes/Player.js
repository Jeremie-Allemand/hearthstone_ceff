function Player(name,socketId){
    this.name = name
    this.socketId = socketId
    this.gameState = null
    this.opponent = null
}

module.exports = Player