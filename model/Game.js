const Deck = require('./Deck')
const Player = require('./Player')


class Game {
    constructor(config) {
        this.config = config
        this.players = []
        this.deck = new Deck()
        this.nextID = 0
        this.pot = 0
        this.button = 0
        this.blinds = config.startingBigBlind
        this.currentTurn = 0
        this.betPhase = 0 // 0 = preflop, 1 = flop, 2 = turn, 3 = river
    }

    toString() {
        let str = `The pot is ${this.pot} \n`
        for (let i = 0; i < this.players.length; i++) {
            if (i == this.currentTurn) {
                str += '* ' // indicating it's this player's turn
            }
            str += this.players[i].toString() + "\n"
        }
        return str
    }

    init() {
        // INIT Deck
        this.deck.init()

        // INIT Players
        for (let i = 0; i < this.config.numPlayers; i++) {
            this.players.push(new Player(this.nextID))
            this.nextID++
        }

        // Add starting money for each player
        for (const player of this.players) {
            player.addMoney(this.config.startingMoney)
        }

        this.currentTurn = this.button + 1
    }

    updateCurrentTurn() {
        this.currentTurn++
        if (this.currentTurn > this.players.length - 1) {
            this.currentTurn = 0
        }
    }

    addPlayer() {
        if (this.players.length >= 8) {
            console.error('Currently ', this.players.length, ' Players. Cannot add more than 8 players')
            return -1
        }
        this.players.push(new Player(this.nextID))
        this.players[this.nextID].addMoney(this.config.startingMoney)
        this.nextID++
    }

    deal() {
        for (const player of this.players) {
            const card1 = this.deck.cards.pop()
            const card2 = this.deck.cards.pop()
            player.recieveHand(card1, card2)
        }
    }

    startHand() {
        this.deal()
        this.pot += this.players[this.button + 1].bets(Math.round(this.blinds / 2))
        this.updateCurrentTurn()
        this.pot += this.players[this.button + 2].bets(Math.round(this.blinds))
        this.updateCurrentTurn()
    }

    action(action, amount = 0) {
        switch (action) {
            case 'check':
                break;
            case 'bet':
                break;
            case 'fold':
                break;
            default:
                console.error('Invalid action')
                break;
        }
    }

    removePlayer(id) {
        for (const player of this.players) {
            if (player.id == id) {
                this.players.pop(player)
            }
        }
    }

}

module.exports = Game