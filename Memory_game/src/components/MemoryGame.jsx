import { Component } from "react";
import Message from "./Message";
import Board from "./Board";
import "./memoryGame.css";

export default class Game extends Component {
  state = {
    isClick: [],
    isNewGame: false,
    cardNums: [],
    visibility: [],
    clockTimer: null,
    playerMoves: 0,
    isGameOver: false,
    pointerEvents: "auto",
  };

  firstCard = null;
  firstCardIndex = null;
  SetTimeoutId = null;
  setIntervalId = null;
  gameOverCount = null;

  clickHandler = (i) => {
    const tempIsClick = { ...this.state.isClick };
    tempIsClick[i] = true;
    this.setState({ isClick: tempIsClick });
    //...

    if (!this.firstCard) {
      this.firstCard = this.state.cardNums[i];
      this.firstCardIndex = i;
    } else {
      if (this.firstCardIndex == i) {
        return;
      }
      this.cardsMatch(i);
      this.setState({ playerMoves: this.state.playerMoves + 1 });
      this.firstCard = null;

      this.cardsUpsideDown(i)
    }
  };

  cardsUpsideDown = (i) => {
    this.setState({ pointerEvents: "none" });
    setTimeout(() => {
      const tempIsClick = { ...this.state.isClick };
      tempIsClick[i] = false;
      tempIsClick[this.firstCardIndex] = false;
      this.setState({ isClick: tempIsClick });
      this.setState({ pointerEvents: "auto" });
    }, 1000);
  };

  cardsMatch = (i) => {
    if (this.firstCard == this.state.cardNums[i]) {
      const visibility = { ...this.state.visibility };
      visibility[i] = "hidden";
      visibility[this.firstCardIndex] = "hidden";

      this.setState({ pointerEvents: "none" });
      setTimeout(() => {
        this.setState({ visibility: visibility });
        this.setState({ pointerEvents: "auto" });
      }, 500);

      this.gameOverCount--;
      if (this.gameOverCount == 0) {
        console.log("game over");
        clearInterval(this.setIntervalId);
        setTimeout(() => {
          this.setState({ isGameOver: true });
        }, 500);
      }
    }
  };

  startGame = () => {
    const isClickArray = Array(8).fill(false);
    const visibilityArray = Array(8).fill("visible");
    this.setState({ isNewGame: true });
    this.setState({ isClick: isClickArray });
    this.setState({ visibility: visibilityArray });

    this.shuffleArray();

    clearInterval(this.setIntervalId);
    this.setState({ isGameOver: false });
    this.setState({ playerMoves: 0 });
    this.setState({ clockTimer: null });

    this.timer();
  };

  shuffleArray = () => {
    const allCards = [1, 2, 3, 4];

    const cardBoard = Array(2)
      .fill([...allCards])
      .reduce((a, b) => a.concat(b));

    for (let i = cardBoard.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardBoard[i], cardBoard[j]] = [cardBoard[j], cardBoard[i]];
    }
    this.gameOverCount = allCards.length;

    this.setState({ cardNums: cardBoard });
  };

  timer = () => {
    this.setIntervalId = setInterval(() => {
      this.setState({ clockTimer: this.state.clockTimer + 1 });
    }, 1000);
  };

  render() {
    return (
      <div className="gameContainer">
        <h1> memory Game</h1>
        <br />
        <Board
          cardNums={this.state.cardNums}
          visibility={this.state.visibility}
          isClick={this.state.isClick}
          pointerEvents={this.state.pointerEvents}
          clickHandler={this.clickHandler}
        />
        <br />
        <Message
          isNewGame={this.state.isNewGame}
          clockTimer={this.state.clockTimer}
          playerMoves={this.state.playerMoves}
          isGameOver={this.state.isGameOver}
        />
        <br />
        <button className="startBtn" onClick={this.startGame}>
          Start Game
        </button>
      </div>
    );
  }
}
