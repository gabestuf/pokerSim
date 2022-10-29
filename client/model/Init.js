const Game = require('./Game')
const numPlayers = 4


const pokerGame = new Game()

pokerGame.init()
pokerGame.deck.shuffle()
pokerGame.cardLog()
