'use strict';

class Player {
  constructor(index) {
    this.index = index;
    this.player = document.querySelector(`.player--${this.index}`);
    this.name = document.querySelector(`#name--${index}`);
    this.score = document.querySelector(`#score--${this.index}`);
    this.scoreVal = Number(this.score.value);
    this.currScore = document.querySelector(`#current--${this.index}`);
    this.currScoreVal = Number(this.currScore.value);
    this.active = false;
  }

  setScore(score) {
    this.scoreVal = score;
    this.score.textContent = this.scoreVal;
  }

  toggleActive() {
    this.player.classList.toggle('player--active');
    this.active = !this.active;
  }

  addScore(score) {
    this.scoreVal += score;
    this.score.textContent = this.scoreVal;
  }

  setCurrScore(score) {
    this.currScoreVal = score;
    this.currScore.textContent = this.currScoreVal;
  }

  addCurrScore(score) {
    this.currScoreVal += score;
    this.currScore.textContent = this.currScoreVal;
  }

  setName(name) {
    this.name.textContent = name;
  }
}

class Game {
  constructor(winningPoints) {
    this.winningPoints = winningPoints;
    this.players = [new Player(0), new Player(1)];
    this.newGameBtn = document.querySelector('.btn--new');
    this.rollDiceBtn = document.querySelector('.btn--roll');
    this.holdDiceBtn = document.querySelector('.btn--hold');
    this.winner = null;
    this.dice = document.querySelector('.dice');
    this.newGameBtn.addEventListener('click', () => this.newGame());
    this.rollDiceBtn.addEventListener('click', () => this.rollDice());
    this.holdDiceBtn.addEventListener('click', () => this.holdDice());
    this.resetGame();
  }

  showBtn(btn, visibility) {
    btn.style.display = visibility ? 'block' : 'none';
  }

  hideDice() {
    this.dice.style.display = 'none';
  }

  showDice(diceNo) {
    this.dice.src = `dice-${diceNo}.png`;
    this.dice.style.display = 'block';
  }

  resetGame() {
    this.setCurrentPlayer(0);
    this.players.forEach(player => {
      player.setCurrScore(0);
      player.setScore(0);
      player.setName(`Player ${player.index + 1}`);
    });
    this.showBtn(this.rollDiceBtn, true);
    this.showBtn(this.holdDiceBtn, true);
    this.showBtn(this.newGameBtn, true);
    this.hideDice();
  }

  setCurrentPlayer(index) {
    this.players[index].active = true;
    this.players[1 - index].active = false;
    this.players[index].player.classList.add('player--active');
    this.players[1 - index].player.classList.remove('player--active');

    this.players.forEach(player => {
      if (player.index === index) {
        player.active = true;
        player.classList.add('player--active');
      } else {
        player.active = false;
        player.classList.remove('player--active');
      }
    });
  }

  getCurrentPlayer() {
    return this.players.find(player => player.active);
  }

  newGame() {
    this.resetGame();
  }

  switchPlayer() {
    this.players.forEach(player => player.toggleActive());
  }

  rollDice() {
    const diceNo = (Math.floor(Math.random() * 10) % 6) + 1;
    this.showDice(diceNo);
    if (diceNo === 1) {
      this.getCurrentPlayer().setCurrScore(0);
      this.switchPlayer();
    } else {
      this.getCurrentPlayer().addCurrScore(diceNo);
    }
  }

  holdDice() {
    const currPlayer = this.getCurrentPlayer();
    currPlayer.addScore(currPlayer.currScoreVal);
    currPlayer.setCurrScore(0);

    if (currPlayer.scoreVal >= this.winningPoints) {
      this.winner = currPlayer;
      this.gameOver();
    } else {
      this.switchPlayer();
    }
  }

  gameOver() {
    if (this.winner) {
      this.winner.setName(`Player ${this.winner.index + 1} WON`);
      this.showBtn(this.rollDiceBtn, false);
      this.showBtn(this.holdDiceBtn, false);
      this.showBtn(this.newGameBtn, true);
    }
  }
}

const game = new Game(10);
