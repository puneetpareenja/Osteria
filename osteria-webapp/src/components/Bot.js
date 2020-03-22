import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { sendMessage } from "../redux/chat";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { ChatFeed, Message } from "react-chat-ui";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    height: "80vh"
  },
  textfield: {
    position: "fixed",
    // top: 480
    bottom: 10
  }
});

class Bot extends Component {
  handleKeyDown = event => {
    const { sendMessage } = this.props;
    this.setState({ open: true });
    if (event.keyCode === 13) {
      sendMessage(event.target.value);
      event.target.value = "";
    }
  };

  render() {
    const { feed, classes } = this.props;
    const messageArray = [];
    console.log(feed);
    feed.forEach(element => {
      let message = new Message({ id: element.id, message: element.text });
      messageArray.push(message);
    });
    console.log(messageArray);
    return (
      <div>
        <ChatFeed messages={messageArray} maxHeight={400} />

        <TextField
          className={classes.textfield}
          placeholder="Type a message..."
          fullWidth
          type="text"
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feed: state
});

export default connect(mapStateToProps, { sendMessage })(
  withStyles(styles)(Bot)
);
