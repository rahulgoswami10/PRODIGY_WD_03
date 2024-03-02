import './App.css';
import Board from "./components/board/Board.js" ;
import React, { useState } from "react";
import ScoreBoard from './components/scoreBoard/ScoreBoard.js';
import Reset from './components/reset/Reset.js';
import Header from './components/header/Header.js';

function App() {

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  const handleBoxClick = (boxIdx) => {
    const updatedBoard = board.map((value, idx) => {
      if(idx === boxIdx) {
        return xPlaying === true ? "X" : "O"; 
      } else {
        return value;
      }
    })

    const winner = checkWinner(updatedBoard);

    if(winner) {
      if(winner === "O") {
        let {oScore} = scores;
        oScore++;
        setScores({...scores, oScore})
      } else {
        let {xScore} = scores;
        xScore++
        setScores({...scores, xScore})
      }
    }

    setBoard(updatedBoard);

    setXPlaying(!xPlaying);
  }

  const checkWinner = (board) => {
    for(let i=0; i < winPatterns.length; i++) {
      const [pos1, pos2, pos3] = winPatterns[i];

      if(board[pos1] && board[pos1] === board[pos2] && board[pos2] === board[pos3]) {
        setGameOver(true);
        return board[pos1];
      
      }
    }
  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  }

  return (
    <div className="App">
      <Header />
      <ScoreBoard scores={scores} xplaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <Reset resetBoard={resetBoard}/>
    </div>
  );
}

export default App;
