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

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import AddItemButton from "../components/AddItemButton";
import AddEmployeeButton from "../components/AddEmployeeButton";

const styles = theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  itemContainer: {
    padding: theme.spacing(2)
  }
});

class Home extends Component {
  state = {
    items: null,
    open: false,
    tabValue: 0
  };
  componentDidMount() {
    this.props.getItems();
  }

  handleChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

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
        <Tabs
          value={this.state.tabValue}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Items" />
          <Tab label="Employees" />
        </Tabs>
        {this.state.tabValue === 0 ? (
          <div>
            <AddItemButton className={classes.fab} />
            <Grid container spacing={2} className={classes.itemContainer}>
              {itemsMarkup}
            </Grid>
          </div>
        ) : (
          <div>
            <AddEmployeeButton className={classes.fab} />
          </div>
        )}
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
