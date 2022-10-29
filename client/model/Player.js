const Hand = require('./Hand')

class Player {
    constructor() {
        this.hand = 'empty'
    }

    recieveHand(card1, card2) {
        this.hand = new Hand(card1, card2)
    }
    folds() {

        return this.hand
    }
    bets() {

        return bet
    }


}

module.exports = Player