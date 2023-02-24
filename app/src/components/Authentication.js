import { Component } from "react";

class AuthenticationSessionStorage extends Component {
  registerSuccessEntry(username, password) {
    console.log(`${username} logged in successfully.`);
    sessionStorage.setItem("authenticatedUser", username);
  }
  logoutRemoveEntry() {
    console.log("logged out.");
    sessionStorage.removeItem("authenticatedUser");
  }
  isLogin() {
    let user = sessionStorage.getItem("authenticatedUser");
    if (user === null) {
      return false;
    } else {
      return true;
    }
  }
}

const AuthenticationSessionStorageObject = new AuthenticationSessionStorage();
export default AuthenticationSessionStorageObject;
