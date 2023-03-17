/*
 * Filename: Search.jsx
 * 
 * This file defines map functionality, Search bar, and all the individual listings. 
 * The map is displayed using geolocation API that fetches address based on latitude and longitude.
 * Search bar filters the data based on Location (Postal Code, Rent in ($), Number of Beds, and Status (Available and All))
 * Individual listing shows listing which is fetched using the API. 
 * 
 */
import React from "react";
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
import { Link } from "react-router-dom";

import objectGetServiceComponent from "../api/GetServiceComponent";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import axios from "axios";
import "../searchbar.css";
import FloatLabel from "./FloatLabel";
import searchdata from "../data/searchdata.json";
import { useState } from "react";
import { useEffect } from "react";

const { Option } = Select;
const { Meta } = Card;
const { Title } = Typography;

function SearchComponent(props) {
  const [listing, setListing] = useState(searchdata);
  const [filteredListing, setFilteredListing] = useState(searchdata);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [rent, setRent] = useState(null);
  const [beds, setBeds] = useState(null);
  const [pets, setPets] = useState(null);
  const [status, setStatus] = useState("");
  const [moveInDate, setmoveInDate] = useState("");

  // Fetches address using latitude and longitude by using geolocation API which is a Google Map API.
  // Sets the postal code using the address that was fecthed.
  const getGeoLocation = async (latitude, longitude) => {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB-vvXcp3O6oPDD_Lgj9Hk4cNxnsdVhx90`);
    console.log(response);
    let code = ""; 
    response["data"]["results"].forEach((result) => {
      result.address_components.forEach((component) => {
        if (component?.types.includes("postal_code")) {
          code = component.long_name;
        }
      });
    });

    // Updates address
    setAddress(response?.data?.results[0]?.formatted_address);

    // Updates postal code
    setPostalCode(code);
  }


  //Retrives all the listings from the database
  async function getListing() {
    objectGetServiceComponent
      .getSearchResponse()
      .then((response) => {
        setListing(JSON.parse(response.data));
        setLoading(false);
      })
      .catch((error) => getHouseListingError(error));
  }

  useEffect(() => {
    getListing();
  }, [])

  // Performs search based on the selected parameters such as Postal Code, Rent, Beds, and Status
  const onClickSearch = (response) => {
    let filteredHouseListing = listing;
    console.log("filtered data initial:", filteredHouseListing);

    if (postalCode !== "") {
      filteredHouseListing = filteredHouseListing.filter((listing) => listing.zip_code === postalCode);
    }

    if (rent) {
      filteredHouseListing = filteredHouseListing.filter((listing) => listing.rent <= rent);
    }

    if (beds) {
      filteredHouseListing = filteredHouseListing.filter((listing) => listing.beds === beds);
    }
    
    if (pets) {
      filteredHouseListing = filteredHouseListing.filter((listing) => listing.pets === (pets === "no" ? "No Pets" : "Allow Pets"));
    }
    
    if (status !== "") {
      filteredHouseListing = filteredHouseListing.filter((listing) => listing.status === status);
    }

    console.log("filteredHouseListing", filteredHouseListing);
    setFilteredListing(filteredHouseListing);
  }

  //Catches an Error when the House API fails
  const getHouseListingError = (error) => {
    message.error("Fetch search houses failed.");
    setLoading(false);
    console.error(error);
  }

  //Updates the Address and the postal code when the address changes
  const handleLocationChange = (e) => {
    setAddress(e?.target?.value);
    setPostalCode(e?.target?.value);
  }

  return (
    <>
      {/* Search Bar Options: Location, Move-in date, Rent, Beds, and Status */}
      <Row justify="center" className="searchbar">
        <Col span={4}>
          <FloatLabel label="Location" name="location" value={address}>
            <Input 
              className="float-input" 
              value={address} 
              onChange={handleLocationChange} 
            />
          </FloatLabel>
        </Col>
        <Col span={4}>
          <FloatLabel name="move-in-date" value={moveInDate}>
            <Input 
              className="float-input"
              placeholder="Move-in Date" 
              type="date" 
              value={moveInDate}
              onChange={(e) => setmoveInDate(e?.target?.value)}
            />
          </FloatLabel>
        </Col>
        <Col span={4}>
          <FloatLabel label="Rent Range (<=)" name="rent" value={rent}>
            <Select
              showSearch
              style={{ width: "100%" }}
              onChange={(value) => setRent(value ? parseInt(value) : null)}
              value={rent}
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
          <FloatLabel label="Beds" name="beds" value={beds}>
            <Select
              showSearch
              style={{ width: "100%" }}
              onChange={(value) => setBeds(value ? parseInt(value) : null)}
              value={beds}
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
          <FloatLabel label="Status" name="status" value={status}>
            <Select
              showSearch
              style={{ width: "100%" }}
              onChange={(value) => setStatus(value)}
              value={status}
            >
              <Option value=""></Option>
              <Option value="1">Available</Option>
              <Option value="2">All</Option>
            </Select>
          </FloatLabel>
        </Col>
        <Col span={4}>
          <Button type="primary" onClick={() => onClickSearch()}>
            Search
          </Button>
        </Col>
      </Row>
      
      {/* Map Functionality: Displays Map and the initial marker */}
      <Row justify="space-between" className="row">
        <Col span={12} className="col"  style={{ minHeight: "75vh" }}>
          <Map
            google={props.google}
            zoom={8}
            onClick={(t, map, coord) => {
              getGeoLocation(coord.latLng.lat(), coord.latLng.lng());
            }}
            style={{
              width: "95%",
              height: "100%",
              borderRadius: "10px",
            }}
            initialCenter={{ lat: 32.87512, lng: -117.21886 }}
          >
            <Marker position={{ lat: 33.0, lng: -117.0 }} />
          </Map>
        </Col>

        {/* Individual Listing: Displays individual listings */}
        <Col span={12} className="col">
          <Row wrap={true}>
            {filteredListing.length > 0 ? filteredListing.map((listing, idx) => (
              <Col span={12} className="card-col" key={idx}>
                <Link to={`/detailed/${listing.id}`} actions="replace" style={{textDecoration: "none"}}>
                  <Card
                    hoverable
                    style={{ width: 300 }}
                    cover={<img alt={listing.city} width={300} height={184} src={require('../static/'+listing.id+'.jpg')} />}
                    actions={[
                      <span>
                        <i className="fa-solid fa-bed" /> {listing.beds}
                      </span>,
                      <span>
                        <i className="fa-solid fa-bath" /> {listing.baths}
                      </span>,
                      <span>
                        <i className="fa-solid fa-house" />{" "}
                        {listing.status === "1" ? "Available" : "Rented"}
                      </span>,
                    ]}
                    >
                    <Title level={4} style={{ color: "#1677ff" }}>
                      {"$" + listing.rent + "/month"}
                    </Title>
                    <Meta title={listing.city} description={listing.address} />
                  </Card>
                  </Link>
                  {/* . */}
              </Col>
            )) : <Row type="flex" justify="center" align="middle" style={{height: "75vh", width: "100%"}}>
                    <Title>Oops, no listing found!!!</Title>
                  </Row>
             }
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB-vvXcp3O6oPDD_Lgj9Hk4cNxnsdVhx90",
})(SearchComponent);
