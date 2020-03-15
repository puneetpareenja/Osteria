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
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import { ListItemIcon, ListItemText } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logoutUser } from "../redux/actions/userActions";

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
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    window.location.href = "/";
    this.props.logoutUser();
  };

  render() {
    const {
      classes,

      user: {
        credentials: { imageUrl },
        authenticated
      }
    } = this.props;
    const { anchorEl } = this.state;

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
                <Button>
                  <Avatar src={imageUrl} onClick={this.handleClick} />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <Link
                    href="/profile"
                    color="inherit"
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem onClick={this.linkToProfile}>
                      <ListItemIcon>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText>Profile</ListItemText>
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={this.handleLogout}>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
                </Menu>
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
  user: state.user
});

const mapActionToProps = { logoutUser };

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Navbar));
