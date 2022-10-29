const Deck = require('./Deck')
const Player = require('./Player')


class Game {
    constructor(config) {
        this.config = config
        this.players = []
        this.deck = new Deck()
    }

    init() {
        // INIT Deck
        this.deck.init()

        // INIT Players
        for (let i = 0; i < this.config.numPlayers; i++) {
            this.players.push(new Player())
        }
    }

    addPlayer() {
        if (this.players.length >= 8) {
            console.error('Currently ', this.players.length, ' Players. Cannot add more than 8 players')
            return -1
        }
        this.players.push(new Player())
    }

    cardLog() {
        this.deck.cardLog()
    }

    deal() {
        //TODO for each player, deck.cards.pop , player.recieveCards
    }

}

module.exports = Game