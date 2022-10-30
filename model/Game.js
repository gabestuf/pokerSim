const Deck = require('./Deck')
const Player = require('./Player')


class Game {
    constructor(config) {
        this.config = config
        this.players = []
        this.deck = new Deck()
        this.nextSeatAvailable = 0
        this.pot = 0
        this.button = 0
        this.blinds = config.startingBigBlind
    }

    toString() {
        let str = '\n'
        for (const player of this.players) {
            str += player.toString() + "\n"
        }
        return str
    }

    init() {
        // INIT Deck
        this.deck.init()

        // INIT Players
        for (let i = 0; i < this.config.numPlayers; i++) {
            this.players.push(new Player(this.nextSeatAvailable))
            this.nextSeatAvailable++
        }

        // Add starting money for each player
        for (const player of this.players) {
            player.addMoney(this.config.startingMoney)
        }
    }

    addPlayer() {
        if (this.players.length >= 8) {
            console.error('Currently ', this.players.length, ' Players. Cannot add more than 8 players')
            return -1
        }
        this.players.push(new Player(this.nextSeatAvailable))
        this.players[this.nextSeatAvailable].addMoney(this.config.startingMoney)
        this.nextSeatAvailable++
    }

    deal() {
        for (const player of this.players) {
            const card1 = this.deck.cards.pop()
            const card2 = this.deck.cards.pop()
            player.recieveHand(card1, card2)
        }
    }

    playHand() {
        this.deal()
        this.players[this.button + 1].bets()
    }

}

module.exports = Game