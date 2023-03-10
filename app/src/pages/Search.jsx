import React from "react";
import { Component } from "react";
import {
  Button,
  message,
  Row,
  Col,
  Input,
  Select,
  Card,
  Typography,
} from "antd";
import objectGetServiceComponent from "../api/GetServiceComponent";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import axios from "axios";
import "../searchbar.css";
import FloatLabel from "./FloatLabel";
import House from "../static/1.jpg";
import searchdata from "../data/searchdata.json";

const { Option } = Select;
const { Meta } = Card;
const { Title } = Typography;

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredListing: searchdata,
      loading: true,
      location: {
        address: "",
        zip_code: "",
      },
      rent: "",
      beds: "",
      pets: "",
      status: "2",
      moveInDate: "",
    };
    this.retrieveBeanService = this.retrieveBeanService.bind(this);
    this.handleRetriveBeanSuccessfully =
      this.handleRetriveBeanSuccessfully.bind(this);
    this.handleRetriveBeanError = this.handleRetriveBeanError.bind(this);
    this.handleSearch = this.onClickSearch.bind(this);
    this.handleRetriveHousesSuccessfully =
      this.handleRetriveHousesSuccessfully.bind(this);
    this.exportData = this.exportData.bind(this);
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
    response["data"]["results"].forEach((result) => {
      // console.log(result);
      result.address_components.forEach((component) => {
        if (component?.types.includes("postal_code")) {
          code = component.long_name;
        }
      });
    });
    console.log(code);

    this.setState({
      location: {
        address: response["data"]["plus_code"]["compound_code"],
        zip_code: code,
      },
    });
  }

  onClickSearch() {
    objectGetServiceComponent
      .getSearchResponse()
      .then((response) => this.handleRetriveHousesSuccessfully(response))
      .catch((error) => this.handleRetriveHousesError(error));
  }

  exportData(data) {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "searchdata.json";
    link.click();
  }

  handleRetriveHousesSuccessfully(response) {
    message.success("Fetch houses successful!");
    this.setState({
      loading: false,
    });
    // console.log("this.state is:", this.state);
    // this.exportData(JSON.parse(response.data));

    let filteredData = JSON.parse(response.data);
    console.log("filtered data initial:", filteredData);

    if (this.state.location.zip_code !== "") {
      filteredData = filteredData.filter(
        (d) => d.zip_code === this.state.location.zip_code
      );
    }
    if (this.state.rent !== "") {
      filteredData = filteredData.filter((d) => d.rent <= this.state.rent);
    }
    if (this.state.beds !== "") {
      filteredData = filteredData.filter(
        (d) => d.beds === `${this.state.beds} Beds`
      );
    }
    if (this.state.pets !== "") {
      filteredData = filteredData.filter(
        (d) => d.pets === (this.state.pets === "no" ? "No Pets" : "Allow Pets")
      );
    }
    if (this.state.status === "1") {
      filteredData = filteredData.filter((d) => d.status === this.state.status);
    }

    console.log("filteredData", filteredData);
    this.setState({
      filteredListing: filteredData,
    });
  }

  handleRetriveHousesError(error) {
    message.error("Fetch search houses failed.");
    this.setState({
      loading: false,
    });
    console.error(error);
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
                } /*onChange={e => setFirstName(e.target.value)} */
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
            <FloatLabel label="rent Range" name="rent" value={this.state.rent}>
              <Select
                showSearch
                style={{ width: "100%" }}
                onChange={(value) => this.setState({ rent: value })}
                value={this.state.rent}
                // mode="tags"
              >
                <Option value=""></Option>
                <Option value="2000">$2000</Option>
                <Option value="3000">$3000</Option>
                <Option value="4000">$4000</Option>
                <Option value="5000">$5000</Option>
                <Option value="7000">$7000</Option>
                <Option value="9000">$9000</Option>
                <Option value="10000000">Unlimited</Option>
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
            <FloatLabel label="Status" name="status" value={this.state.status}>
              <Select
                showSearch
                style={{ width: "100%" }}
                onChange={(value) => this.setState({ status: value })}
                value={this.state.status}
                // mode="tags"
              >
                <Option value="1">Available</Option>
                <Option value="2">All</Option>
              </Select>
            </FloatLabel>
          </Col>
          <Col span={4}>
            <Button type="primary" onClick={() => this.onClickSearch()}>
              Search
            </Button>
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
                  <Link to="/detailed">
                    <Card
                      hoverable
                      style={{ width: 300 }}
                      cover={<img alt="example" src={House} />}
                      actions={[
                        <span>
                          <i className="fa-solid fa-bed" /> {listing.beds} Beds
                        </span>,
                        <span>
                          <i className="fa-solid fa-bath" /> {listing.baths}{" "}
                          Baths
                        </span>,
                        <span>
                          <i className="fa-solid fa-paw" />{" "}
                          {listing.status === "1" ? "Available" : "Rented"}
                        </span>,
                      ]}
                    >
                      <Title level={4} style={{ color: "#1677ff" }}>
                        {listing.rent + "$/month"}
                      </Title>
                      <Meta
                        title={listing.city}
                        description={listing.address}
                      />
                    </Card>
                  </Link>
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
