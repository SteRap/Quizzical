import React from "react";
import Category from "../Components/Category";
import logo from "../Media/logo_app_bcg.png";
import logoGames from "../Media/logo_games.png";
import logoScore from "../Media/logo_score.png";
import "../index.scss";

function Navigation(props) {
  let avgScore = props.user.rightAnswers / props.user.games;
  let roundedAvgScore = Math.round((avgScore > 0 ? avgScore : 0) * 100) / 100;
  const date = new Date(props.user.joined);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const capitalUser = function capitalize() {
    if (props.user.username !== undefined) {
      return props.user.username.replace(/^\w/, (c) => c.toUpperCase());
    } else {
      return "not available user";
    }
  };

  const signIn = (
    <div
      className="w-100
    flex justify-between bb items-center shadow-4 b--light-gray z-1 pr2 nav "
    >
      <img className="nav-logo" src={logo} alt="small logo" />
      <div
        className="mh1 f4 pointer dim"
        onClick={() => props.routeChange("register")}
      >
        Register
      </div>
    </div>
  );

  const register = (
    <div
      className="w-100
    flex justify-between bb items-center shadow-4 b--light-gray z-1 pr2 nav"
    >
      <img className="nav-logo" src={logo} alt="small logo" />
      <div
        className="mh1 f4 dim pointer"
        onClick={() => props.routeChange("signIn")}
      >
        Sign In
      </div>
    </div>
  );

  const home = (
    <div
      className="w-100
    flex justify-between bb items-center shadow-4 b--light-gray z-1  nav"
    >
      <img className="nav-logo" src={logo} alt="small logo" />
      <div className="mh2 ">
        <Category
          changeCategory={props.changeCategory}
          category={props.category}
          newGame={props.newGame}
        />
      </div>
      <div className="mh1 flex items-center">
        <span className="span-text">Played games:</span>
        <span className="b ml1 span-score">{props.user.games}</span>
        <div className="tooltip">
          <img src={logoGames} className="logo-score" alt="logo game" />
          <span className="tooltiptext">
            You played {props.user.games} games. Keep going!
          </span>
        </div>
      </div>
      <div className="mh1 flex items-center">
        <span className="span-text">Average score:</span>{" "}
        <span className="b ml1 span-score ">{roundedAvgScore}/5</span>
        <div className="tooltip">
          <img src={logoScore} className="logo-score " alt="logo score" />
          <span className="tooltiptext">
            On average you get {roundedAvgScore} right answers out of 5. You can
            do better!
          </span>
        </div>
      </div>
      <div className="tooltip">
        <div className="i b br-100 ba tc grow bw1 user-none ">
          {`${props.user.username}`
            .charAt(0)
            .toUpperCase()
            .concat(`${props.user.username}`.charAt(1).toUpperCase())}
        </div>
        <span className="tooltiptext">
          {capitalUser()} you joined Quizzcal on the {day}/{month}/{year}
        </span>
      </div>
      <div
        className="mh2 pointer hover-dark-red signOut-box"
        onClick={() => props.routeChange("signIn")}
      >
        Sign Out
      </div>
    </div>
  );

  return (
    <nav id="navigation">
      <div>
        {props.route === "signIn"
          ? signIn
          : props.route === "register"
          ? register
          : home}
      </div>
    </nav>
  );
}

export default Navigation;
