const Hand = require('./Hand')

class Player {
    constructor(id) {
        this.hand = 'empty'
        this.money = 0
        this.name = `Player ${id}`
        this.id = id
        this.amtBetThisPhase = 0
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
        if (this.money - bet < 0 && this.money > 0) {
            console.error(this.name + " doesn't have enough money, going all in.")
            bet = this.money
            this.money = 0
        }
        this.money -= bet
        this.amtBetThisPhase += bet
        return bet
    }


}

module.exports = Player