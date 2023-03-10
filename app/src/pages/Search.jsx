import React from "react";
import { Component } from "react";
import {
  Button,
  message,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Card,
  Avatar,
  Typography,
} from "antd";
import objectGetServiceComponent from "../api/GetServiceComponent";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import axios from "axios";
import "../searchbar.css";
import FloatLabel from "./FloatLabel";
import data from "../data/hardcode.json";

const { Option } = Select;
const { Meta } = Card;
const { Title } = Typography;

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      loading: true,
      location: {
        address: "",
        postalCode: "",
      },
      price: "",
      beds: "",
      pets: "",
      moveInDate: "",
      filteredListing: data
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

  async getGeoLocation(latitude, longitude) {
    // const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&location_type=ROOFTOP&result_type=street_address&key=AIzaSyB-vvXcp3O6oPDD_Lgj9Hk4cNxnsdVhx90");
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        latitude +
        "," +
        longitude +
        "&key=AIzaSyB-vvXcp3O6oPDD_Lgj9Hk4cNxnsdVhx90"
    );
    console.log(response);
    // alert(response["data"]["plus_code"]["compound_code"]);
    let code = "";
    response["data"]["results"].forEach(result => {
      // console.log(result);
      result.address_components.forEach(component => {
        if(component?.types.includes("postal_code")) {
          code = component.long_name
        }
      })
    });
    console.log(code);

    this.setState({
      location: {
        address: response["data"]["plus_code"]["compound_code"],
        postalCode: code
      },
    });
  }

  handleSearch() {
    console.log(this.state);
    console.log(data);

    let filteredData = data;
    if(this.state.location.postalCode !== "") {
      filteredData = filteredData.filter(d => d.postalCode === this.state.location.postalCode);
    }
    if(this.state.price !== "") {
      filteredData = filteredData.filter(d => d.price === `$${this.state.price}/month`);
    }
    if(this.state.beds !== "") {
      filteredData = filteredData.filter(d => d.beds ===  `${this.state.beds} Beds`);
    }
    if(this.state.pets !== "") {
      filteredData = filteredData.filter(d => d.pets ===  (this.state.pets === "no" ? "No Pets" : "Allow Pets"));
    }
    console.log("filteredData", filteredData);
    this.setState({
      filteredListing: filteredData
    })
  }

  render() {
    return (
      <>
        {/* <h1>This is the search page for {this.props.params.name}.</h1> */}
        <Row justify="center" className="searchbar">
          <Col span={4}>
            <FloatLabel
              label="Location"
              name="location"
              value={this.state.location.address}
            >
              <Input
                className="float-input"
                value={
                  this.state.location.address
                } 
                onChange={e => this.setState((prevState, props) => ({location: {
                  address: e.target.value,
                  postalCode: e.target.value
                }}))}
              />
            </FloatLabel>
          </Col>
          <Col span={4}>
            <FloatLabel name="move-in-date" value={this.state.moveInDate}>
              {/* <DatePicker onChange={e => this.setState({moveInDate: e.target.value})} style={{ width: '100%' }} /> */}
              <Input
                placeholder="Move-in Date"
                type="date"
                className="float-input"
                value={this.state.moveInDate}
                onChange={(e) => this.setState({ moveInDate: e.target.value })}
              />
            </FloatLabel>
          </Col>
          <Col span={4}>
            <FloatLabel
              label="Price Range"
              name="price"
              value={this.state.price}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                onChange={(value) => this.setState({ price: value })}
                value={this.state.price}
                // mode="tags"
              >
                <Option value=""></Option>
                <Option value="1000">$1000</Option>
                <Option value="2000">$2000</Option>
                <Option value="3000">$3000</Option>
                <Option value="4000">$4000</Option>
                <Option value="5000">$5000</Option>
                <Option value="6000">$6000</Option>
              </Select>
            </FloatLabel>
          </Col>
          <Col span={4}>
            <FloatLabel label="Beds" name="beds" value={this.state.beds}>
              <Select
                showSearch
                style={{ width: "100%" }}
                onChange={(value) => this.setState({ beds: value })}
                value={this.state.beds}
                // mode="tags"
              >
                <Option value=""></Option>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
              </Select>
            </FloatLabel>
          </Col>
          <Col span={4}>
            <FloatLabel label="Pets" name="pets" value={this.state.pets}>
              <Select
                showSearch
                style={{ width: "100%" }}
                onChange={(value) => this.setState({ pets: value })}
                value={this.state.pets}
                // mode="tags"
              >
                <Option value="yes">Yes</Option>
                <Option value="no">No</Option>
              </Select>
            </FloatLabel>
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={() => this.handleSearch()}>Search</Button>
          </Col>
        </Row>

        <Row justify="space-between" className="row">
          <Col span={12} className="col" style={{ height: "70vh" }}>
            <Map
              google={this.props.google}
              zoom={8}
              onClick={(t, map, coord) => {
                this.getGeoLocation(coord.latLng.lat(), coord.latLng.lng());
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
              }}
              initialCenter={{ lat: 32.87512, lng: -117.21886 }}
            >
              <Marker position={{ lat: 33.0, lng: -117.0 }} />
            </Map>
          </Col>
          <Col span={12} className="col">
            <Row wrap={true}>
              {this.state.filteredListing.map((listing) => (
                <Col span={12} className="card-col" key={listing.id}>
                  <Card
                    style={{ width: 300 }}
                    cover={<img alt={listing.city} width={300} height={184} src={require('../static/'+listing.id+'.jpg')} />}
                    actions={[
                      <span>
                        <i class="fa-solid fa-bed" /> {listing.beds}
                      </span>,
                      <span>
                        <i class="fa-solid fa-bath" /> {listing.bathrooms}
                      </span>,
                      <span>
                        <i class="fa-solid fa-paw" /> {listing.pets}
                      </span>,
                    ]}
                  >
                    <Title level={4} style={{ color: "#1677ff" }}>
                      {listing.price}
                    </Title>
                    <Meta
                      title={listing.city}
                      description={listing.location}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

// export default SearchComponent;
export default GoogleApiWrapper({
  apiKey: "AIzaSyB-vvXcp3O6oPDD_Lgj9Hk4cNxnsdVhx90",
})(SearchComponent);
