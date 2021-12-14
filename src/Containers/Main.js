import React from "react";
import Question from "../Components/Question";
import Answer from "./Answer";

function Main(props) {
  const pairQuestionsAnswers = props.data.map((obj, index) => (
    <div className="main" key={index}>
      <Question
        question={obj.question.question}
        key={obj.question.id}
        id={obj.question.id}
      />
      <Answer handleChange={props.handleChange} data={obj.answer} />
      <hr />
    </div>
  ));

  return <div>{pairQuestionsAnswers}</div>;
}

export default Main;
