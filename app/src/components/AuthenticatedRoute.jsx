import React, { Component } from "react";
import { Navigate } from "react-router";
import AuthenticationSessionStorageObject from "./Authentication";

class AuthenticatedRoute extends Component {
  render() {
    if (AuthenticationSessionStorageObject.isLogin()) {
      return {
        ...this.props.children,
      };
    } else {
      return <Navigate to="/sign-in" />;
    }
  }
}

export default AuthenticatedRoute;
