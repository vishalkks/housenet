import React from "react";
import { Component } from "react";
import { Button, message } from "antd";
import objectGetServiceComponent from "../api/GetServiceComponent";

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      loading: true,
    };
    this.retrieveBeanService = this.retrieveBeanService.bind(this);
    this.handleRetriveBeanSuccessfully =
      this.handleRetriveBeanSuccessfully.bind(this);
    this.handleRetriveBeanError = this.handleRetriveBeanError.bind(this);
  }

  retrieveBeanService() {
    objectGetServiceComponent
      .getBeanResponse()
      .then((response) => this.handleRetriveBeanSuccessfully(response))
      .catch((error) => this.handleRetriveBeanError(error));
  }
  handleRetriveBeanSuccessfully(response) {
    console.log(`bean is:${response.data.message}`);
    message.success("Retrieve message successful!");
    this.setState({ data: response.data.message, loading: true });
  }

  handleRetriveBeanError(error) {
    message.error("Retrieve message failed. Please try again.");
    this.setState({ data: "", loading: false });
    console.error(error.response.data);
  }

  render() {
    return (
      <div>
        <h1>This is the search page for {this.props.params.name}.</h1>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="retrieve-btn"
          onClick={this.retrieveBeanService}
        >
          Retrive Message
        </Button>
        <div className="container">{this.state.data}</div>
      </div>
    );
  }
}

export default SearchComponent;
