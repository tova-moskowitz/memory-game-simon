import "./App.css";
import Squares from "./components/Squares.js";
import Slider from "./components/Slider.js";
import { useState, useEffect } from "react";

// keep count of wrong guesses
// keep count of right guesses
// keep count of total guesses
// when all are found, player wins and message text changes
// dedupe the randomNums array
// slider is stuck
// css to resize the grid dynamically

// ie; 0 right out of 2 total with 0 mistakes.

function App() {
  const [squareState, setsquareState] = useState("clear");
  const [randomNums, setRandomNums] = useState([]);
  const [clickedNums, setClickedNums] = useState([]);
  const [gridSize, setGridSize] = useState(5);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const numBoxes = gridSize * gridSize;
  const grid = [];

  const handleChangeSlider = (event) => {
    setGridSize(event.target.value);
    setRandomNums([]);
    setClickedNums([]);
    setCorrectGuesses([]);
  };

  const handleClickStartGame = () => {
    setClickedNums([]);
    setCorrectGuesses([]);

    const localRandomNums = [];

    let count = 1;
    while (count <= gridSize) {
      localRandomNums.push(Math.floor(Math.random() * numBoxes) + 1);
      count++;
    } // remove dupes in randomNums array

    setRandomNums(localRandomNums);
    setsquareState("blue");

    setTimeout(() => {
      setsquareState("clear");
    }, 1000);
  };

  const handleClickSquare = (e) => {
    if (randomNums.length) {
      setsquareState("redGreen");
      setClickedNums([...clickedNums, e.target.id]);
    }

    if (randomNums.includes(parseInt(e.target.id))) {
      setCorrectGuesses((correctGuesses) => [...correctGuesses, e.target.id]);
    }
  };

  useEffect(() => {
    if (correctGuesses.length && correctGuesses.length === randomNums.length) {
      alert("WINNER");
      setGameOver(true);
    }
  }, [correctGuesses]);

  const outputGrid = () => {
    for (let i = 1; i <= numBoxes; i++) {
      grid.push(
        <Squares
          handleClickSquare={handleClickSquare}
          squareId={i}
          squareState={squareState}
          randomNums={randomNums}
          clickedNums={clickedNums}
        />
      );
    }
    return grid;
  };

  return (
    <div className="game">
      <h1>Memory Game</h1>

      <Slider
        handleChangeSlider={handleChangeSlider}
        size="small"
        defaultValue={3}
        aria-label="Small"
        valueLabelDisplay="20"
      />
      <button onClick={handleClickStartGame} className="button">
        PLAY!
      </button>
      <div className="gameBoard">{outputGrid()}</div>
    </div>
  );
}

export default App;
