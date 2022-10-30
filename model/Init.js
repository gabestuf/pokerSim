const Game = require('./Game')
const CONFIG = require('./CONFIG.json')

const pokerGame = new Game(CONFIG)

pokerGame.init()


// pokerGame.cardLog()

/* Play a hand of Poker */
pokerGame.deck.shuffle()
pokerGame.playHand()
console.log(pokerGame.toString())