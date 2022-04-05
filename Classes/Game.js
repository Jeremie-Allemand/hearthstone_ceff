import { v4 as uuidv4 } from 'uuid';

class Game {
    constructor(){
        this.player1 = null
        this.player2 = null
        this.uuid = uuidv4()
    }
}