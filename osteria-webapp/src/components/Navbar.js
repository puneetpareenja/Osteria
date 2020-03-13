import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Logo from "../components/Logo";
import Link from "@material-ui/core/Link";

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
    margin: 10
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
});

class Navbar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="secondary" className={classes.appBar}>
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
