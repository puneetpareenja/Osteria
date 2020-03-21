import React, { Component } from "react";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import DeleteItemButton from "./DeleteItemButton";
import SpecialIconButton from "./SpecialItemButton";
// import CardHeader from "@material-ui/core/CardHeader";
// import Chip from "@material-ui/core/Chip";
// import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    width: 280,
    margin: 8
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
  },
  actions: {
    marginTop: theme.spacing(2)
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
          <Typography className={classes.price} color="primary">
            $ {item.price}
          </Typography>

          <Typography variant="caption" className={classes.description}>
            {item.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <SpecialIconButton itemId={item.itemId} special={item.special} />
          <DeleteItemButton itemId={item.itemId} name={item.name} />
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Item);
