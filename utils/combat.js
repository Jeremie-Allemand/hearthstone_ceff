import "../Classes/Card"

function attack (firstCard, secondCard){
    firstCard.life -= secondCard.power 
    secondCard.life -= firstCard.power
}