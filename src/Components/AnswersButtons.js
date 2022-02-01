import React from "react";
import { Base64 } from "js-base64";

function AnswersButtons(props) {
  const styles = {
    backgroundColor:
      (props.checked && !props.isSelected && "#D1D6D8") ||
      (props.checked && "rgba(87, 255, 144, 0.8)") ||
      (props.isWrong && "rgba(255, 113, 87, 0.6)") ||
      (props.isSelected && "rgba(93, 215, 255, 0.6)"),
    border:
      (props.checked && !props.isSelected && "1px solid #00FF56") ||
      (props.checked && "1px solid #00FF56") ||
      (props.isWrong && "1px solid #FF2800") ||
      (props.isSelected ? "1px solid transparent" : "1px solid #09C2FF"),
    boxShadow: props.isSelected ? "none" : "0px 3px 2px rgba(0, 0, 0, 0.2)",
  };

  return (
    <button
      className="main-button"
      style={styles}
      onClick={() => props.handleSelection(props.id)}
    >
      {Base64.decode(props.answer)}
    </button>
  );
}

export default AnswersButtons;
