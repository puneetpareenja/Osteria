import { SET_ORDERS, COMPLETE_ORDER, SET_ORDER } from "../types";
import axios from "axios";

export const getOrders = () => (dispatch) => {
  axios
    .get("/orders")
    .then((res) => {
      dispatch({
        type: SET_ORDERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ORDERS,
        payload: [],
      });
    });
};

export const getOrder = (orderId) => (dispatch) => {
  axios
    .get(`/order/${orderId}`)
    .then((res) => {
      dispatch({
        type: SET_ORDER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const completeOrder = (orderId) => (dispatch) => {
  axios
    .get(`order/complete/${orderId}`)
    .then((res) => {
      dispatch({
        type: COMPLETE_ORDER,
        payload: orderId,
      });
    })
    .catch((err) => console.log(err));
};
