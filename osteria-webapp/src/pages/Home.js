import React, { Component, Fragment } from "react";
import axios from "axios";

// Material UI
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
// Components
import ItemSekeleton from "../components/ItemSkeleton";

import Item from "../components/Item";

const styles = theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
});

class Home extends Component {
  state = {
    items: null,
    open: false
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
        >
          <AddIcon />
          Add New Item
        </Fab>

        <main className={classes.content} style={{ padding: 20 }}>
          <Grid container spacing={3}>
            {itemsMarkup}
          </Grid>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
