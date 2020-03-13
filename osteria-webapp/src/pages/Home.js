import React, { Component, Fragment } from "react";
import axios from "axios";

// Material UI
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";

// Components
import Navbar from "../components/Navbar";
import ItemSekeleton from "../components/ItemSkeleton";
import Typography from "@material-ui/core/Typography";

import Item from "../components/Item";

const styles = theme => ({
  root: {
    display: "flex"
  }
});

class Home extends Component {
  state = {
    items: null
  };
  componentDidMount() {
    axios
      .get("/items")
      .then(res => {
        console.log(res.data);
        this.setState({
          items: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const classes = this.props;
    let itemsMarkup = this.state.items ? (
      this.state.items.map(item => (
        <Grid item xs>
          <Item key={item.id} item={item}></Item>
        </Grid>
      ))
    ) : (
      <Fragment>
        <Grid item xs>
          <ItemSekeleton />
        </Grid>
        <Grid item xs>
          <ItemSekeleton />
        </Grid>
        <Grid item xs>
          <ItemSekeleton />
        </Grid>
        <Grid item xs>
          <ItemSekeleton />
        </Grid>
      </Fragment>
    );
    return (
      <div>
        <Navbar />
        <Grid container>{itemsMarkup}</Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
