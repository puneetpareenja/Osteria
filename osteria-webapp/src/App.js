import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//Components

// Pages
import Index from "./pages/index";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/home";

//TODO: Implement theme colors
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#9ad9f8"
      // light, dark, contrastText properties available
    },
    secondary: {
      main: "#ff2s23"
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
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
      </MuiThemeProvider>
    );
  }
}

export default App;
