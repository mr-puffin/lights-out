import React, { Component } from "react";
import Cell from "../cell/cell.component";
import "./board.styles.css";

const BOARD_SIZE = 5;
const PATTERN = [
  [0, 0],
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0]
];
class Board extends Component {
  state = {
    board: this.generateBoard()
  };

  generateBoard() {
    let board = new Array(BOARD_SIZE)
      .fill(false)
      .map(r =>
        new Array(BOARD_SIZE).fill(false).map(() => Math.round(Math.random()))
      );
    return board;
  }

  gameWon() {
    let { board } = this.state;
    return board.every(row => row.every(cell => !cell));
  }

  handleClick = (row, col) => {
    const { board } = this.state;
    PATTERN.forEach(neighbor => {
      let r = neighbor[0] + row;
      let c = neighbor[1] + col;
      if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE)
        board[r][c] = !board[r][c];
    });
    this.setState({ board });
  };

  handleRestart = () => {
    let board = this.generateBoard();
    this.setState({ board });
  };

  render() {
    const { board } = this.state;
    if (this.gameWon()) {
      return (
        <div className="board-title winner" onClick={this.handleRestart}>
          <span className="neon-orange">YOU</span>
          <span className="neon-blue">WON!</span>
        </div>
      );
    }
    return (
      <div>
        <div className="board-title" onClick={this.handleRestart}>
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
        </div>
        <table className="board">
          <tbody>
            {board.map((row, ir) => (
              <tr key={`row-${ir}`}>
                {row.map((cell, ic) => (
                  <td key={`col-${ic}`}>
                    <Cell
                      key={`${ir}-${ic}`}
                      row={ir}
                      col={ic}
                      isOn={cell}
                      onClick={this.handleClick}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
