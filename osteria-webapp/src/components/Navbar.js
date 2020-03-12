import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Logo from "../components/Logo";

const styles = {
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
  mainGradient: {
    background: "linear-gradient(to right, #00F260, #0575E6)"
  },
  button: {
    width: 100,
    margin: 10
  }
};

class Navbar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <Logo size="35" />
            <Typography variant="h5" className={classes.title}>
              Osteria
            </Typography>
            <Typography className={classes.space}></Typography>
            <Button color="inherit" href="/signup" className={classes.button}>
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
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
