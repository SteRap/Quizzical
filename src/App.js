import React from "react";
import Main from "./Containers/Main";
import Button from "./Containers/Button";
import SignIn from "./Components/Signin";
import Register from "./Components/Register";
import logo from "./Media/logo_app.png";
import Navigation from "./Containers/Navigation";
import Overlay from "./Components/Overlay";

import { nanoid } from "nanoid"; // set unique keys

function App() {
  const [newGame, setNewGame] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [buttonCheck, setButtonCheck] = React.useState(false);
  const [playedGames, setPlayedGames] = React.useState(0);
  const [rightAnswers, setRightAnswers] = React.useState(0);
  const [route, setRoute] = React.useState("signIn");
  const [user, setUser] = React.useState({});
  const [category, setCategory] = React.useState(9);

  // Trivia API, that can be called for different categories
  const API = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=medium&type=multiple&encode=base64`;

  // set the Player info from the DB
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

  // change page for Signin
  function onRouteChange(route) {
    if (route === "signIn") {
      setNewGame(false);
      setPlayedGames((prevState) => {
        return (prevState += 1);
      });
    }
    setRoute(route);
  }

  // start a new game
  function start() {
    setNewGame(() => true);
    setData(generateAPI());
  }

  // tilt the API to retrive informations that we need
  function generateAPI() {
    const updatedAPI = [];
    for (let i = 0; i < data.length; i++) {
      updatedAPI.push({
        question: {
          question: data[i].question,
          id: nanoid(),
        },
        answer: [
          {
            answer: data[i].incorrect_answers[0],
            id: nanoid(),
            isSelected: false,
            isTrue: false,
            isWrong: false,
            checked: false,
          },
          {
            answer: data[i].incorrect_answers[1],
            id: nanoid(),
            isSelected: false,
            isTrue: false,
            isWrong: false,
            checked: false,
          },
          {
            answer: data[i].incorrect_answers[2],
            id: nanoid(),
            isSelected: false,
            isTrue: false,
            isWrong: false,
            checked: false,
          },
          {
            answer: data[i].correct_answer,
            id: nanoid(),
            isSelected: false,
            isTrue: true,
            isWrong: false,
            checked: false,
          },
        ],
      });
    }
    return updatedAPI;
  }

  // change Category for questions
  function changeCategory(event) {
    const { value } = event.target;
    setCategory(value);
  }

  // Function to make sure only one answer per group can be selected
  function changeSelection(id) {
    if (buttonCheck === false) {
      setData((data) => {
        const updatedData = [];
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
                isSelected: !currentAnswer.isSelected,
              });
              // Diselected the others in the same group, but don't touch the answers in the other groups
            } else if (
              currentAnswer.id !== id &&
              currentGroup.filter((answers) => answers.id === id).length > 0
            ) {
              answer.push({ ...currentAnswer, isSelected: false });
            } else {
              answer.push(currentAnswer);
            }
          }
          updatedData.push(checkedData);
        }
        return updatedData;
      });
    }
  }

  //the same button check for right answers and after checking, it starts a new game
  function endStartGame() {
    checkRightAnswers();
    setButtonCheck((prevState) => !prevState);
    // check right answers pairing API info with answers Selected
    if (buttonCheck === false) {
      setData((data) => {
        let updatedData = [];
        for (let i = 0; i < data.length; i++) {
          const currentGroup = data[i].answer;
          const answers = [];
          const checkedData = { question: data[i].question, answer: answers };
          for (let j = 0; j < currentGroup.length; j++) {
            const currentAnswer = currentGroup[j];
            if (currentAnswer.isTrue) {
              answers.push({
                ...currentAnswer,
                checked: !currentAnswer.checked,
              });
              // if not True check if it was select (=wrong)
            } else {
              if (currentAnswer.isSelected) {
                answers.push({
                  ...currentAnswer,
                  isWrong: true,
                });
              } else {
                answers.push(currentAnswer);
              }
            }
          }
          updatedData.push(checkedData);
        }
        return updatedData;
      });
      // when answers are checked, the button start a new game an update users'stats
    } else if (buttonCheck) {
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
      // dependency array for fetch API (use.Effect)
      setPlayedGames((games) => (games += 1));
      // reset the answers for a new Game
      setRightAnswers(0);
    }
  }

  // count how many answers are right
  function checkRightAnswers() {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].answer.length; j++) {
        if (data[i].answer[j].isTrue && data[i].answer[j].isSelected) {
          setRightAnswers((answers) => (answers += 1));
        }
      }
    }
  }

  // Fetch API and set the Data everytime a new game start or category is changed
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
      {/* display pages accordingly to the route */}
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
          <div className="app">
            <Main data={data} handleSelection={changeSelection} />
            <Button
              endStartGame={endStartGame}
              data={data}
              buttonCheck={buttonCheck}
              answers={rightAnswers}
            />
          </div>
        </div>
      ) : (
        <div className="start mt6">
          <header className="start-header ">
            <img src={logo} className="start-logo" alt="logo" />
            <button onClick={start} className="start-button">
              Start quiz
            </button>
          </header>
        </div>
      )}
    </div>
  );
}

export default App;
