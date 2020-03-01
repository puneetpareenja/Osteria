import React, { Component } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import Navbar from "../components/Navbar";
import { Container } from "@material-ui/core";

import Item from "../components/Item";
class Home extends Component {
  state = {
    items: null
  };
  componentDidMount() {
    axios
      .get("/items")
      .then(res => {
        console.log(res.data);
        this.setState({
          items: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    let itemsMarkup = this.state.items ? (
      this.state.items.map(item => (
        <Grid item xs>
          <Item key={item.id} item={item}></Item>
        </Grid>
      ))
    ) : (
      <p>Loading</p>
    );
    return (
      <Container>
        <Navbar></Navbar>
        <Grid container spacing={3}>
          {itemsMarkup}
        </Grid>
      </Container>
    );
  }
}

export default Home;

// https://firebasestorage.googleapis.com/v0/b/osteria-xqgodr.appspot.com/o/items%2Fno-item-image.png?alt=media
// https://firebasestorage.googleapis.com/v0/b/osteria-xqgodr.appspot.com/o/items/no-item-image.png?alt=media
