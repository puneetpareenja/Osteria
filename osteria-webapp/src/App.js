import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

//Components

// Pages
import Index from "./pages/index";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar></Navbar>
        <div className="container">
          <Router>
            <Switch>
              <Route exact path="/" component={Index}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/signup" component={SignUp}></Route>
              <Route exact path="/home" component={Home}></Route>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
