import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// Imported Components
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import About from "./components/About";
import Todolist from "./components/Todolist";
import Alert from "./components/Alert";

// Actions
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
// Redux
import store from "./store";
import { Provider } from "react-redux";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Route exact path="/" component={Signin} />
        <Switch>
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/About" component={About} />
          <Route exact path="/todolist" component={Todolist} />
        </Switch>
      </Router>
    </Provider>
  );
}
