import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  TableRow,
  TableCell,
  Table,
  TableBody,
} from "@material-ui/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import { completeOrder } from "../redux/actions/orderActions";

const styles = (theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  actions: {
    float: "right",
  },
});

export class Order extends Component {
  handleClick = () => {
    this.props.completeOrder(this.props.data.id);
  };

  render() {
    dayjs.extend(relativeTime);

    const { classes, data } = this.props;

    let itemsMarkUp = data.items.map((item) => (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>{item.type}</TableCell>
            <TableCell align="right">{item.amount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ));

    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Ordered {dayjs(data.createdAt).fromNow()}
          </Typography>
          <Typography variant="h6" component="h2">
            Table Number : {data.table}
          </Typography>
          {itemsMarkUp}
          <Typography variant="body2" component="p"></Typography>
        </CardContent>
        <Typography>{data.completed}</Typography>
        {data.completed ? null : (
          <CardActions className={classes.actions}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClick}
            >
              Mark As Done
            </Button>
          </CardActions>
        )}
      </Card>
    );
  }
}

export default connect(null, { completeOrder })(withStyles(styles)(Order));
