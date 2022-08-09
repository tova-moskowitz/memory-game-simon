import "./App.css";
import { useState, useEffect } from "react";

// (what is the ratio of tiles that light up to total number of tiles?)
// when play button is clicked, light up (change background to blue) all tiles corresponding to the y numbers that were randomly selected by Math.floor()
// a click handler should be attached to each div/box
// upon clicking a box, check if the tile's number corresponds to any of the numbers that were selected randomly
// if yes, change background to green
// if no, change background to red
// keep count of wrong guesses
// width of grid needs to be dynamic based on difficulty level
//
function App() {
  const [randomNums, setRandomNums] = useState([]);
  const [showColoredSquares, setShowColoredSquares] = useState(false);
  console.log(showColoredSquares);
  console.log(randomNums);
  const difficulty = 2; // should also be a piece of state too, grabbed from the slider
  const numBoxes = difficulty * difficulty;
  const grid = [];

  const handleClickStartGame = () => {
    const localRandomNums = [];
    let count = 1;
    while (count <= difficulty) {
      localRandomNums.push(Math.floor(Math.random() * numBoxes) + 1);
      count++;
    }

    setRandomNums(localRandomNums);
    setShowColoredSquares(true);

    setTimeout(() => {
      setShowColoredSquares(false);
    }, 3000);
  };

  const outputGrid = () => {
    let colorClass = "";

    for (let i = 1; i <= numBoxes; i++) {
      randomNums.forEach((randomNum) => {
        if (showColoredSquares && randomNum === i) {
          colorClass = " blue";
        } else {
          colorClass = "";
        }
      });
      grid.push(
        <div className={`gridBox${colorClass}`} id={i}>
          {i}
        </div>
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
