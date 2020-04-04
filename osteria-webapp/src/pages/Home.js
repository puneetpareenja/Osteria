import React, { Component, Fragment } from "react";
import QRCode from "qrcode.react";

// Material UI
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

// Components
import ItemSekeleton from "../components/ItemSkeleton";

import Item from "../components/Item";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getItems, addItem } from "../redux/actions/dataActions";
import { getEmployees } from "../redux/actions/userActions";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddItemButton from "../components/AddItemButton";
import AddEmployeeButton from "../components/AddEmployeeButton";
import EmployeeTable from "../components/EmployeeTable";
import { TextField, Button, Typography } from "@material-ui/core";

const styles = (theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  itemContainer: {
    padding: theme.spacing(2),
  },
  qr: {
    margin: theme.spacing(2),
  },
});

class Home extends Component {
  state = {
    items: null,
    open: false,
    tabValue: 0,
    tables: "",
  };
  componentDidMount() {
    this.props.getItems();
    this.props.getEmployees();
  }

  handleChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };
  handleQRChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      data: { items, loading },
      credentials: { type },
      classes,
    } = this.props;

    let QRMarkUp = [];
    for (let i = 1; i <= this.state.tables; i++) {
      let qrvalue = "http://localhost:3000/welcome/" + i;
      console.log(qrvalue);
      QRMarkUp.push(
        <div key={i}>
          <QRCode value={qrvalue} className={classes.qr} />
          <Typography align="center">Table Number {i}</Typography>
        </div>
      );
    }

    let itemsMarkup = !loading ? (
      items.map((item) => (
        <Item key={item.itemId} item={item} userType={type} />
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
        {type === "admin" ? (
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
              <Tab label="QR Code" />
            </Tabs>
            {this.state.tabValue === 0 ? (
              <div>
                <AddItemButton className={classes.fab} />
                <Grid container spacing={2} className={classes.itemContainer}>
                  {itemsMarkup}
                </Grid>
              </div>
            ) : this.state.tabValue === 1 ? (
              <div>
                <AddEmployeeButton className={classes.fab} />
                <EmployeeTable />
              </div>
            ) : (
              <div>
                <TextField
                  margin="normal"
                  id="tables"
                  name="tables"
                  label="Number of Tables"
                  type="number"
                  value={this.state.tables}
                  onChange={this.handleQRChange}
                />
                <br />
                <Grid container>{QRMarkUp}</Grid>
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  credentials: state.user.credentials,
});

Home.propTypes = {
  getItems: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getItems, addItem, getEmployees })(
  withStyles(styles)(Home)
);
