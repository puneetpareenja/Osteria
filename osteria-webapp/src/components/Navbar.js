import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Logo from "../components/Logo";
import Link from "@material-ui/core/Link";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 64
  },
  title: {
    marginLeft: 10
  },
  space: {
    flexGrow: 1,
    margin: 10
  },
  button: {
    width: 100,
    margin: 5
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
});

class Navbar extends Component {
  render() {
    const { classes, authenticated } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="secondary" className={classes.appBar}>
          <Toolbar>
            <Logo size="35" />
            <Typography variant="h5" className={classes.title}>
              Osteria
            </Typography>
            <Typography className={classes.space}></Typography>

            {authenticated === true ? (
              // Authenticated
              <div>
                <Button color="inherit" href="/home" className={classes.button}>
                  Home
                </Button>
                <Button
                  color="inherit"
                  href="/profile"
                  className={classes.button}
                >
                  Profile
                </Button>
              </div>
            ) : (
              // Unauthenticated
              <div>
                <Button color="inherit" href="/" className={classes.button}>
                  Home
                </Button>
                <Button
                  color="inherit"
                  href="/signup"
                  className={classes.button}
                >
                  SignUp
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  href="/login"
                  className={classes.button}
                >
                  Login
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

Navbar.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
