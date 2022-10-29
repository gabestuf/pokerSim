const Game = require('./Game')
const CONFIG = require('./CONFIG.json')

const pokerGame = new Game(CONFIG)

pokerGame.init()
// pokerGame.deck.shuffle()
// pokerGame.cardLog()

