const Deck = require("./Deck");
const Player = require("./Player");

class Game {
  constructor(config) {
    this.config = config;
    this.players = [];
    this.deck = new Deck();
    this.nextID = 0;
    this.pot = 0;
    this.button = 0;
    this.blinds = config.startingBigBlind;
    this.currentTurn = 0;
    this.currentBet = 0;
    this.betPhase = 0; // 0 = preflop, 1 = flop, 2 = turn, 3 = river
  }

  toString() {
    let str = `The pot is ${this.pot} \n`;
    for (let i = 0; i < this.players.length; i++) {
      if (i == this.currentTurn) {
        str += "* "; // indicating it's this player's turn
      }
      if (i == this.button) {
        str += "(btn) ";
      }
      if (i == this.button + 1) {
        str += "(s_bld) ";
      }
      if (i == this.button + 2) {
        str += "(b_bld) ";
      }
      str += this.players[i].toString() + "\n";
    }
    return str;
  }

  init() {
    // INIT Deck
    this.deck.init();

    // INIT Players
    for (let i = 0; i < this.config.numPlayers; i++) {
      this.players.push(new Player(this.nextID));
      this.nextID++;
    }

    // Add starting money for each player
    for (const player of this.players) {
      player.addMoney(this.config.startingMoney);
    }

    this.currentTurn = this.button + 1;
  }

  updateCurrentTurn() {
    this.currentTurn++;
    if (this.currentTurn > this.players.length - 1) {
      this.currentTurn = 0;
    }
  }

  addPlayer() {
    if (this.players.length >= 8) {
      console.error(
        "Currently ",
        this.players.length,
        " Players. Cannot add more than 8 players"
      );
      return -1;
    }
    this.players.push(new Player(this.nextID));
    this.players[this.nextID].addMoney(this.config.startingMoney);
    this.nextID++;
  }

  deal() {
    for (const player of this.players) {
      const card1 = this.deck.cards.pop();
      const card2 = this.deck.cards.pop();
      player.recieveHand(card1, card2);
    }
  }

  startHand() {
    this.deal();
    this.playPreflop();

    // at end of hand
    // reset players currentBets and stuff
    // move button 1
  }

  isPotRight() {
    for (let player of this.players) {
      if (!this.isPlayerSquare(player)) {
        return false;
      }
    }
    return true;
  }

  isPlayerSquare(player) {
    // all players must be square for round to end
    if (player.isFolded || player.isAllIn) {
      return true;
    }

    return player.amtBetThisPhase == this.currentBet;
  }

  playPreflop() {
    // TODO add preflop big blind option

    // Small and big blinds
    this.currentBet = this.blinds;
    this.pot += this.players[this.currentTurn].bets(
      Math.round(this.currentBet / 2)
    );
    this.updateCurrentTurn();
    this.pot += this.players[this.currentTurn].bets(
      Math.round(this.currentBet)
    );
    this.updateCurrentTurn();

    // Go around the table until everyone is in or out
    let potRight = false;
    while (!potRight) {
      // for each player, allow them to bet/fold or check if they are all payed up
      if (this.players[this.currentTurn].isFolded) {
        continue;
      }
      // check if they're square, then give option to check
      if (this.isPlayerSquare(this.players[this.currentTurn])) {
        // await player input
        // this.action(this.currentTurn, "check")
      }
      // this.action(this.currentTurn, "bet", 10) //TODO make sure bet is viable, ie bet >= 2* currentbet
      // this.action(this.currentTurn, "fold")

      this.pot += this.action(this.currentTurn, "call");
      this.updateCurrentTurn();

      potRight = this.isPotRight();
    }
  }

  //   // BIG blind option
  //   if (
  //     this.currentBet == this.blinds &&
  //     this.currentTurn == this.button + 2
  //   ) {
  //     // give big blind option, check, bet, fold
  //     if (this.pot < 50) {
  //       this.pot += this.action(this.currentTurn, "bet", 5);
  //     }
  //   }

  action(currentPlayerIndex, action, amount = 0) {
    let amt = 0;
    switch (action) {
      case "check":
        // pass to next player
        break;
      case "bet":
        amt = this.players[currentPlayerIndex].bets(amount);
        this.currentBet = amt;
        break;
      case "fold":
        break;
      case "call":
        amt = this.players[currentPlayerIndex].calls(this.currentBet);
        break;
      default:
        console.error("Invalid action");
        break;
    }
    return amt;
  }

  removePlayer(id) {
    for (const player of this.players) {
      if (player.id == id) {
        this.players.pop(player);
      }
    }
  }
}

module.exports = Game;
