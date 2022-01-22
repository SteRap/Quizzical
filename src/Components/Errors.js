import React from "react";

function Errors(props) {
  const message = [
    "Please insert a valid Email!",
    "Your Password should be at least 8 characters long!",
    "Checking...",
    "You inserted wrong credentials. <br /> Please try again!",
    "Unable to register user. <br /> Please, fill all the input fields.",
  ];
  return (
    <div
      className="error_message"
      dangerouslySetInnerHTML={{
        __html: message[props.num],
      }}
    ></div>
  );
}
export default Errors;
