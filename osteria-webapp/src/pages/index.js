import React, { Component, Fragment } from "react";

// Built Components
import Navbar from "../components/Navbar";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  gradient: {
    background:
      "linear-gradient(to right, #fdbb2d, #b21f1f, #1a2a6c)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
};

export class Index extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Navbar />
      </Fragment>
    );
  }
}

export default withStyles(styles)(Index);
