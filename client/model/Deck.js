const Card = require('./Card')


class Deck {
    constructor() {
        this.cards = []
    }

    init() {
        for (let i = 0; i < 52; i++) {
            this.cards.push(new Card(i))
        }
    }

    shuffle() { //Fisher-Yates 
        let currentIndex = this.cards.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [this.cards[currentIndex], this.cards[randomIndex]] =
                [this.cards[randomIndex], this.cards[currentIndex]];
        }

    }

    cardLog() {
        for (const card of this.cards) {
            card.log()
        }
    }

    pop() {

    }
}

module.exports = Deck