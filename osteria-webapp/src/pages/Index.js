import React, { Component, Fragment } from "react";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

// Images
import dineImage from "../images/dine.svg";
import chatbotImage from "../images/chatbot.svg";
import { Container } from "@material-ui/core";

const styles = {
  frame: {
    height: "100vh",
    margin: "auto",
    backgroundColor: "linear-gradient(to right, #fceabb, #f8b500)",
  },
  image: {
    background: `url(${dineImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
  image2: {
    background: `url(${chatbotImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
  data: {
    padding: 80,
    paddingTop: "25%",
  },
};

export class Index extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Container>
          <Grid container component="main" className={classes.frame}>
            <CssBaseline />
            <Grid item xs={false} sm={6} md={6} className={classes.image} />
            <Grid item xs={12} sm={6} md={6} className={classes.data}>
              <Typography variant="h5">
                Osteria is an app that enables a restaurant to receive orders
                via voice interface and interacts on behalf of the restaurants
                with its customers to take orders
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Index);
