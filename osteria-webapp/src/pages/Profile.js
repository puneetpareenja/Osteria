import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import profileImage from "../images/profile.svg";

// MUI
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Tooltip
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

//Redux
import { uploadUserImage } from "../redux/actions/userActions";

const styles = theme => ({
  root: {
    height: "85vh",
    margin: "auto",
    marginTop: "10vh"
  },
  image: {
    background: `url(${profileImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center"
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginTop: 20,
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 10
  },
  username: {
    fontSize: "2rem",
    fontWeight: "400",
    marginRight: "auto",
    marginLeft: "auto"
  },
  email: {
    fontSize: "1.2rem",
    fontWeight: "300",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 20
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 80,
    marginRight: 100,
    marginLeft: 100
  }
});

class Profile extends Component {
  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadUserImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  render() {
    const {
      classes,
      user: {
        credentials: { name, email, imageUrl, createdAt, userId }
      },
      loading
    } = this.props;

    let profileMarkUp = (
      <Grid
        container
        component="main"
        component={Paper}
        elevation={6}
        className={classes.root}
      >
        <Grid item xs={false} sm={4} md={7} className={classes.image} square />
        <Grid item xs={12} sm={8} md={5} square>
          <div className={classes.profile}>
            {!loading ? (
              <div>
                <Tooltip title="Edit Profile Picture" placement="right-end">
                  <Avatar
                    className={classes.avatar}
                    src={imageUrl}
                    onClick={this.handleEditPicture}
                  />
                </Tooltip>
                <input
                  align="center"
                  type="file"
                  id="imageInput"
                  onChange={this.handleImageChange}
                  hidden="hidden"
                />
                <Typography className={classes.username} align="center">
                  {name}
                </Typography>
                <Typography className={classes.email} align="center">
                  {email}
                </Typography>
              </div>
            ) : (
              <p>loading...</p>
            )}
          </div>
        </Grid>
      </Grid>
    );

    return profileMarkUp;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = { uploadUserImage };

Profile.propType = {
  uploadUserImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
