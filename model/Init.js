const Game = require("./Game");
const CONFIG = require("./CONFIG.json");

const pokerGame = new Game(CONFIG);

pokerGame.init();

// pokerGame.cardLog()

/* Play a hand of Poker */
pokerGame.deck.shuffle();

// startHand deals cards to players, puts in little & big blind
pokerGame.startHand();
console.log(pokerGame.toString());

// TODO at the end of hand, return pot to winning player(s)
// check if any player's money <= 0, if yes, game.players.pop()
