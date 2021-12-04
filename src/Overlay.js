import React from "react";
import Confetti from "react-confetti";
import confetti from "./confetti.png";

function Overlay(props) {
  const [disabledOn, setDisabledOn] = React.useState(false);
  const currentAvgScore = props.user.rightAnswers / props.user.games;
  let rightAnswers = props.answers;

  React.useEffect(() => {
    setDisabledOn(() => {
      if (rightAnswers > currentAvgScore) {
        return true;
      } else {
        return false;
      }
    });
  }, [rightAnswers]);

  const styles = { display: disabledOn === true ? "flex" : "none" };

  return (
    <div
      onClick={() => {
        setDisabledOn(false);
      }}
      style={styles}
      id="overlay"
    >
      <Confetti />
      <div id="text">
        Congratulation, you improved your score!!!
        <img className="image-confetti" src={confetti} alt="confetti" />
      </div>
    </div>
  );
}

export default Overlay;
