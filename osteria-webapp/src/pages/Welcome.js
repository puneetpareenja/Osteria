import React, { Component, Fragment } from "react";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

// Images
import dineImage from "../images/dine.svg";
import chatbotImage from "../images/chatbot.svg";
import { connect, Provider } from "react-redux";
import Item from "../components/Item";
import ItemSekeleton from "../components/ItemSkeleton";
import { store2 } from "../redux/chat";
import Bot from "../components/Bot";
import { getItems } from "../redux/actions/dataActions";

const styles = (theme) => ({
  frame: {
    height: "100vh",
    margin: "auto",
    backgroundColor: "linear-gradient(to right, #fceabb, #f8b500)",
  },
  image: {
    background: `url(${dineImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
  image2: {
    background: `url(${chatbotImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
  data: {
    padding: 80,
    paddingTop: "25%",
  },
  itemContainer: {
    padding: theme.spacing(2),
  },
});

export class Welcome extends Component {
  componentDidMount() {
    this.props.getItems();
    const { handle } = this.props.match.params;
    console.log(handle);
  }

  render() {
    const {
      data: { items, loading },
      classes,
    } = this.props;
    const { handle } = this.props.match.params;
    console.log(handle);

    let itemsMarkup = !loading ? (
      items.map((item) => (
        <Item key={item.itemId} item={item} userType="customer" />
      ))
    ) : (
      <Fragment>
        <Grid item xs>
          <ItemSekeleton />
        </Grid>
        <Grid item xs>
          <ItemSekeleton />
        </Grid>
        <Grid item xs>
          <ItemSekeleton />
        </Grid>
        <Grid item xs>
          <ItemSekeleton />
        </Grid>
      </Fragment>
    );

    return (
      <Fragment>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={false} sm={7}>
              <Grid container spacing={2} className={classes.itemContainer}>
                {itemsMarkup}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Provider store={store2}>
                <Bot handle={handle} />
              </Provider>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getItems })(
  withStyles(styles)(Welcome)
);
