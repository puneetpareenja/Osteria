import React, { Component } from "react";
import Osteria from "../images/osteria.png";

class Logo extends Component {
  render() {
    return (
      <img
        src={Osteria}
        height={this.props.size}
        width={this.props.size}
        padding="5"
        alt="Osteria Logo"
      />
    );
  }
}

export default Logo;
