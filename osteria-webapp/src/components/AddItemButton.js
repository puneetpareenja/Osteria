import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "../redux/actions/dataActions";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  dialog: {
    padding: theme.spacing(2),
  },
});

class AddItemButton extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      category: "",
      price: "",
      description: "",
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  addItem = () => {
    const newItem = {
      name: this.state.name,
      category: this.state.category,
      description: this.state.description,
      price: this.state.price,
    };

    console.log(newItem);
    this.props.addItem(newItem);
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
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
            right: 80,
          }}
          onClick={this.handleOpen}
        >
          <AddIcon />
          Add New Item
        </Fab>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Add new Item</DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Item Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Item Description"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="category"
              label="Category"
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Item Price"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions className={classes.dialog}>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addItem} color="primary" variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AddItemButton.propTypes = {
  addItem: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(null, { addItem })(withStyles(styles)(AddItemButton));
