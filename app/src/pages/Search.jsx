import React from "react";
import { Component } from "react";
import { Button, message } from "antd";
import objectGetServiceComponent from "../api/GetServiceComponent";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import axios from "axios";
import '../searchbar.css';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      loading: true,
      location: {
        "address": "",
        "postalCode": ""
      },
      price: "",
      beds: "",
      pets: ""
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
    const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&key=AIzaSyB-vvXcp3O6oPDD_Lgj9Hk4cNxnsdVhx90")
    console.log(response);
    // const address = response["data"];
    // console.log("address", address);
    alert(response["data"]["plus_code"]["compound_code"]);
    this.setState({
      location: {
        address: response["data"]["plus_code"]["compound_code"],
        postalCode: ""
      }
    })
  }

  render() {
    return (
      <>
        <div style={{backgroundColor: "white"}}>
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

        <div>
          <h2 id="searchproperties"> Search Properties</h2>

          <div className="searchbar">
            
            <div className="did-floating-label-content">
              <input className="did-floating-input" type="text" placeholder=" "></input>
              <label className="did-floating-label">Location</label>
            </div>

            <div className="did-floating-label-content">
              <input className="did-floating-input" type="date" placeholder=" "></input>
              <label className="did-floating-label">Move-in Date</label>
            </div>

            <div className="did-floating-label-content">
              <select className="did-floating-select" onClick={(e) => this.setState({ price: e?.target?.value })}  onChange={(e) => this.setState({ price: e?.target?.value })} value={this.state.price}>
                <option value=""></option>
                <option value="1000">$1000</option>
                <option value="2000">$2000</option>
                <option value="3000">$3000</option>
                <option value="4000">$4000</option>
                <option value="5000">$5000</option>
                <option value="6000">$6000</option>
              </select>
              <label className="did-floating-label">Price</label>
            </div>

            <div className="did-floating-label-content">
              <select className="did-floating-select" onClick={(e) => this.setState({ beds: e?.target?.value })}  onChange={(e) => this.setState({ beds: e?.target?.value })} value={this.state.beds}>
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <label className="did-floating-label">Beds</label>
            </div>

            <div className="did-floating-label-content">
              <select className="did-floating-select" onClick={(e) => this.setState({ pets: e?.target?.value })}  onChange={(e) => this.setState({ pets: e?.target?.value })} value={this.state.pets}>
                <option value=""></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <label className="did-floating-label">Pets</label>
            </div>

            <div className="did-floating-label-content">
              {/* <Button className="did-floating-input" type="submit" placeholder="Search">Search</Button> */}
              {/* <Button variant="contained" color="blue" size="medium">Search</Button> */}
              <Button variant="contained" size="large" style={{width: "90px"}}>
                Search
              </Button>
              {/* <label className="did-floating-label">Search</label> */}
            </div>

          </div>
        </div>

        <div style={{ padding: "10px", borderRadius: "5px" }}>
          <Map
            google={this.props.google}
            zoom={8}
            onClick={(t, map, coord) => {
              // console.log("=====", t, map, coord);
              // console.log("latitude = ", coord.latLng.lat());
              // console.log("longitude = ", coord.latLng.lng());
              this.getGeoLocation(coord.latLng.lat(), coord.latLng.lng());
            }}
            style={{
              width: "40%",
              height: "87%",
              borderRadius: "10px",
            }}
            initialCenter={{ lat: 32.87512, lng: -117.21886 }}
          >
            <Marker position={{ lat: 33.0, lng: -117.0 }} />
          </Map>
        </div>
      </>
    );
  }
}

// export default SearchComponent;
export default GoogleApiWrapper({
  apiKey: "AIzaSyB-vvXcp3O6oPDD_Lgj9Hk4cNxnsdVhx90",
})(SearchComponent);
