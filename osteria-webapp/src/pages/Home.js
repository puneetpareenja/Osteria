import React, { Component, Fragment } from "react";

// Material UI
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

// Components
import ItemSekeleton from "../components/ItemSkeleton";

import Item from "../components/Item";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getItems, addItem } from "../redux/actions/dataActions";

import AddItemButton from "../components/AddItemButton";

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
    this.props.getItems();
  }

  render() {
    const {
      data: { items, loading },
      credentials: { type },
      classes
    } = this.props;

    let itemsMarkup = !loading ? (
      items.map(item => <Item key={item.itemId} item={item} userType={type} />)
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
        <AddItemButton />
        <main className={classes.content} style={{ padding: 20 }}>
          <Grid container spacing={3}>
            {itemsMarkup}
          </Grid>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
  credentials: state.user.credentials
});

Home.propTypes = {
  getItems: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getItems, addItem })(
  withStyles(styles)(Home)
);
