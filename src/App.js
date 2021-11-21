import React from "react";
import Main from "./Main";
import Button from "./Button";
import logo from "./logo_app.png";
import "./App.css";
import { nanoid } from "nanoid";

function App() {
  const [newGame, setNewGame] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [buttonOn, setButtonOn] = React.useState(false);
  const [loadedGames, setLoadedGames] = React.useState(0);
  const [rightAnswers, setRightAnswers] = React.useState(0);

  function start() {
    setNewGame(() => true);
    setData(generateAPI());
  }

  function generateAPI() {
    const newArray = [];
    for (let i = 0; i < data.length; i++) {
      newArray.push({
        question: {
          question: data[i].question,
          id: nanoid(),
        },
        answer: [
          {
            answer: data[i].incorrect_answers[0],
            id: nanoid(),
            isHeld: false,
            isTrue: false,
            isWrong: false,
            checked: false,
          },
          {
            answer: data[i].incorrect_answers[1],
            id: nanoid(),
            isHeld: false,
            isTrue: false,
            isWrong: false,
            checked: false,
          },
          {
            answer: data[i].incorrect_answers[2],
            id: nanoid(),
            isHeld: false,
            isTrue: false,
            isWrong: false,
            checked: false,
          },
          {
            answer: data[i].correct_answer,
            id: nanoid(),
            isHeld: false,
            isTrue: true,
            isWrong: false,
            checked: false,
          },
        ],
      });
    }
    return newArray;
  }

  function changeHeld(id) {
    if (buttonOn === false) {
      setData((data) => {
        const updatedAnswer = [];
        for (let i = 0; i < data.length; i++) {
          const currentGroup = data[i].answer;
          const answer = [];
          const checkedData = {
            question: data[i].question,
            answer: answer,
          };
          for (let j = 0; j < currentGroup.length; j++) {
            const currentAnswer = currentGroup[j];
            if (currentAnswer.id === id) {
              answer.push({
                ...currentAnswer,
                isHeld: !currentAnswer.isHeld,
              });
            } else if (
              currentAnswer.id !== id &&
              currentGroup.filter((answers) => answers.id === id).length > 0
            ) {
              answer.push({ ...currentAnswer, isHeld: false });
            } else {
              answer.push(currentAnswer);
            }
          }
          updatedAnswer.push(checkedData);
        }
        return updatedAnswer;
      });
    }
  }

  //! this one gives a correct updated data array
  // function handleChange() {
  //   let updatedAnswer = [];
  //   for (let i = 0; i < data.length; i++) {
  //     const answers = [];
  //     const checkedData = { question: data[i].question, answer: answers };
  //     for (let j = 0; j < data[i].answer.length; j++) {
  //       if (data[i].answer[j].isTrue) {
  //         answers.push({
  //           ...data[i].answer[j],
  //           checked: !data[i].answer[j].checked,
  //         });
  //       } else {
  //         answers.push(data[i].answer[j]);
  //       }
  //     }
  //     updatedAnswer.push(checkedData);
  //   }
  //   console.log("updated", updatedAnswer);
  // }

  function handleChange() {
    checkRightAnswers();
    setButtonOn((prevState) => !prevState);
    if (buttonOn === false) {
      setData((data) => {
        let updatedAnswer = [];
        for (let i = 0; i < data.length; i++) {
          const answers = [];
          const checkedData = { question: data[i].question, answer: answers };
          for (let j = 0; j < data[i].answer.length; j++) {
            if (data[i].answer[j].isTrue) {
              answers.push({
                ...data[i].answer[j],
                checked: !data[i].answer[j].checked,
              });
            } else {
              if (data[i].answer[j].isHeld) {
                answers.push({
                  ...data[i].answer[j],
                  isWrong: true,
                });
              } else {
                answers.push(data[i].answer[j]);
              }
            }
          }
          updatedAnswer.push(checkedData);
        }
        return updatedAnswer;
      });
    } else if (buttonOn) {
      setNewGame((game) => !game);
      setLoadedGames((games) => (games += 1));
      setRightAnswers(0);
    }
  }

  function checkRightAnswers() {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].answer.length; j++) {
        if (data[i].answer[j].isTrue && data[i].answer[j].isHeld) {
          setRightAnswers((answers) => (answers += 1));
        }
      }
    }
  }

  React.useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple&encode=base64"
    )
      .then((res) => res.json())
      .then((data) => setData(data.results));
  }, [loadedGames]);

  // console.log("dataact", data);

  return newGame ? (
    <div className="app">
      <Main data={data} handleChange={changeHeld} />
      <Button
        handleChange={handleChange}
        data={data}
        buttonOn={buttonOn}
        answers={rightAnswers}
      />
    </div>
  ) : (
    <div className="start">
      <header className="start-header">
        <img src={logo} className="start-logo" alt="logo" />
        <button
          onClick={start}
          className="start-button"
          href="https://reactjs.org"
        >
          Start quiz
        </button>
      </header>
    </div>
  );
}

export default App;
