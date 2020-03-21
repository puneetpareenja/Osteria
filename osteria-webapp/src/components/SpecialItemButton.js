import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { setSpecial, setRegular } from "../redux/actions/dataActions";
import StarBorder from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import IconButton from "@material-ui/core/IconButton";

class SpecialItemButton extends Component {
  setSpecial = () => {
    this.props.setSpecial(this.props.itemId);
  };

  setRegular = () => {
    this.props.setRegular(this.props.itemId);
  };

  render() {
    const special = this.props.special ? (
      <IconButton aria-label="mark as regular" onClick={this.setRegular}>
        <StarIcon color="primary" />
      </IconButton>
    ) : (
      <IconButton aria-label="mark as special" onClick={this.setSpecial}>
        <StarBorder color="primary" />
      </IconButton>
    );
    return special;
  }
}

SpecialItemButton.propTypes = {
  special: PropTypes.bool.isRequired,
  itemId: PropTypes.string.isRequired,
  setRegular: PropTypes.func.isRequired,
  setSpecial: PropTypes.func.isRequired
};

const mapActionToProps = {
  setSpecial,
  setRegular
};

export default connect(null, mapActionToProps)(SpecialItemButton);
