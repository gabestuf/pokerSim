const Card = require('./Card')


class Deck {
    constructor() {
        this.cards = []
    }

    init() {
        this.cards = []
        for (let i = 0; i < 52; i++) {
            this.cards.push(new Card(i))
        }
        return {
            status: 'SUCCESS',
            message: 'Deck initiated'
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
        return {
            status: 'SUCCESS',
            message: 'shuffled deck'
        }
    }

    cardLog() {
        for (const card of this.cards) {
            console.log(card.toString())
        }
    }

    pop() {
        return this.cards.pop()
    }
}

module.exports = Deck