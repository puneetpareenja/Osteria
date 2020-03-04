import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//Components

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";

//TODO: Implement theme colors
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4285F4",
      contrastText: "white"
      // light, dark, contrastText properties available
    },
    secondary: {
      main: "#fff",
      contrastText: "black"
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/" component={Index}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/signup" component={SignUp}></Route>
              <Route exact path="/home" component={Home}></Route>
              <Route
                exact
                path="/forgotpassword"
                component={ForgotPassword}
              ></Route>
            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
