import React, { Component } from "react";
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
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
import LockOutlined from "@material-ui/icons/LockOutlined";
import EmailOutlined from "@material-ui/icons/EmailOutlined";

//Personal Component
// import signup from "../images/signup.gif";
import signup2 from "../images/signup2.svg";
import Logo from "../components/Logo";
import Copyright from "../components/Copyright";

// Redux
import { connect } from "react-redux";
import { signUpUser } from "../redux/actions/userActions";
import { Container } from "@material-ui/core";

const styles = {
  root: {
    height: "85vh",
    margin: "auto",
    marginTop: "10vh"
  },
  image: {
    // background: `url(${signup})`,
    background: `url(${signup2})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 40,
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
class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    this.props.signUpUser(newUserData, this.props.history);
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
      <Container>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image}></Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Logo size="70"></Logo>
              <Typography component="h1" variant="h5">
                Sign Up
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
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={this.state.name}
                  onChange={this.handleChange}
                  helperText={errors.name}
                  error={errors.name ? true : false}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleOutlined />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                    )
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
                  value={this.state.password}
                  onChange={this.handleChange}
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="confirmPassword"
                  id="password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  helperText={errors.confirmPassword}
                  error={errors.confirmPassword ? true : false}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={loading}
                >
                  Sign Up
                  {loading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>

                <Box mt={2} className={classes.footer}>
                  <Link href="/login">
                    <Typography align="center">
                      Already have an account? Sign In
                    </Typography>
                  </Link>
                </Box>
                <Copyright />
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signUpUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, { signUpUser })(
  withStyles(styles)(SignUp)
);
