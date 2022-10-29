const Deck = require('./Deck')
class Game {
    constructor() {
        this.players = []
        this.deck = new Deck()
    }

    init() {
        this.deck.init()
    }

    cardLog() {
        this.deck.cardLog()
    }

}

module.exports = Game