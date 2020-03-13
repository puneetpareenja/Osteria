import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
// import AppBar from "@material-ui/core/AppBar";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import StarIcon from "@material-ui/icons/Star";
import ReceiptIcon from "@material-ui/icons/Receipt";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Avatar } from "@material-ui/core";
import Link from "@material-ui/core/Link";

const drawerWidth = 240;
const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginTop: 20,
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 10
  },
  username: {
    fontSize: "1rem",
    fontWeight: "500",
    marginRight: "auto",
    marginLeft: "auto"
  },
  email: {
    fontSize: "0.8rem",
    fontWeight: "300",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 20
  },

  toolbar: theme.mixins.toolbar
});

class AppDrawer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Avatar className={classes.avatar} />
          <Typography className={classes.username}>Puneet Pareenja</Typography>
          <Typography className={classes.email}>
            pareenjapuneet@gmail.com
          </Typography>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <FastfoodIcon />
              </ListItemIcon>
              <ListItemText>Items</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <StarIcon />
              </ListItemIcon>
              <ListItemText>Specials</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText>Orders</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(AppDrawer);
