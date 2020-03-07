import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";

export const loginUser = userDate => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then(res => {
      const FBIdToken = `Bearer ${res.data.token}`;
      localStorage.setItem("FBIdToken", FBIdToken);
      axios.defaults.header.common["Authorization"] = FBIdToken;
      this.setState({
        loading: false
      });
      this.props.history.push("/");
    })
    .catch(err => {
      console.log(err);
      this.setState({
        errors: err.response.data,
        loading: false
      });
    });
};

// export const getUserData = () => dispatch => {
//     axios.get('/user')
// };
