import "../App.js";
import "../App.css";

function Squares({
  squareId,
  randomNums,
  clickedNums,
  squareState,
  handleClickSquare,
}) {
  let colorClass = "";

  randomNums.forEach((num) => {
    if (squareId === num)
      if (squareState === "clear") {
        colorClass = "clear";
      } else if (squareState === "blue") {
        colorClass = "blue";
      }
  });

  clickedNums.forEach((num) => {
    if (squareId === parseInt(num)) {
      if (squareState === "redGreen" && randomNums.includes(parseInt(num))) {
        colorClass = "green";
      } else if (
        squareState === "redGreen" &&
        !randomNums.includes(parseInt(num))
      ) {
        colorClass = "red";
      }
    }
  });

  return (
    <div
      onClick={handleClickSquare}
      className={`gridSquare ${colorClass}`}
      id={squareId}
    ></div>
  );
}

export default Squares;
