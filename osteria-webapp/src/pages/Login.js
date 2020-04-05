import React, { Component } from "react";
import PropTypes from "prop-types";

// Material UI
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailOutlined from "@material-ui/icons/EmailOutlined";
import LockOutlined from "@material-ui/icons/LockOutlined";

//Personal Component
// import login from "../images/login.gif";
import login2 from "../images/login2.svg";
import Logo from "../components/Logo";
import Copyright from "../components/Copyright";

// Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import { Container, Box } from "@material-ui/core";

const styles = {
  root: {
    height: "85vh",
    margin: "auto",
    marginTop: "10vh",
  },
  image: {
    // background: `url(${login})`,
    background: `url(${login2})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 80,
    marginRight: 100,
    marginLeft: 100,
  },
  form: {
    marginTop: 20,
  },
  submit: {
    marginTop: 10,
    marginBottom: 10,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
};
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <Container>
        <Grid
          container
          component={Paper}
          elevation={6}
          className={classes.root}
        >
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image}></Grid>
          <Grid item xs={12} sm={8} md={5}>
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined />
                      </InputAdornment>
                    ),
                  }}
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    ),
                  }}
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

                {/* <Grid container>
                  <Grid item xs>
                    <Link href="/forgotpassword">
                      <Typography align="right" variant="body2">
                        Forgot Password?
                      </Typography>
                    </Link>
                  </Grid>
                </Grid> */}
                {/* <Box mt={5}>
                  <Link href="/signup">
                    <Typography align="center">
                      Don't have an account? Sign Up
                    </Typography>
                  </Link>
                </Box> */}
                <Box mt={10}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
