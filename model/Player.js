const Hand = require("./Hand");

class Player {
  constructor(id) {
    this.hand = "empty";
    this.money = 0;
    this.name = `Player ${id}`;
    this.id = id;
    this.amtBetThisPhase = 0;
    this.amtBetThisHand = 0;
    this.isFolded = false;
    this.isAllIn = false;
  }

  toString() {
    if (this.hand !== "empty") {
      return `${this.name} has $${
        this.money
      }, and is holding ${this.hand.toString()}`;
    }
    return `${this.name} has $${this.money}`;
  }

  addMoney(num) {
    this.money += num;
  }

  recieveHand(card1, card2) {
    this.hand = new Hand(card1, card2);
  }

  checks() {
    return 0;
  }

  folds() {
    return this.hand;
  }

  calls(currentBet) {
    const amtToBet = currentBet - this.amtBetThisPhase;
    this.amtBetThisHand += amtToBet;
    return this.bets(amtToBet);
  }

  bets(amt) {
    if (this.money - amt < 0 && this.money > 0) {
      console.error(this.name + " doesn't have enough money, going all in.");
      amt = this.money;
      this.money = 0;
      this.amtBetThisHand += amt;
      this.isAllIn = true;
      return amt;
    }
    this.money -= amt;
    this.amtBetThisPhase += amt;
    this.amtBetThisHand += amt;
    return amt;
  }
}

module.exports = Player;
