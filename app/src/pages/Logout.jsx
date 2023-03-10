import React from "react";
import { Component } from "react";
import { Typography, Button, Row } from 'antd';
const { Title } = Typography;

class LogoutComponent extends Component {
  render() {
    return (
      <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh', flexDirection: 'column'}}>
        <Title>You're logged out.</Title>
        <Title level={4}>Thank you for using HouseNet.</Title>
        <Button type="primary" onClick={() => this.props.navigate("/sign-in")}>Sign-in Again</Button>
      </Row>
    );
  }
}

export default LogoutComponent;
