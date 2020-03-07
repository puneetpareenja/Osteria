import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import themeFile from "./util/theme";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Material UI
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Components
import AuthRoute from "./util/AuthRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";

//TODO: Implement theme colors
const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;

let authenticated = false;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/" component={Index}></Route>
              <AuthRoute
                exact
                path="/login"
                component={Login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/signup"
                component={SignUp}
                authenticated={authenticated}
              />
              <Route exact path="/home" component={Home}></Route>
              <Route
                exact
                path="/forgotpassword"
                component={ForgotPassword}
              ></Route>
            </Switch>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
