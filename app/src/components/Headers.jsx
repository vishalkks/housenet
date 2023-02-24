import React, { Component } from "react";
import { Menu, Row, Col } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AuthenticationSessionStorageObject from "./Authentication";

class Header extends Component {
  render() {
    const isUserLogin = AuthenticationSessionStorageObject.isLogin();
    console.log(`isUser logged in: ${isUserLogin}`);
    return (
      <header
        id="header"
        style={{ color: "white", backgroundColor: "rgba(105, 185, 157, 0.8)" }}
      >
        <Row>
          {/* app icon and name */}
          <Col span={8}>
            <div
              id="icon-name"
              style={{
                color: "white",
                fontSize: "18px",
                backgroundColor: "transparent",
                padding: "14px 10px",
                textAlign: "center",
              }}
            >
              <HomeOutlined />
              &nbsp;&nbsp;
              <span key="app-name">
                <b>HouseNet</b>
              </span>
            </div>
          </Col>

          {/* navigation */}
          <Col span={12}>
            <Menu
              id="nav"
              mode="horizontal"
              style={{
                color: "white",
                fontSize: "16px",
                backgroundColor: "transparent",
                height: "100%",
              }}
            >
              <Menu.Item key="home">
                <Link to="/">
                  <b>Home</b>
                </Link>
              </Menu.Item>
              {isUserLogin && (
                <Menu.Item key="search">
                  <Link to="/search">
                    <b>Search A Rental</b>
                  </Link>
                </Menu.Item>
              )}
              <Menu.Item key="wishlists">
                <b>My Wishlists</b>
              </Menu.Item>
              {isUserLogin && (
                <Menu.Item key="chathub">
                  <b>Chathub</b>
                </Menu.Item>
              )}
              <Menu.Item key="contact">
                <b>Contact</b>
              </Menu.Item>
            </Menu>
          </Col>

          {/* Signin/signup/logout */}
          <Col span={4}>
            <Menu
              id="sign"
              key="sign"
              mode="horizontal"
              style={{
                color: "white",
                fontSize: "16px",
                backgroundColor: "transparent",
                height: "100%",
              }}
            >
              {!isUserLogin && (
                <Menu.Item key="sign-in">
                  <Link to="/sign-in">
                    <b>Sign In</b>{" "}
                  </Link>
                </Menu.Item>
              )}

              {!isUserLogin && (
                <Menu.Item key="sign-up">
                  <Link to="/sign-up">
                    <b>Sign Up </b>{" "}
                  </Link>
                </Menu.Item>
              )}
              {isUserLogin && (
                <Menu.Item key="logout">
                  <Link
                    to="/logout"
                    onClick={
                      AuthenticationSessionStorageObject.logoutRemoveEntry
                    }
                  >
                    <b>Log Out</b>
                  </Link>
                </Menu.Item>
              )}
            </Menu>
          </Col>
        </Row>
      </header>
    );
  }
}

export default Header;
