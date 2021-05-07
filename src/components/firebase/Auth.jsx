import React, { useEffect, useState } from "react";
import firebaseConfig from "./config";
import "../../scss/components/loader.scss";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    firebaseConfig.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <div className="loading">
        <div className="loading__spinner">
          <div class="loader"></div>
        </div>
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
