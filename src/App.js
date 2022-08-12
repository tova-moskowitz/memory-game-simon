import "./App.css";
import Squares from "./components/Squares.js";
import Slider from "./components/Slider.js";
import { useState } from "react";

// keep count of wrong guesses
// keep count of right guesses
// keep count of total guesses
// when all are found, player wins and message text changes
// dedupe the randomNums array
// slider and css to resize the grid dynamically

// ie; 0 right out of 2 total with 0 mistakes.

function App() {
  const [squareState, setsquareState] = useState("clear");
  const [randomNums, setRandomNums] = useState([]);
  const [clickedNums, setClickedNums] = useState([]);
  const [gridSize, setGridSize] = useState(5); // number will be grabbed from the slider onClick play button. It starts at gridSize 5 as the default

  const numBoxes = gridSize * gridSize;
  const grid = [];

  const handleChange = (event) => {
    setGridSize(event.target.value);
  };

  const handleClickStartGame = () => {
    setClickedNums([]);
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
    }, 2000);
  };

  const handleClickSquare = (e) => {
    setClickedNums([...clickedNums, e.target.id]);

    if (randomNums.length) setsquareState("redGreen");
  };

  const outputGrid = () => {
    for (let i = 1; i <= numBoxes; i++) {
      grid.push(
        <Squares
          onClick={handleClickSquare}
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
      <button onClick={handleClickStartGame} className="button">
        PLAY!
      </button>
      <Slider
        onChange={handleChange}
        className="slider"
        size="small"
        defaultValue={3}
        aria-label="Small"
        valueLabelDisplay="20"
      />
      <div className="gameBoard">{outputGrid()}</div>
    </div>
  );
}

export default App;
