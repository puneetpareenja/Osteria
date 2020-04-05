import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({});

class InvoiceTabView extends Component {
  render() {
    return <div>Hello</div>;
  }
}

export default connect()(withStyles(styles)(InvoiceTabView));
