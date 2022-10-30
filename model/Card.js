// numericalValue is 2...10, 11 = J, 12 = Q, 13 = K, 14 = Ace

const toCardValues = (num) => {
    if (num < 2 || num > 14) return false;
    if (num > 1 && num < 11) return num.toString();
    if (num === 11) return "Jack";
    if (num === 12) return "Queen";
    if (num === 13) return "King";
    if (num === 14) return "Ace";
    return {
        status: 'FAILED',
        message: 'error in function toCardValues'
    }
}

const convertCardID = (num) => {
    // takes num 0...51
    if (num < 0 || num > 51) return {
        suit: undefined,
        value: undefined,
        stringValue: undefined
    }

    let suit = ""

    switch (Math.floor(num / 13)) {
        case 0:
            suit = 'Clubs'
            break;
        case 1:
            suit = 'Diamonds'
            break;
        case 2:
            suit = 'Hearts'
            break;
        case 3:
            suit = 'Spades'
            break;
        default:
            console.error("Error converting card ID")
            suit = "NO SUIT, THERE HAS BEEN A MASSIVE ERROR"
            break;
    }

    // returns suit, value (2...14), stringValue (2...'Ace')

    return {
        suit: suit,
        value: (num % 13 + 2),
        stringValue: toCardValues(num % 13 + 2)
    }
}

class Card {
    constructor(id_) {
        this.id = id_
        this.suit = convertCardID(id_).suit
        this.numericalValue = convertCardID(id_).value
        this.stringValue = convertCardID(id_).stringValue
    }

    toString() {
        return `${this.stringValue} of ${this.suit}`
    }

}

module.exports = Card