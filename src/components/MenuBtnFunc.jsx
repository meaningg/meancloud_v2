import React, { useState, useEffect, useContext } from "react";
import Fade from "react-reveal/Fade";
import "../scss/components/utils.scss";
import firebaseConfig from "../components/firebase/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { MenuPosContext } from "../components/contexts/Contexts";
import { AuthContext } from "./firebase/Auth";
import demoUserLogo from "../source/img/menuBtns/admin.jpg";
import { roleContext } from "./contexts/Contexts";
function MenuBtnFunc() {
  const [show, setShow] = useState(false);
  const { menuPos, setMenuPos } = useContext(MenuPosContext);
  const { currentUser } = useContext(AuthContext);
  const [admins, setAdmins] = useState([]);
  const { role } = useContext(roleContext);
  useEffect(() => {
    document.addEventListener("click", onClickOuterMenu, false);

    // returned function will be called on component unmount
    return () => {
      document.removeEventListener("click", onClickOuterMenu, false);
    };
  }, []);

  useEffect(() => {
    const db = firebaseConfig.firestore();
    return db.collection("admins").onSnapshot((snapshot) => {
      const adminsData = [];
      snapshot.forEach((doc) => adminsData.push({ ...doc.data(), id: doc.id }));
      setAdmins(adminsData);
    });
  }, []);

  const handleClick = () => {
    setShow(!show);
  };

  const listAdmins = admins.map((admin) => admin.uid);

  const onClickOuterMenu = (e) => {
    const menuBlock = document.getElementsByClassName("side__sheet")[0];
    if (!e.path.includes(menuBlock)) {
      const sideBlockBtn = document.querySelector(".menu__btn");
      if (!e.path.includes(sideBlockBtn)) {
        setShow(false);
      }
    }
  };

  return (
    <>
      <div className="menu__btn">
        <button
          className="open__SideBlock__BTN"
          type="button"
          onClick={handleClick}
        >
          <FontAwesomeIcon className="btn__icon" icon={faBars} />
        </button>
      </div>
      <div className="side__sheet__body">
        <Fade exit mountOnEnter unmountOnExit when={show} duration={200}>
          <div className="side__sheet">
            <div className="menu__title">
              <div className="user__logo">
                <img
                  src={
                    currentUser.photoURL === null
                      ? demoUserLogo
                      : currentUser.photoURL
                  }
                  alt=""
                />
              </div>
              <div className="user__name">{currentUser.displayName}</div>
            </div>
            <div className="menu__list__body">
              {role === "admin" ? (
                <button
                  className={
                    menuPos === "Admin" ? "btn__admin active" : "btn__admin"
                  }
                  onClick={() => setMenuPos("Admin")}
                >
                  Admin panel
                </button>
              ) : (
                ""
              )}
              <button
                onClick={() => setMenuPos("Home")}
                className={menuPos === "Home" ? "btn1 active" : "btn1"}
              >
                Home
              </button>
              <button
                onClick={() => setMenuPos("Music")}
                className={menuPos === "Music" ? "btn2 active" : "btn2"}
              >
                Music
              </button>
              <button
                onClick={() => setMenuPos("Other")}
                className={menuPos === "Other" ? "btn3 active" : "btn3"}
              >
                Chat
              </button>
              <button
                onClick={() => setMenuPos("Other1")}
                className={menuPos === "Other1" ? "btn4 active" : "btn4"}
              >
                Profile
              </button>
              <button
                onClick={() => firebaseConfig.auth().signOut()}
                className="btn__footer active"
              >
                Exit
              </button>
            </div>
          </div>
        </Fade>
      </div>
    </>
  );
}

export default MenuBtnFunc;
