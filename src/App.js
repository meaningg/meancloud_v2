import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/LogIn";
import RedirectPage from "./pages/RedirectPage";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./components/firebase/Auth";
import firebaseConfig from "./components/firebase/config";
import { roleContext } from "./components/contexts/Contexts";
function App() {
  return (
    <div>
      <Redirect push to="/redirect" />
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/redirect" component={RedirectPage} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
