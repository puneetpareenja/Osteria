import {
  SET_ITEMS,
  LOADING_DATA,
  SET_SPECIAL,
  SET_REGULAR,
  DELETE_ITEM,
  SET_ERRORS,
  ADD_ITEM,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ITEM,
  STOP_LOADING_UI,
  UPLOAD_ITEM_IMAGE,
} from "../types";
import axios from "axios";

export const getItems = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/items")
    .then((res) => {
      dispatch({
        type: SET_ITEMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ITEMS,
        payload: [],
      });
    });
};

export const getItem = (itemId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/item/${itemId}`)
    .then((res) => {
      dispatch({
        type: SET_ITEM,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const addItem = (newItem) => (dispatch) => {
  axios
    .post("/addItem", newItem)
    .then((res) => {
      dispatch({
        type: ADD_ITEM,
        payload: {
          itemId: res.data.id,
          ...res.data,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setSpecial = (itemId) => (dispatch) => {
  axios
    .get(`/item/${itemId}/special`)
    .then((res) => {
      dispatch({
        type: SET_SPECIAL,
        payload: itemId,
      });
    })
    .catch((err) => console.log(err));
};

export const setRegular = (itemId) => (dispatch) => {
  axios
    .get(`/item/${itemId}/regular`)
    .then((res) => {
      dispatch({
        type: SET_REGULAR,
        payload: itemId,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteItem = (itemId) => (dispatch) => {
  axios
    .delete(`/item/${itemId}`)
    .then(() => {
      dispatch({ type: DELETE_ITEM, payload: itemId });
    })
    .catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const uploadItemImage = (itemId, formData) => (dispatch) => {
  axios
    .post(`/item/image/${itemId}`, formData)
    .then((res) => {
      dispatch({
        type: UPLOAD_ITEM_IMAGE,
        payload: { itemId, imageUrl: res.imageUrl },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
