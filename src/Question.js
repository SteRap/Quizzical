import React from "react";
import "./Main.css";
import { Base64 } from "js-base64";

function Question(props) {
  return (
    <div>
      <h2 className="main-question" id={props.id}>
        {Base64.decode(props.question)}
      </h2>
    </div>
  );
}

export default Question;
