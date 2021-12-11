import { Component } from "react";
import Message from "./Message";
import Board from "./Board";
import "./memoryGame.css";

export default class Game extends Component {
  state = {
    isClick: [],
    isNewGame: false,
    cardNums: [],
    visibility: [
      "visible",
      "visible",
      "visible",
      "visible",
      "visible",
      "visible",
    ],
    clockTimer: null,
    playerMoves: 0,
    isGameOver: false,
  };

  isTwoCardPicked = 0;
  firstCard = null;
  firstCardIndex = null;
  SetTimeoutId = null;
  setIntervalId = null;
  gameOverCount = null;

  clickHandler = (card, i) => {
    //....
    const tempIsClick = { ...this.state.isClick };
    tempIsClick[i] = true;
    this.setState({ isClick: tempIsClick });
    //...

    if (!this.firstCard) {
      this.firstCard = this.state.cardNums[i];
      this.firstCardIndex = i;
    } else {
      this.setState({ playerMoves: this.state.playerMoves + 1 });

      if (
        this.firstCard == this.state.cardNums[i] &&
        this.firstCardIndex != i
      ) {
        console.log("match");
        const visibility = { ...this.state.visibility };
        visibility[i] = "hidden";
        visibility[this.firstCardIndex] = "hidden";
        this.setState({ visibility: visibility });
        this.gameOverCount--;
        if (this.gameOverCount == 0) {
          console.log("game over");
          clearInterval(this.setIntervalId);
          this.setState({ isGameOver: true });
        }
      }
      this.firstCard = null;

      setTimeout(() => {
        const tempIsClick = { ...this.state.isClick };
        tempIsClick[i] = false;
        tempIsClick[this.firstCardIndex] = false;
        this.setState({ isClick: tempIsClick });
      }, 1000);
    }
  };

  timer = () => {
    this.setIntervalId = setInterval(() => {
      this.setState({ clockTimer: this.state.clockTimer + 1 });
    }, 1000);
  };

  shuffleArray = () => {};

  startGame = () => {
    const isClickArray = Array(6).fill(false);
    const visibilityArray = Array(6).fill("visible");
    this.setState({ isNewGame: true });
    this.setState({ isClick: isClickArray });
    this.setState({ visibility: visibilityArray });

    const allCards = [1, 2, 3];
    const cardBoard = Array(2)
      .fill([...allCards])
      .reduce((a, b) => a.concat(b));

    for (let i = cardBoard.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardBoard[i], cardBoard[j]] = [cardBoard[j], cardBoard[i]];
    }
    this.gameOverCount = allCards.length;

    this.setState({ cardNums: cardBoard });

    clearInterval(this.setIntervalId);
    this.setState({ isGameOver: false });
    this.setState({ playerMoves: 0 });
    this.setState({ clockTimer: null });
    this.timer();
  };

  render() {
    return (
      <div>
        <Board
          cardNums={this.state.cardNums}
          visibility={this.state.visibility}
          isClick={this.state.isClick}
          clickHandler={this.clickHandler}

        />

        <button className="startBtn" onClick={this.startGame}>
          Start Game
        </button>

        <Message
          isNewGame={this.state.isNewGame}
          clockTimer={this.state.clockTimer}
          playerMoves={this.state.playerMoves}
          isGameOver={this.state.isGameOver}
        />
      </div>
    );
  }
}
