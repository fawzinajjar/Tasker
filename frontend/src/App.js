import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// Imported Components
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import About from "./components/About";
import Todolist from "./components/Todolist";
import Alert from "./components/Alert";

// Redux
import store from "./store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path="/" component={Signin}></Route>
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/About" component={About} />
          <Route exact path="/Todolist" component={Todolist} />
        </Switch>
      </Router>
    </Provider>
  );
}
