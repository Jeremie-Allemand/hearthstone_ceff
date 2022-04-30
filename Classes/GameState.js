const Card = require('./Card.js');
function GameState(){
    this.life = 30
    this.isTurn = null
    this.hand = []
    this.board = []
    this.deck = getRandomDeck()
}

function getRandomDeck(){
    cards = []
    for(let i = 0;i < 30;i++){
        power = Math.floor(Math.random() * 7) + 1         
        life = Math.floor(Math.random() * 7) + 1         
        cards.push(new Card("Card : " + i, power, life))
    }
    return cards
}

module.exports = GameState