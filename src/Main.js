import React from "react";
import Question from "./Question";
import Answer from "./Answer";
import "./Main.css";

function Main(props) {
  const pairQuestionsAnswers = props.data.map((obj, index) => (
    <div className="main" key={index}>
      <Question
        question={obj.question.question}
        key={obj.question.id}
        id={obj.question.id}
      />
      <Answer
        handleChange={props.handleChange}
        data={obj.answer}
        // right={obj.answer[3]}
      />
      <hr />
    </div>
  ));

  // const pairQuestionsAnswers = (componentWillMount = () => {
  //   props.data.map((obj, index) => (
  //     <div className="main" key={index}>
  //       <Question
  //         question={obj.question.question}
  //         key={obj.question.id}
  //         id={obj.question.id}
  //       />
  //       <Answer data={obj.answer} right={obj.answer[3]} />
  //       <hr />
  //     </div>
  //   ));
  // });

  return <div>{pairQuestionsAnswers}</div>;
}

export default Main;
