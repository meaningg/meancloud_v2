import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/firebase/Auth";

const RedirectPage = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <h1>Redirect Page</h1>
      {currentUser ? (
        <Redirect to="/"></Redirect>
      ) : (
        <Redirect to="/login"></Redirect>
      )}
    </>
  );
};

export default RedirectPage;
