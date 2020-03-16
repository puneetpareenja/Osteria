import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { sendMessage } from "../redux/chat";

class Bot extends Component {
  render() {
    const { feed, sendMessage } = this.props;
    return (
      <Fragment>
        <h1>Osteria ChatBot</h1>
        <ul>
          {feed.map(entry => (
            <li>{entry.text}</li>
          ))}
        </ul>
        <input
          type="text"
          onKeyDown={e =>
            e.keyCode === 13 ? sendMessage(e.target.value) : null
          }
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  feed: state
});

export default connect(mapStateToProps, { sendMessage })(Bot);
