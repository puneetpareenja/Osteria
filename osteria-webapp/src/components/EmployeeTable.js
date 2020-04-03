import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setActive, setInactive } from "../redux/actions/userActions";

const styles = theme => ({});

class EmployeeTable extends Component {
  deactivate = event => {
    this.props.setInactive(event.currentTarget.value);
  };

  activate = event => {
    this.props.setActive(event.currentTarget.value);
  };
  render() {
    const {
      user: { employees },
      classes
    } = this.props;

    return (
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="Employee Table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map(employee => (
                <TableRow key={employee.email}>
                  <TableCell component="th" scope="row">
                    {employee.name}
                  </TableCell>
                  <TableCell align="right">{employee.email}</TableCell>
                  <TableCell align="right">{employee.type}</TableCell>
                  <TableCell align="right">
                    {employee.active ? (
                      <Button
                        onClick={this.deactivate}
                        value={employee.email}
                        color="primary"
                        variant="contained"
                      >
                        Deactivate
                      </Button>
                    ) : (
                      <Button
                        onClick={this.activate}
                        value={employee.email}
                        color="primary"
                        variant="outlined"
                      >
                        Activate
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { setActive, setInactive })(
  withStyles(styles)(EmployeeTable)
);
