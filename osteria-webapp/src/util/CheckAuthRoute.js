import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const CheckAuthRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === false ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

CheckAuthRoute.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(CheckAuthRoute);
