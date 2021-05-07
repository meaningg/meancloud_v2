import React, { useContext, useRef, useState } from "react";
import "../scss/components/userSettings.scss";
import { AuthContext } from "./firebase/Auth";
import firebase from "firebase";
import demoUserLogo from "../source/img/menuBtns/admin.jpg";
import firebaseConfig from "./firebase/config";
import { roleContext } from "../components/contexts/Contexts";
function UserSettings() {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("Password");
  const [oldEmail, setOldEmail] = useState(null);
  const [oldPass, setOldPass] = useState(null);
  const [emailSuccess, setEmailSuccess] = useState("Email");
  const [errorMessage, setErrorMessage] = useState(null);
  const db = firebaseConfig.firestore();
  const { role } = useContext(roleContext);
  // test file Upload
  const storage = firebase.storage();
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  //
  const handleSubmitName = (e) => {
    e.preventDefault();
    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function (cred) {
        setName();
        return db.collection("users").doc(user.uid).update({
          username: name,
        });
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  const handleSubmitLogo = (e) => {
    e.preventDefault();
    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        photoURL: logoUrl,
      })
      .then(function () {
        setLogoUrl();
        return db.collection("users").doc(user.uid).update({
          logoUrl: logoUrl,
        });
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  const handleSubmitPass = (e) => {
    e.preventDefault();
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(oldEmail, oldPass)
      .then((user) => {
        firebaseConfig
          .auth()
          .currentUser.updatePassword(password)
          .then(() => {
            setPasswordSuccess("Success!");
          })
          .catch((error) => {});
      });
  };
  const handleSubmitEmail = (e) => {
    e.preventDefault();
    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(oldEmail, oldPass)
      .then((user) => {
        firebaseConfig
          .auth()
          .currentUser.updateEmail(email)
          .then(() => {
            setEmailSuccess("Success!");
            setEmail();
            return db.collection("users").doc(currentUser.uid).update({
              email: email,
            });
          })
          .catch((error) => {});
      });
  };

  // test file Upload
  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          e.preventDefault();
          setFile(null);
          var user = firebase.auth().currentUser;

          user
            .updateProfile({
              photoURL: url,
            })
            .then(function () {
              setLogoUrl();
              return db.collection("users").doc(user.uid).update({
                logoUrl: url,
              });
            })
            .catch(function (error) {
              // An error happened.
            });
        });
    });
  }
  //
  return (
    <div className="user__settings ">
      <div className="header noselect">User settings</div>
      <div className="current__settings">
        <div className="profile__title noselect">Profile </div>
        <div className="profile__info">
          <div className="profile__logo">
            <img
              src={
                currentUser.photoURL === null
                  ? demoUserLogo
                  : currentUser.photoURL
              }
              alt="PhotoUrl"
            />
          </div>
          <div className="profile__data">
            <div className="data ">
              <h5>Username:</h5>
              {currentUser.displayName}
              <hr />
            </div>
            <div className="data">
              <h5>Email:</h5>
              {currentUser.email}
              <hr />
            </div>
            <div className="data">
              <h5>Role:</h5>
              {role}
              <hr />
            </div>
            <div className="data">
              <h5>Unique ID:</h5>
              {currentUser.uid}
              <hr />
            </div>
          </div>
        </div>
      </div>

      <div className="body noselect">
        <div className="change__logoandname">
          <div className="change__profile">
            <div className="title">Username</div>
            <div className="card__body">
              <form>
                <input
                  onChange={(e) => setName(e.target.value)}
                  placeholder={currentUser.displayName}
                ></input>
                <button onClick={handleSubmitName} type="submit">
                  Update
                </button>
              </form>
            </div>
          </div>

          <div className="change__profile ">
            <div className="title">Logo file</div>
            <div className="card__body">
              <form className="image__form" onSubmit={handleUpload}>
                <label className="input__label">
                  <input
                    className="image__upload"
                    onChange={handleChange}
                    type="file"
                  />
                  {file === null ? "Upload image" : file.name}
                </label>
                <button disabled={!file} type="submit">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="change__profile">
          <div className="title">{emailSuccess}</div>
          <div className="card__body">
            <form>
              <input
                type="email"
                name="email"
                cols="24"
                onChange={(e) => setOldEmail(e.target.value)}
                rows="1"
                placeholder="Old email"
              ></input>
              <input
                type="email"
                name="email"
                cols="24"
                onChange={(e) => setEmail(e.target.value)}
                rows="1"
                placeholder="New email"
              ></input>
              <input
                placeholder="password"
                type="password"
                name="password"
                cols="24"
                rows="1"
                onChange={(e) => setOldPass(e.target.value)}
              ></input>
              <button onClick={handleSubmitEmail} type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
        <div className="change__profile">
          <div className="title">{passwordSuccess}</div>
          <div className="card__body">
            <form>
              <input
                type="email"
                name="email"
                cols="24"
                onChange={(e) => setOldEmail(e.target.value)}
                rows="1"
                placeholder="Email"
              ></input>
              <input
                type="password"
                name="password"
                cols="24"
                onChange={(e) => setOldPass(e.target.value)}
                rows="1"
                placeholder="Old password"
              ></input>
              <input
                type="password"
                name="password"
                cols="24"
                onChange={(e) => setPassword(e.target.value)}
                rows="1"
                placeholder="New password"
              ></input>
              <button onClick={handleSubmitPass} type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
