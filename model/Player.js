const Hand = require('./Hand')

class Player {
    constructor(id) {
        this.hand = 'empty'
        this.money = 0
        this.name = `Player ${id}`
        this.id = id
    }

    toString() {
        if (this.hand !== 'empty') {
            return `${this.name} has $${this.money}, and is holding ${this.hand.toString()}`
        }
        return `${this.name} has $${this.money}`
    }

    addMoney(num) {
        this.money += num
    }

    recieveHand(card1, card2) {
        this.hand = new Hand(card1, card2)
    }
    folds() {

        return this.hand
    }
    bets(bet) {

        return bet
    }


}

module.exports = Player