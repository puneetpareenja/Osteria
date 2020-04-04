import React, { Component } from "react";
import { connect } from "react-redux";
import { sendMessage } from "../redux/chat";
import withStyles from "@material-ui/core/styles/withStyles";
import { ChatFeed, Message } from "react-chat-ui";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";

const styles = (theme) => ({
  chat: {
    height: 600,
    marginBottom: theme.spacing(2),
  },
  bottom: {
    position: "absolute",
    top: 480,
    width: "80vw",
  },
});

class Bot extends Component {
  componentDidMount() {
    this.props.sendMessage(`Table number ${this.props.handle}`);
  }
  handleKeyDown = (event) => {
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

    for (let i = 0; i < feed.length; i++) {
      const element = feed[i];
      let message = new Message({ id: element.id, message: element.text });
      messageArray.push(message);
    }
    // feed.forEach((element) => {
    //   let message = new Message({ id: element.id, message: element.text });
    //   messageArray.push(message);
    // });
    console.log(messageArray);
    return (
      <div>
        <Box className={classes.chat}>
          <ChatFeed messages={messageArray} maxHeight={600} />
        </Box>

        <TextField
          fullWidth
          placeholder="Type a message..."
          type="text"
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  feed: state,
});

export default connect(mapStateToProps, { sendMessage })(
  withStyles(styles)(Bot)
);
