import React, { Component, Fragment } from "react";

// Built Components
import Navbar from "../components/Navbar";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// import Container from "@material-ui/core/Container";

// Images
import dineImage from "../images/dine.svg";
import chatbotImage from "../images/chatbot.svg";
import { Container } from "@material-ui/core";

const styles = {
  frame: {
    height: "100vh",
    margin: "auto",
    backgroundColor: "linear-gradient(to right, #fceabb, #f8b500)"
  },
  image: {
    background: `url(${dineImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center"
  },
  image2: {
    background: `url(${chatbotImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center"
  },
  data: {
    padding: 80,
    paddingTop: "25%"
  }
};

export class Index extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Fragment className={classes.index}>
        <Navbar />
        <Container>
          <Grid container component="main" className={classes.frame}>
            <CssBaseline />
            <Grid item xs={false} sm={6} md={6} className={classes.image} />
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              square
              className={classes.data}
              alignItems="center"
            >
              <Typography variant="h5">
                Osteria is an app that enables a restaurant to receive orders
                via voice interface and interacts on behalf of the restaurants
                with its customers to take orders
              </Typography>
            </Grid>
          </Grid>
          <Grid container component="main" className={classes.frame}>
            <CssBaseline />
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              square
              className={classes.data}
              alignItems="center"
            >
              <Typography variant="h5">
                Osteria is an app that enables a restaurant to receive orders
                via voice interface and interacts on behalf of the restaurants
                with its customers to take orders
              </Typography>
            </Grid>
            <Grid item xs={false} sm={6} md={6} className={classes.image2} />
          </Grid>
        </Container>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Index);
