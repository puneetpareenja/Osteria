import React, { Component } from "react";
import { connect } from "react-redux";
import { addEmployee } from "../redux/actions/userActions";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircleOutlined from "@material-ui/icons/AccountCircleOutlined";
import LockOutlined from "@material-ui/icons/LockOutlined";
import EmailOutlined from "@material-ui/icons/EmailOutlined";

const styles = theme => ({
  form: {
    padding: theme.spacing(4)
  },
  button: {
    float: "right",
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
});

class AddEmployeeButton extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      type: "",
      errors: {},
      open: false
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newUserData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      type: this.state.type
    };
    this.props.addEmployee(newUserData);
    this.handleClose();
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
      <div>
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          className={classes.fab}
          style={{
            position: "fixed",
            bottom: 80,
            right: 80
          }}
          onClick={this.handleOpen}
        >
          <AddIcon />
          Add New Employee
        </Fab>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          className={classes.dialog}
        >
          <DialogTitle>Add new Employee</DialogTitle>
          <DialogContent>
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
                type="password"
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

              <TextField
                margin="normal"
                required
                fullWidth
                name="type"
                label="Type(chef or admin)"
                type="text"
                id="type"
                value={this.state.type}
                onChange={this.handleChange}
              />
              <Button
                type="submit"
                // fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Add Employee
              </Button>
              <Button
                onClick={this.handleClose}
                variant="outlined"
                className={classes.button}
                color="primary"
              >
                Cancel
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, { addEmployee })(
  withStyles(styles)(AddEmployeeButton)
);
