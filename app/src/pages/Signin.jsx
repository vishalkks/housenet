import React, { Component } from "react";
import { Form, Input, Button, message, Checkbox } from "antd";
import { Link } from "react-router-dom";
import Authentication from "../components/Authentication";
import objectGetServiceComponent from "../api/GetServiceComponent";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      checked: false,
      disabled: false,
      hasLoginFailed: false,
      hasLoginSuccess: false,
    };
    this.label = `${this.state.checked ? "Remembered!" : "Remember me"}`;
    this.toggleDisable = this.toggleDisable.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  toggleDisable() {
    this.setState({ disabled: !this.state.disabled });
  }

  handleCheckboxChange(event) {
    // console.log("checked = ", event.target.checked);
    this.setState({ checked: event.target.checked });
  }

  handleChange(event) {
    // console.log("current state = ", this.state);
    this.setState({ [event.target.name]: event.target.value });
  }

  onClick() {
    this.setState({ loading: true });
    console.log("login finish");
    objectGetServiceComponent
      .getSigninResponse({
        username: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        message.success("Login successful!");
        this.setState({
          hasLoginSuccess: true,
          hasLoginFailed: false,
          loading: false,
          username: response.data.username,
          password: response.data.password,
        });
        Authentication.registerSuccessEntry(
          this.state.username,
          this.state.password
        );
        // this.props.navigate(`/search/${this.state.username}`); // React v6 navigation
        this.props.navigate("/search"); // React v6 navigation
      })
      .catch((error) => {
        message.error(
          "Log-in failed. Please check your username and password."
        );
        this.setState({
          hasLoginFailed: true,
          hasLoginSuccess: false,
          loading: false,
        });
        console.error(error);
      });
  }

  render() {
    return (
      <div className="signin">
        <div
          className="login-form"
          style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}
        >
          <h1>Sign in</h1>
          <Form layout="vertical">
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
                { min: 4, message: "Username must be at least 4 characters" },
              ]}
            >
              <Input
                name="username"
                placeholder={this.state.username}
                size="large"
                onChange={this.handleChange}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 8 characters" },
              ]}
            >
              <Input.Password
                name="password"
                placeholder={this.state.password}
                size="large"
                onChange={this.handleChange}
              />

              <Checkbox
                checked={this.state.checked}
                disabled={this.state.disabled}
                onChange={this.handleCheckboxChange}
              >
                {`${this.state.checked ? "Remembered!" : "Remember me"}`}
              </Checkbox>

              <Button
                style={{ margin: "0 5px" }}
                type="primary"
                size="small"
                onClick={this.toggleDisable}
              >
                {!this.state.disabled ? "Disable" : "Enable"}
              </Button>

              <Link className="login-form-forgot" to="/sign-up">
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.loading}
                size="large"
                onClick={this.onClick}
              >
                Sign in
              </Button>
            </Form.Item>

            <Form.Item name="messageBox" wrapperCol={{ offset: 4, span: 16 }}>
              {this.state.hasLoginSuccess && (
                <div className="container">
                  <h1>Welcome, {this.state.username}</h1>
                </div>
              )}
              {this.state.hasLoginFailed && (
                <div className="alert alert-warning">
                  Login Failed, Check your username and password
                </div>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Signin;
