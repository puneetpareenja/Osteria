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
import AppDrawer from "../components/AppDrawer";

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    background: "#FF0000"
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
        <Grid key={item.id} item xs>
          <Item item={item} />
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
        <AppDrawer />

        <main
          className={classes.content}
          style={{ marginLeft: 240, padding: 20 }}
        >
          <Grid container>{itemsMarkup}</Grid>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
