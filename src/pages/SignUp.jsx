import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import firebaseConfig from "../components/firebase/config";
import { AuthContext } from "../components/firebase/Auth";
import "../scss/components/loginpage.scss";
import { v4 as uuidv4 } from "uuid";
const SignUp = () => {
  function hideError() {
    setErrorMessage("");
  }
  const db = firebaseConfig.firestore();
  const [errorMessage, setErrorMessage] = useState("");
  const standardUsername = "user#" + uuidv4().slice(-5);
  const userCountDocRef = db.collection("stats").doc("totalUsers");
  const [usersCount, setUsersCount] = useState();

  userCountDocRef.get().then((doc) => {
    setUsersCount(doc.data().count);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;

    try {
      firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((cred) => {
          cred.user.updateProfile({
            displayName: standardUsername,
          });
          db.collection("stats")
            .doc("totalUsers")
            .update({
              count: usersCount + 1,
            });
          return db.collection("users").doc(cred.user.uid).set({
            email: email.value,
            role: "user",
            username: standardUsername,
          });
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setTimeout(hideError, 4500);
        });
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(hideError, 4500);
    }
  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/main" />;
  }
  return (
    <div className="login__body">
      <div className="container">
        <div className="left">
          <div className="header">
            <div className="error__message__text">{errorMessage}</div>

            <h2 className="animation a1">SignUp</h2>
            <h4 className="animation a2">Register by email and password</h4>
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
              <Link to="/login"> or Login</Link>
            </p>
            <button className=" animation a6" type="submit">
              SIGNUP
            </button>
          </form>
        </div>
        <div className="rightS">
          <div className="right__kostil"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
