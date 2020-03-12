import React, { Component, Fragment } from "react";

// Built Components
import Navbar from "../components/Navbar";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

// Images
import dineImage from "../images/dine.svg";
import chatbotImage from "../images/chatbot.svg";

const styles = {
  frame: {
    height: "90vh",
    margin: "auto",
    backgroundColor: "linear-gradient(to right, #fceabb, #f8b500)"
  },
  image: {
    // background: `url(${login})`,
    background: `url(${dineImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  data: {
    padding: 100
  }
};

export class Index extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Fragment className={classes.index}>
        <Navbar />
        <Grid container component="main" className={classes.frame}>
          <CssBaseline />
          <Grid item xs={false} sm={6} md={6} className={classes.image} />
          <Grid item xs={12} sm={6} md={6} square className={classes.data}>
            <Typography variant="h3">
              Osteria is an app that enables a restaurant to receive orders via
              voice interface and interacts on behalf of the restaurants with
              its customers to take orders
            </Typography>
          </Grid>
        </Grid>
        <Grid container component="main" className={classes.frame}>
          <CssBaseline />
          <Grid item xs={false} sm={6} md={6} className={classes.image} />
          <Grid item xs={12} sm={6} md={6} square className={classes.data}>
            <Typography variant="h3">
              Osteria is an app that enables a restaurant to receive orders via
              voice interface and interacts on behalf of the restaurants with
              its customers to take orders
            </Typography>
          </Grid>
        </Grid>
        <Grid container component="main" className={classes.frame}>
          <CssBaseline />
          <Grid item xs={false} sm={6} md={6} className={classes.image} />
          <Grid item xs={12} sm={6} md={6} square className={classes.data}>
            <Typography variant="h3">
              Osteria is an app that enables a restaurant to receive orders via
              voice interface and interacts on behalf of the restaurants with
              its customers to take orders
            </Typography>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Index);
