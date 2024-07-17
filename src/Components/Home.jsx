import React from "react";
import "../style.css";
import dashboard from "../assets/icons/dashboard.svg";
const Home = () => {
  return (
    <div className="main">
      <div className="container">
        <div className="left">
          <p>Aditya</p>
          <div className="menus">
            <div href="#" className="btn iconSet">
              <img src={dashboard} alt="dashboardIcon" />
              <p>Dashboard</p>
            </div>
            <div href="#" className="btn active iconSet ">
              <img src={dashboard} alt="dashboardIcon" />
              <p>Dashboard</p>
            </div>
            <div href="#" className="btn iconSet ">
              <img src={dashboard} alt="dashboardIcon" />
              <p>Dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
