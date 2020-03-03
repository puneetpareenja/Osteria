import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Logo from "../components/Logo";

const styles = {
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    marginLeft: 10
  },
  mainGradient: {
    background: "linear-gradient(to right, #00F260, #0575E6)"
  }
};

class Navbar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className="classes.mainGradient">
          <Toolbar>
            <Logo size="35" />
            <Typography variant="h5" className={classes.title}>
              Osteria
            </Typography>

            <Button color="inherit" href="/">
              Index
            </Button>
            <Button color="inherit" href="/login">
              Login
            </Button>
            <Button color="inherit" href="/home">
              Home
            </Button>
            <Button color="inherit" href="/signup">
              SignUp
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
