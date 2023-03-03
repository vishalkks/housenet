import React from "react";
import { Form, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import background from "../static/main_home_background.png";

const Home = () => {
  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${background})`,
        height: "100%",
        backgroundSize: "100% 100%",
      }}
    >
      <div
        style={{
          fontSize: "55px",
          textAlign: "left",
          padding: "8% 40% 0% 10%",
        }}
      >
        Let's Hunt For Your Dream Residence
      </div>
      <div
        style={{
          fontSize: "20px",
          textAlign: "left",
          padding: "2% 50% 0% 10%",
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
            padding: "3% 40% 0% 10%",
          }}
        >
          <b>Rentals Location</b>
        </div>
        <div
          style={{
            fontSize: "20px",
            textAlign: "left",
            padding: "1% 40% 0% 10%",
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
