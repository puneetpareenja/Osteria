import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// Material UI
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles, useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";

//Personal Component
import login from "../images/login.gif";
import Logo from "../components/Logo";
import Copyright from "../components/Copyright";

// Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

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
    marginTop: 80,
    marginRight: 100,
    marginLeft: 100
  },
  form: {
    marginTop: 20
  },
  submit: {
    marginTop: 10,
    marginBottom: 10
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
};
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;

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
            <form
              noValidate
              className={classes.form}
              onSubmit={this.handleSubmit}
            >
              {errors.general && (
                <Typography variant="body2" align="center" color="error">
                  {errors.general}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                // autoComplete="email"
                autoFocus
                value={this.state.email}
                onChange={this.handleChange}
                helperText={errors.email}
                error={errors.email ? true : false}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                // autoComplete="current-password"
                value={this.state.password}
                onChange={this.handleChange}
                helperText={errors.password}
                error={errors.password ? true : false}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                Sign In
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
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
              <Copyright />
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
