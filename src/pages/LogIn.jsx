import React, { useContext, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "../components/firebase/Auth";
import firebaseConfig from "../components/firebase/config";
import "../scss/components/loginpage.scss";

const LogIn = () => {
  function hideError() {
    setErrorMessage("");
  }
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      firebaseConfig
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .catch((error) => {
          setErrorMessage(error.message);
          setTimeout(hideError, 4500);
        });
    } catch (error) {}
  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div className="login__body">
      <div className="container">
        <div className="left">
          <div className="header">
            <div className="error__message__text">{errorMessage}</div>

            <h2 className="animation a1">Login</h2>
            <h4 className="animation a2">Login by email and password</h4>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="email"
              name="email"
              className="form-field animation a3"
              placeholder="Email"
              autocomplete="off"
            />

            <input
              type="password"
              name="password"
              className="form-field animation a4"
              placeholder="Password"
            />
            <p className="animation a5">
              <Link to="/signup"> or SigUp</Link>
            </p>
            <button className=" animation a6" type="submit">
              LOGIN
            </button>
          </form>
        </div>
        <div className="rightL">
          <div className="right__kostil"></div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
