import React from "react";
import { Form, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Home = () => {
  return (
    <div className="home">
      <div
        style={{
          fontSize: "55px",
          textAlign: "left",
          marginTop: "100px",
          marginLeft: " 200px",
        }}
      >
        Let's Hunt For Your Dream Residence
      </div>
      <div
        style={{
          fontSize: "20px",
          textAlign: "left",
          marginTop: "20px",
          marginLeft: " 200px",
        }}
      >
        Explore our range of beautiful properties with the addition of separate
        accommodation suitable for you.
      </div>
      <div id="search">
        <div
          style={{
            fontSize: "20px",
            color: "rgba(105, 185, 157, 0.8)",
            textAlign: "left",
            marginTop: "50px",
            marginLeft: " 200px",
          }}
        >
          <b>Rentals Location</b>
        </div>
        <div
          style={{
            fontSize: "20px",
            textAlign: "left",
            marginTop: "20px",
            marginLeft: " 200px",
          }}
        >
          <Form
            name="customized_form_controls"
            layout="inline"
            // onFinish={onSearch}
          >
            <Form.Item name="filter" style={{ width: 500 }}>
              <Input placeholder="Enter an address, city or zip code" />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                style={{
                  color: "white",
                  backgroundColor: "rgba(105, 185, 157, 0.8)",
                }}
                icon={<SearchOutlined />}
              >
                Search
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Home;
