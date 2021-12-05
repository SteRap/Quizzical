import React from "react";

function SignIn(props) {
  const [signInEmail, setSignInEmail] = React.useState("");
  const [signInPassword, setSignInPassword] = React.useState("");
  const [wrongCredentials, setWrongCredentials] = React.useState(false);

  function onEmailChange(event) {
    setSignInEmail(event.target.value);
  }

  function onPasswordChange(event) {
    setSignInPassword(event.target.value);
  }

  function onSubmitSignin() {
    fetch("https://secure-fjord-90260.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          props.loadUser(user);
          props.routeChange("home");
        } else if (!user.id) {
          setWrongCredentials(true);
        }
      });
  }

  function onEnterSubmitSignin(event) {
    if (event.keyCode === 13) {
      onSubmitSignin();
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
        onKeyDown={onEnterSubmitSignin}
      >
        <main
          className="pa4"
          action="sign-up_submit"
          method="get"
          acceptCharset="utf-8"
        >
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className=" center f2 ph0 mh0 fw6">Sign In</legend>
            <div>
              <label className="db fw4 lh-copy f5 mt3" htmlFor="email-address">
                Email address
              </label>
              <input
                className="pa2 input-reset ba bg-transparent w-100 measure br2"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
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
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="flex justify-between items-center mt3">
            <input
              className="b ph3 pv2 input-reset ba b--black grow pointer f5 br2 form-button"
              type="submit"
              value="Sign In"
              onClick={onSubmitSignin}
            />
            <p
              onClick={() => props.routeChange("register")}
              className="f6 lh-copy link dim black db pointer"
            >
              Register
            </p>
          </div>
          {wrongCredentials && (
            <div className="signin-credentials">
              You inserted wrong credentials. <br /> Please try again!
            </div>
          )}
        </main>
      </article>
    </div>
  );
}
export default SignIn;
