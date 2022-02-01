import React from "react";
import AnswersButtons from "../Components/AnswersButtons";

function Answer(props) {
  const answersArray = [];
  const [answer, setAnswer] = React.useState(answersArray);

  React.useEffect(() => {
    setAnswer(props.data);
  }, [props.data]);

  React.useEffect(() => {
    shuffle(props.data);
    createAnswersArray();
  }, []);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function createAnswersArray() {
    answersArray.push(
      props.data[0],
      props.data[1],
      props.data[2],
      props.data[3]
    );
    return answersArray;
  }

  const answersButtons = answer.map((option) => (
    <AnswersButtons
      answer={option.answer}
      key={option.id}
      isSelected={option.isSelected}
      id={option.id}
      checked={option.checked}
      handleSelection={props.handleSelection}
      isWrong={option.isWrong}
    />
  ));

  return <div className="main-answers">{answersButtons}</div>;
}

export default Answer;
