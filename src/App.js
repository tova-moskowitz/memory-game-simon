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
// play button disappears when game is in progress

// ie; 0 right out of 2 total with 0 mistakes.

function App() {
  const [squareState, setsquareState] = useState("clear");
  const [randomNums, setRandomNums] = useState([]);
  const [clickedNums, setClickedNums] = useState([]);
  const [gridSize, setGridSize] = useState(5);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [message, setMessage] = useState("");

  const numBoxes = gridSize * gridSize;
  const grid = [];
  const messages = {
    memorize: "Memorize the highlighted cells",
    select: `Click the cells that were highlighted! x right out of ${gridSize} total with x mistakes.`,
    win: "You got all of the boxes with x mistake(s)!",
  };

  const handleChangeSlider = (event) => {
    setGameInProgress(false);
    setGridSize(event.target.value);
    setRandomNums([]);
    setClickedNums([]);
    setCorrectGuesses([]);
  };

  const handleClickStartGame = () => {
    setMessage(messages.memorize);
    setClickedNums([]);
    setCorrectGuesses([]);
    setGameInProgress(true);

    const localRandomNums = [];

    let count = 1;
    while (count <= gridSize) {
      localRandomNums.push(Math.floor(Math.random() * numBoxes) + 1);
      count++;
    } // remove dupes in randomNums array

    setRandomNums(localRandomNums);
    setsquareState("blue");

    setTimeout(() => {
      setMessage(messages.select);
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
      console.log("WINNER");
      setMessage(messages.win);
      setGameInProgress(false);
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
      {!gameInProgress && (
        <button onClick={handleClickStartGame} className="button">
          PLAY!
        </button>
      )}
      <div>{message}</div>
      <div className="gameBoard">{outputGrid()}</div>
    </div>
  );
}

export default App;
