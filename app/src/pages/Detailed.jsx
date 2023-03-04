import React, { useState } from "react";
import { Col, Row, Carousel, Button, Space, Rate, Statistic } from "antd";
import { DollarCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Detailed1 from "../static/detailed1.png";
import Detailed2 from "../static/detailed2.png";
import Detailed3 from "../static/detailed3.png";
import Detailed4 from "../static/detailed4.png";
import Detailed5 from "../static/detailed5.png";

const DetailedPage = ({ google }) => {
  const [infoList, setInfoList] = useState({
    rent: 1000,
    beds: 4,
    baths: 2,
    sq_ft: 575,
    address: "424 15th St",
    city: "San Diego",
    state: "CA",
    zip_code: "92101",
    other_information:
      "The largest neighborhood in Downtown San Diego, East Village encompasses 130 blocks with a slew of restaurants, boutiques, bars, museums, hotels, music venues, and art galleries. As a resident of this area, you will be in the center of everything. Located east of the bustling Gaslamp Quarter and southeast of historic Cortez Hill, this neighborhood is famous for containing Petco Park, the home field of the San Diego Padres. East Village also borders the sprawling Balboa Park to the north. ",
  });

  return (
    <Row>
      <Col span={12}>
        <Carousel
          autoplay
          style={{
            padding: "15% 5% 0% 10%",
          }}
          pauseOnHover={true}
          pauseOnDotsHover={true}
        >
          <img src={Detailed1} alt="room" />
          <img src={Detailed2} alt="room" />
          <img src={Detailed3} alt="room" />
          <img src={Detailed4} alt="room" />
          <img src={Detailed5} alt="room" />
        </Carousel>
      </Col>

      <Col span={12}>
        <div
          className="information"
          style={{
            height: "100%",
            padding: "7.5% 5% 0% 5%",
            fontSize: "14px",
          }}
        >
          <h1>Pinnacle on The Park</h1>

          <Rate allowHalf defaultValue={4.5} />

          <div style={{ display: "flex" }}>
            <div
              className="key-infor"
              style={{
                padding: "1% 3% 0% 0%",
              }}
            >
              <h3>Key Info</h3>
              <div>
                <DollarCircleOutlined />
                &nbsp;
                {infoList.rent}&nbsp;/&nbsp;Month
              </div>

              <div>
                <EnvironmentOutlined />
                &nbsp;
                {infoList.address},&nbsp;{infoList.city},&nbsp;{infoList.state}
                ,&nbsp;{infoList.zip_code}
              </div>
            </div>

            <div className="unit-details">
              <h3>Unit Details</h3>
              <div className="unit-details-info" style={{ display: "flex" }}>
                <Space wrap size="small">
                  <Statistic
                    valueStyle={{ fontSize: "14px" }}
                    title="Bedrooms"
                    value={infoList.beds}
                  />

                  <Statistic
                    valueStyle={{ fontSize: "14px" }}
                    title="Bathrooms"
                    value={infoList.baths}
                  />

                  <Statistic
                    valueStyle={{ fontSize: "14px" }}
                    title="Square Feet"
                    value={infoList.sq_ft}
                  />
                </Space>
              </div>
            </div>
          </div>

          <div className="buttons">
            {/* <Space wrap size="large"> */}
            <Button style={{ margin: "0" }} type="primary">
              Message the Landlord
            </Button>
            <Button type="primary">Add to Wishlist</Button>
            {/* </Space> */}
          </div>
          <div
            className="rental-location"
            style={{
              padding: "1% 0%",
            }}
          >
            <h3>Rental Location</h3>
            <Map
              google={google}
              containerStyle={{
                height: "25vh",
                width: "60%",
                position: "relative",
              }}
              initialCenter={{ lat: 32.87512, lng: -117.21886 }}
              zoom={8}
            >
              <Marker position={{ lat: 33.0, lng: -117.0 }} />
            </Map>
          </div>

          <div
            className="description"
            style={{
              padding: "1% 0%",
            }}
          >
            <h3>Description</h3>
            <div style={{ textAlign: "justify" }}>
              {infoList.other_information}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

// export default DetailedPage;
export default GoogleApiWrapper({
  apiKey: "AIzaSyB-vvXcp3O6oPDD_Lgj9Hk4cNxnsdVhx90", // google maps key
  libraries: ["places"],
})(DetailedPage);
