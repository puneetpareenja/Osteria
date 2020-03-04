import React, { Component } from "react";

// Material UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles, useTheme } from "@material-ui/core/styles";

//Personal Component
import login from "../images/login.gif";
import Logo from "../components/Logo";
import Copyright from "../components/Copyright";

const styles = {
  root: {
    height: "100vh",
    margin: "auto"
  },
  image: {
    background: `url(${login})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: 40
  },
  form: {
    marginTop: 20
  },
  submit: {
    marginTop: 10,
    marginBottom: 10
  }
};
class Login extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image}></Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Logo size="70"></Logo>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <form noValidate className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpassword">
                    <Typography align="right" variant="body2">
                      Forgot Password?
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Link href="/signup">
                  <Typography align="center">
                    Don't have an account? Sign Up
                  </Typography>
                </Link>
              </Box>
              <Box mt={30}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Login);
