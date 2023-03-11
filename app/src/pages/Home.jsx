import React from "react";
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
    </div>
  );
};

export default Home;
