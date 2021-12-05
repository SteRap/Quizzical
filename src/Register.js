import React from "react";

function Register(props) {
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");
  const [registerUsername, setRegisterUsername] = React.useState("");
  const [registrationOff, setRegistrationOff] = React.useState(false);

  function onSetEmail(event) {
    setRegisterEmail(event.target.value);
  }

  function onSetPassword(event) {
    setRegisterPassword(event.target.value);
  }

  function onSetUsername(event) {
    setRegisterUsername(event.target.value);
  }

  function onSubmitRegister() {
    fetch("https://secure-fjord-90260.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          props.loadUser(user);
          props.routeChange("home");
        } else if (!user.id) {
          setRegistrationOff(true);
        }
      });
  }
  function onEnterSubmitRegister(event) {
    if (event.keyCode === 13) {
      onSubmitRegister();
    }
  }
  return (
    <div>
      <div className="tc">
        <h3 className="title-h3">Let's play</h3>
        <h1 className="title-h1">Quizzical</h1>
      </div>
      <article
        className="br3 ba b--black-20 w-90 w-50-m w-25-l mw6 mh3 center form"
        onKeyDown={onEnterSubmitRegister}
      >
        <main
          className="pa4"
          action="sign-up_submit"
          method="get"
          acceptCharset="utf-8"
        >
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="center f2 ph0 mh0 fw6">Register</legend>
            <div>
              <label className="db fw4 lh-copy f5 mt3" htmlFor="username">
                Username
              </label>
              <input
                className="pa2 input-reset ba bg-transparent w-100 measure br2"
                type="text"
                name="username"
                id="username"
                onChange={onSetUsername}
              />
            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f5" htmlFor="email-address">
                Email address
              </label>
              <input
                className="pa2 input-reset ba bg-transparent w-100 measure br2"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onSetEmail}
              />
            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f5" htmlFor="password">
                Password
              </label>
              <input
                className="pa2 input-reset ba bg-transparent w-100 measure br2"
                type="password"
                name="password"
                id="password"
                onChange={onSetPassword}
              />
            </div>
          </fieldset>
          <div className="flex justify-between items-center mt2">
            <input
              className="b ph3 pv2 input-reset ba b--black grow pointer f5 br2 form-button"
              type="submit"
              value="Register"
              onClick={onSubmitRegister}
            />
            <p
              onClick={() => props.routeChange("signIn")}
              className=" lh-copy f6 link dim black db pointer"
            >
              Sign In
            </p>
          </div>
          {registrationOff && (
            <div className="registration-Off">
              Unable to register user. <br /> Please, fill all the input fields.
            </div>
          )}
        </main>
      </article>
    </div>
  );
}
export default Register;
