

class Hand {
    constructor(card1, card2) {
        this.card1 = card1
        this.card2 = card2
    }

    toString() {
        return `${this.card1.toString()} | ${this.card2.toString()}`
    }
}

module.exports = Hand