import React, { Component } from "react";
import { connect } from "react-redux";
import { sendMessage } from "../redux/chat";
import withStyles from "@material-ui/core/styles/withStyles";
import { ChatFeed, Message } from "react-chat-ui";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  chat: {
    height: 400,
    flex: 1
  },
  bottom: {
    position: "absolute",
    top: 480,
    width: "80vw"
  }
});

class Bot extends Component {
  handleKeyDown = event => {
    const { sendMessage } = this.props;
    // this.setState({ open: true });
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
        <ChatFeed
          messages={messageArray}
          maxHeight={400}
          className={classes.chat}
        />

        <TextField
          className={classes.bottom}
          placeholder="Type a message..."
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
