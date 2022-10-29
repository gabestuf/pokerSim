

class Hand {
    constructor(card1, card2) {
        this.card1 = card1
        this.card2 = card2
    }

    toString() {
        return `${this.card1.log()} | ${this.card2.log()}`
    }
}

module.exports = Hand