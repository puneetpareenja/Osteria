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
// import CardHeader from "@material-ui/core/CardHeader";
// import Chip from "@material-ui/core/Chip";
// import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    width: 280
  },
  media: {
    height: 200
  },
  title: {
    fontSize: "1.3rem",
    fontWeight: "100"
  },
  price: {
    fontSize: "1rem",
    fontWeight: "800"
  },
  content: {
    padding: 20,
    height: 80
  },
  description: {
    display: "block",
    height: 60,
    marginTop: 10
  }
});

class Item extends Component {
  render() {
    const { classes, item } = this.props;
    return (
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={item.imageUrl}
          title={item.name}
        />
        <CardContent className={classes.content}>
          <Typography className={classes.title}>{item.name}</Typography>
          <Typography className={classes.price} color="primary" variant="">
            $ {item.price}
          </Typography>

          <Typography variant="caption" className={classes.description}>
            {item.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <IconButton aria-label="mark as special">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="edit">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Item);
