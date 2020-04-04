import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import themeFile from "./util/theme";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
// Material UI
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Components
import AuthRoute from "./util/AuthRoute";
import CheckAuthRoute from "./util/CheckAuthRoute";
import Navbar from "./components/Navbar";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import axios from "axios";
import { Container } from "@material-ui/core";
import Profile from "./pages/Profile";

//TODO: Implement theme colors
const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Navbar />
          <Container>
            <Router>
              <Switch>
                <Route exact path="/welcome/:handle" component={Index} />
                <AuthRoute exact path="/login" component={Login} />
                {/* <AuthRoute exact path="/signup" component={SignUp} /> */}
                <CheckAuthRoute exact path="/home" component={Home} />
                {/* <AuthRoute
                  exact
                  path="/forgotpassword"
                  component={ForgotPassword}
                /> */}
                <CheckAuthRoute exact path="/profile" component={Profile} />
              </Switch>
            </Router>
          </Container>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
