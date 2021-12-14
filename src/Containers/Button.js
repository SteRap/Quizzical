import React from "react";

function Button(props) {
  React.useEffect(() => {
    allSelected();
  });

  function allSelected() {
    let count = 0;
    for (let i = 0; i < props.data.length; i++) {
      for (let j = 0; j < props.data[i].answer.length; j++) {
        if (props.data[i].answer[j].isHeld) {
          count++;
        }
      }
      if (count === 5) {
        return true;
      }
    }
  }

  const styles = {
    backgroundColor: !allSelected() ? "#A6A8B2" : "#6c86ff",
    color: !allSelected() ? "black" : "white",
    border: !allSelected() ? "1px solid #92949F" : "1px solid #1d45ff",
    cursor: !allSelected() ? "not-allowed" : "pointer",
  };

  return (
    <div className="button-component">
      {props.buttonOn && (
        <h3 className="button-result">
          You scored {props.answers}/5 right answers!
        </h3>
      )}
      <button
        className="button-button"
        onClick={props.handleChange}
        data={props.data}
        disabled={!allSelected() ? true : false}
        style={styles}
      >
        {!props.buttonOn ? "Check Answers" : "Start a New Game"}
      </button>
    </div>
  );
}
export default Button;
