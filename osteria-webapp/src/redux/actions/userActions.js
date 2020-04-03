import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  GET_EMPLOYEES,
  ACTIVATE,
  DEACTIVATE
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/home");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const signUpUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/home");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const addEmployee = newUserData => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then(res => {
      dispatch({
        type: "ADD_EMPLOYEE",
        payload: newUserData
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const uploadUserImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const getEmployees = () => dispatch => {
  dispatch({ type: LOADING_USER });
  const employees = [];
  axios.get("/users").then(res => {
    res.data.forEach(user => {
      if (user.type === "chef" || user.type === "admin") {
        employees.push(user);
      }
    });
    dispatch({ type: GET_EMPLOYEES, payload: employees });
  });
};

export const setActive = email => dispatch => {
  axios
    .get(`/user/activate/${email}`)
    .then(() => {
      dispatch({
        type: ACTIVATE,
        payload: email
      });
    })
    .catch(err => console.log(err));
};

export const setInactive = email => dispatch => {
  axios
    .get(`/user/deactivate/${email}`)
    .then(() => {
      dispatch({
        type: DEACTIVATE,
        payload: email
      });
    })
    .catch(err => console.log(err));
};
