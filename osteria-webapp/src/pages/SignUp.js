import React, { Component } from "react";

// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

//Personal Component
import signup from "../images/signup.gif";
import Logo from "../components/Logo";
import Copyright from "../components/Copyright";

const styles = {
  root: {
    height: "100vh"
  },
  image: {
    background: `url(${signup})`,
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
class SignUp extends Component {
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
              Register
            </Typography>
            <form noValidate className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="ConfirmPassword"
                type="password"
                id="confrimPassword"
              />
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
              <Box mt={5}>
                <Link href="/login">
                  <Typography align="center">
                    Already have an Account? Login
                  </Typography>
                </Link>
              </Box>
              <Box mt={15}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SignUp);
