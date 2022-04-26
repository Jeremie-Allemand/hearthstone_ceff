function Player(name,socket) {
    this.name = name
    this.socket = socket
    this.life = 30
    this.board = []
    this.hand = []
    this.game = null
}