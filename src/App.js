import React from "react";
import Main from "./Main";
import Button from "./Button";
import SignIn from "./Signin";
import Register from "./Register";
import logo from "./logo3_app.png";
import Navigation from "./Navigation";
import Overlay from "./Overlay";

import { nanoid } from "nanoid";

function App() {
  const [newGame, setNewGame] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [buttonOn, setButtonOn] = React.useState(false);
  const [playedGames, setPlayedGames] = React.useState(0);
  const [rightAnswers, setRightAnswers] = React.useState(0);
  const [route, setRoute] = React.useState("signIn");
  const [user, setUser] = React.useState({});
  const [category, setCategory] = React.useState(9);

  const API = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=medium&type=multiple&encode=base64`;

  function loadUser(data) {
    setUser({
      id: data.id,
      username: data.username,
      email: data.email,
      games: data.games,
      rightAnswers: data.rightanswers,
      joined: data.joined,
    });
  }

  function onRouteChange(route) {
    if (route === "signIn") {
      setNewGame(false);
      setPlayedGames((prevState) => {
        return (prevState += 1);
      });
    }
    setRoute(route);
  }

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

  function changeCategory(event) {
    const { value } = event.target;
    setCategory(value);
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
      fetch("https://secure-fjord-90260.herokuapp.com/game", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, answer: rightAnswers }),
      })
        .then((response) => response.json())
        .then((data) =>
          setUser({
            ...user,
            games: data.games,
            rightAnswers: data.rightanswers,
          })
        );
      setPlayedGames((games) => (games += 1));
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
    fetch(API)
      .then((res) => res.json())
      .then((data) => setData(data.results));
  }, [playedGames, category]);

  return (
    <div>
      <Overlay user={user} answers={rightAnswers} />
      <Navigation
        route={route}
        routeChange={onRouteChange}
        user={user}
        changeCategory={changeCategory}
        category={category}
        newGame={newGame}
      />

      {route === "signIn" ? (
        <div>
          <SignIn loadUser={loadUser} routeChange={onRouteChange} />
        </div>
      ) : route === "register" ? (
        <div>
          <Register loadUser={loadUser} routeChange={onRouteChange} />
        </div>
      ) : newGame ? (
        <div>
          <div className="app mt5">
            <Main data={data} handleChange={changeHeld} />
            <Button
              handleChange={handleChange}
              data={data}
              buttonOn={buttonOn}
              answers={rightAnswers}
            />
          </div>
        </div>
      ) : (
        <div className="start mt6">
          <header className="start-header ">
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
      )}
    </div>
  );
}

export default App;
