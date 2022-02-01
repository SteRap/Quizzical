import React from "react";
import Confetti from "react-confetti";
import confetti from "../Media/confetti.png";

function Overlay(props) {
  const [confettiOn, setConfettiOn] = React.useState(false);
  const currentAvgScore = props.user.rightAnswers / props.user.games;
  let rightAnswers = props.answers;

  React.useEffect(() => {
    setConfettiOn(() => {
      if (
        rightAnswers > currentAvgScore ||
        (!currentAvgScore && rightAnswers > 0)
      ) {
        return true;
      } else {
        return false;
      }
    });
  }, [rightAnswers]);

  const styles = { display: confettiOn === true ? "flex" : "none" };

  return (
    <div
      onClick={() => {
        setConfettiOn(false);
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
