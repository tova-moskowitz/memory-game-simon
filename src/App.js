import "./App.css";
import Squares from "./components/Squares.js";
import { useState } from "react";

// (what is the ratio of tiles that light up to total number of tiles?)
// keep count of wrong guesses
// keep count of right guesses
// keep count of total guesses
// when all are found, use wins

// width of grid needs to be dynamic based on difficulty level
// ie; 0 right out of 2 total with 0 mistakes.

// 3 states: clear, blue, red/green

function App() {
  const [gridState, setGridState] = useState("clear");
  const [randomNums, setRandomNums] = useState([]);
  const [clickedNums, setClickedNums] = useState([]);

  console.log(gridState);
  // console.log(randomNums);
  // console.log(clickedNums);
  const difficulty = 3; // should be a piece of state, grabbed from the slider onClick play button
  const numBoxes = difficulty * difficulty;
  const grid = [];

  const handleClickStartGame = () => {
    setClickedNums([]);
    const localRandomNums = [];

    let count = 1;
    while (count <= difficulty) {
      localRandomNums.push(Math.floor(Math.random() * numBoxes) + 1);
      count++;
    } // remove dupes in randomNums array

    setRandomNums(localRandomNums);
    setGridState("blue");

    setTimeout(() => {
      setGridState("clear");
    }, 3000);
  };

  const handleClickSquare = (e) => {
    setClickedNums([...clickedNums, e.target.id]);

    if (randomNums.length) setGridState("redGreen");
  };

  const outputGrid = () => {
    for (let i = 1; i <= numBoxes; i++) {
      grid.push(
        <Squares
          onClick={handleClickSquare}
          squareId={i}
          gridState={gridState}
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
      <div className="gameBoard">{outputGrid()}</div>
    </div>
  );
}

export default App;
