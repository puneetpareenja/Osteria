import React, { Component } from "react";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CardHeader from "@material-ui/core/CardHeader";

const styles = {
  root: {
    maxWidth: 300,
    marginBottom: 20
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    marginLeft: "auto"
  }
};

class Item extends Component {
  render() {
    const { classes, item } = this.props;
    return (
      <Card className={classes.root}>
        <CardHeader title={item.name} />
        <CardMedia
          className={classes.media}
          image={item.imageUrl}
          title={item.name}
        />
        {/* <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description}
          </Typography>
          <Typography
            variant="h6"
            color="primary"
            style={{ paddingTop: 10, textAlign: "right" }}
          >
            ${item.price}
          </Typography>
        </CardContent> */}
        <CardActions className={classes.actions}>
          <IconButton aria-label="mark as special">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <Typography
            color="primary"
            variant="h6"
            style={{ marginLeft: "auto", marginRight: 20 }}
          >
            $ {item.price}
          </Typography>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Item);
