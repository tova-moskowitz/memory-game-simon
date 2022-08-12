import "../App.js";
import "../App.css";

function Squares(props) {
  const squareId = props.squareId;
  const randomNums = props.randomNums;
  const clickedNums = props.clickedNums;
  const gridState = props.gridState;
  let colorClass = "";

  randomNums.forEach((num) => {
    if (squareId === num)
      if (gridState === "clear") {
        colorClass = "clear";
      } else if (gridState === "blue") {
        colorClass = "blue";
      }
  });

  clickedNums.forEach((num) => {
    if (gridState === "redGreen" && randomNums.includes(parseInt(num))) {
      if (squareId === parseInt(num)) {
        colorClass = "green";
      }
    }

    if (gridState === "redGreen" && !randomNums.includes(parseInt(num))) {
      if (squareId === parseInt(num)) {
        colorClass = "red";
      }
    }
  });

  return (
    <div
      onClick={props.onClick}
      className={`gridBox ${colorClass}`}
      id={squareId}
    ></div>
  );
}

export default Squares;
