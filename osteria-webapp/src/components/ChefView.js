import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles/";
import { getOrders } from "../redux/actions/orderActions";
import Order from "../components/Order";
import { Grid, Typography } from "@material-ui/core";

const styles = (theme) => ({
  grid: {
    margin: theme.spacing(2),
  },
});

class ChefView extends Component {
  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    const {
      classes,
      order: { orders },
      credentials: { type },
    } = this.props;

    let incompleteOrderMarkUp = orders.map((order) =>
      order.completed ? null : (
        <Order key={order.id} data={order} userType={type} />
      )
    );

    let completedOrderMarkUp = orders.map((order) =>
      order.completed ? (
        <Order key={order.id} data={order} userType={type} />
      ) : null
    );

    return (
      <Grid container className={classes.grid}>
        <Grid item sm={6}>
          <Typography variant="h5" className={classes.grid}>
            Incomplete Orders
          </Typography>
          {incompleteOrderMarkUp}
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h5" className={classes.grid}>
            Completed Orders
          </Typography>
          {completedOrderMarkUp}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.order,
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { getOrders })(
  withStyles(styles)(ChefView)
);
