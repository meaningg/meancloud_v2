import React, { useEffect, useContext, useState } from "react";
import Content from "../components/Content";
import TopWelcome from "../components/TopWelcome";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/firebase/Auth";
import firebaseConfig from "../components/firebase/config";
import "../scss/pages/dashboard.scss";
import {
  MenuPosContext,
  adminMenuContext,
} from "../components/contexts/Contexts";
import MenuBtnFunc from "../components/MenuBtnFunc";
import UserSettings from "../components/UserSettings";
import AdminHeader from "../components/AdminHeader";
import AdminNews from "../components/AdminNews";
import AdminPlaylists from "../components/AdminPlaylists";
import AdminAdmins from "../components/AdminAdmins";
import PageComingSoon from "../components/PageComingSoon";
import { roleContext } from "../components/contexts/Contexts";
import ScrollToTop from "react-scroll-to-top";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [menuPos, setMenuPos] = useState("Home");
  const [adminMenuPos, setAdminMenuPos] = useState("News");
  const db = firebaseConfig.firestore();
  const [role, setRole] = useState("");
  const [blocks, setBlocks] = useState([]);
  const docRef = db.collection("users").doc(currentUser.uid);
  docRef.get().then((doc) => {
    setRole(doc.data().role);
  });

  useEffect(() => {
    const db = firebaseConfig.firestore();
    return db
      .collection("blocks")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        const blocksData = [];
        snapshot.forEach((doc) =>
          blocksData.push({ ...doc.data(), id: doc.id })
        );
        setBlocks(blocksData);
      });
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="">
      <ScrollToTop
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
          color: "white",
          fontSize: "25pt",
          opacity: "80%",
          position: "fixed",
          top: "100%",
          left: "50%",
          transform: "translate(-50%, -100%)",
        }}
        smooth
        component={<FontAwesomeIcon icon={faChevronUp} />}
      />
      <roleContext.Provider value={{ role, blocks }}>
        <MenuPosContext.Provider
          value={{
            menuPos,
            setMenuPos,
          }}
        >
          {menuPos === "Home" ? (
            <>
              <MenuBtnFunc />
              <TopWelcome />

              <Content></Content>
            </>
          ) : menuPos === "Music" ? (
            <>
              <MenuBtnFunc />

              <PageComingSoon />
            </>
          ) : menuPos === "Other" ? (
            <>
              <MenuBtnFunc />
              <PageComingSoon />
            </>
          ) : menuPos === "Other1" ? (
            <>
              <MenuBtnFunc />
              <UserSettings />
            </>
          ) : menuPos === "Admin" ? (
            <>
              <MenuBtnFunc />
              <adminMenuContext.Provider
                value={{
                  adminMenuPos,
                  setAdminMenuPos,
                }}
              >
                <AdminHeader />
                {adminMenuPos === "News" ? (
                  <>
                    <AdminNews />
                  </>
                ) : adminMenuPos === "Playlists" ? (
                  <AdminPlaylists />
                ) : adminMenuPos === "Users" ? (
                  <AdminAdmins />
                ) : (
                  ""
                )}
              </adminMenuContext.Provider>
            </>
          ) : (
            ""
          )}
        </MenuPosContext.Provider>
      </roleContext.Provider>
    </div>
  );
};

export default Dashboard;
