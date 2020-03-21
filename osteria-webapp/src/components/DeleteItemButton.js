import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

import { connect } from "react-redux";
import { deleteItem } from "../redux/actions/dataActions";

const styles = theme => ({
  dialog: {
    padding: theme.spacing(2)
  }
});

class DeleteItemButton extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteItem = () => {
    this.props.deleteItem(this.props.itemId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <IconButton aria-label="delete" onClick={this.handleOpen}>
          <DeleteIcon color="error" />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
          className={classes.dialog}
        >
          <DialogTitle>Are you sure you want to delete this Item?</DialogTitle>
          <DialogActions className={classes.dialog}>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.deleteItem}
              color="primary"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteItemButton.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  itemId: PropTypes.string.isRequired
};

export default connect(null, { deleteItem })(
  withStyles(styles)(DeleteItemButton)
);
