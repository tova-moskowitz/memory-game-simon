import "./App.css";
import Squares from "./components/Squares";
import Slider from "./components/Slider.js";
import { useState, useEffect } from "react";

// keep count of wrong guesses
// keep count of right guesses
// dedupe the randomNums array
// slider doesn't stay with other elements on page on resizing
// double-click on green shouldn't push into array --------
// double-click on red shouldn't increment mistakesCount
// modal- make css responsive
// ie; 0 right out of 2 total with 0 mistakes.
// refactor so that there's very little logic in Squares.js
// refactor so that I'm not using colors as class names
// hint mode
// a11y mode
// mistakes count lags behind one click
// shouldn't count mistakes before start is clicked
// shouldn't count mistakes if already counted that click as a mistake once

function App() {
  const [squareState, setSquareState] = useState("clear");
  const [randomNums, setRandomNums] = useState([]);
  const [clickedNums, setClickedNums] = useState([]);
  const [gridSize, setGridSize] = useState(4);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [message, setMessage] = useState("");
  const [mistakesCount, setMistakesCount] = useState(0);
  const [hints, setHints] = useState([]);

  const numBoxes = gridSize * gridSize;
  const messages = {
    memorize:
      "Memorize the highlighted cells then click the cells that were highlighted!",
    select: `${correctGuesses.length} right out of ${gridSize} total with ${mistakesCount} mistakes.`,
    win: `Congratulations! You got all the boxes with ${mistakesCount} mistake(s)!`,
  };

  const handleChangeSlider = (event) => {
    setGameInProgress(false);
    setGridSize(event.target.value);
    setRandomNums([]);
    setClickedNums([]);
    setHints([]);
    // setCorrectGuesses([]);
  };

  const handleClickStartGame = () => {
    setMessage(messages.memorize);
    setClickedNums([]);
    setGameInProgress(true);
    setMistakesCount(0);
    setHints([]);

    const localRandomNums = [];

    let count = 1;
    while (count <= gridSize) {
      localRandomNums.push(Math.floor(Math.random() * numBoxes) + 1);
      count++;
    } // remove dupes in randomNums array

    setRandomNums(localRandomNums);
    setSquareState("blue");

    setTimeout(() => {
      setSquareState("clear");
    }, 1000);
    setCorrectGuesses([]);
  };

  const handleClickSquare = (e) => {
    setMessage(messages.select);
    if (randomNums.length && gameInProgress) {
      setSquareState("redGreen");
      setClickedNums([...clickedNums, e.target.id]);
    }

    if (
      randomNums.includes(parseInt(e.target.id)) &&
      !correctGuesses.includes(e.target.id)
    ) {
      setCorrectGuesses((correctGuesses) => [...correctGuesses, e.target.id]);
    } else {
      setMistakesCount((mistakesCount) => mistakesCount + 1);
    }
  };

  useEffect(() => {
    if (correctGuesses.length && correctGuesses.length === randomNums.length) {
      setMessage(messages.win);
      setGameInProgress(false);
    }
  }, [correctGuesses]);

  const outputGrid = () => {
    const grid = [];
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

  const handleClickHintButton = (e) => {
    const hint = randomNums[Math.floor(Math.random() * randomNums.length)];
    if (!hints.includes(hint)) {
      setHints([...hints, hint]);
    }
    setSquareState("hint");

    setTimeout(() => {
      setSquareState("clear");
    }, 1000);
    setCorrectGuesses([]);
    console.log(hints);
  };

  const outputWinnerModal = () => {
    return (
      <>
        <div className="modal">
          <div className="youWin">
            You won!
            <p className="modalWinMessage">{messages.win}</p>
            <button onClick={handleClickStartGame} className="modalButton">
              Play Again?
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="game">
      <h1>Memory Game</h1>

      <Slider
        handleChangeSlider={handleChangeSlider}
        size="small"
        defaultValue={4}
        aria-label="Small"
        valueLabelDisplay="20"
      />
      {!gameInProgress && (
        <button onClick={handleClickStartGame} className="button">
          PLAY!
        </button>
      )}
      <div className="message">{message}</div>
      {gameInProgress && (
        <button onClick={handleClickHintButton} className="getHint">
          Need a hint?
        </button>
      )}
      <div
        className="gameBoard"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {!gameInProgress &&
        randomNums.length &&
        correctGuesses.length === randomNums.length
          ? outputWinnerModal()
          : null}
        {outputGrid()}
      </div>
    </div>
  );
}

export default App;
