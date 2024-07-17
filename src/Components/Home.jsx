import React from "react";
import "../style.css";
import dashboardIcon from "../assets/icons/dashboard.svg";
import taskIcon from "../assets/icons/task.svg";
import notoficationIcon from "../assets/icons/notifications-outline.svg";
import userIcon from "../assets/icons/profile.jpg";
import dropdownIcon from "../assets/icons/caret-square-down.svg";
const Home = () => {
  return (
    <div className="main">
      <div className="container">
        <div className="left">
          <div>
            <p>Aditya</p>
          </div>
          <div className="menus">
            <div href="#" className="btn iconSet">
              <img src={dashboardIcon} alt="dashboardIcon" />
              <p>Dashboard</p>
            </div>
            <div href="#" className="btn active iconSet ">
              <img src={taskIcon} alt="dashboardIcon" />
              <p>My Task</p>
            </div>
            <div href="#" className="btn iconSet ">
              <img src={dashboardIcon} alt="dashboardIcon" />
              <p>Dashboard</p>
            </div>
          </div>
        </div>
        <div className="rightContainer">
          <div className="rightContainer1">
            <div className="rightContainer1Left">
              <p>My Task</p>
              <input type="text" className="searchFiled" />
            </div>
            <div className="rightContainer1Right">
              <img src={notoficationIcon} alt="notofocation icon" />
              <img src={userIcon} className="profile" alt="notofocation icon" />
              <span>Aditya</span>
              <img src={dropdownIcon} alt="notofocation icon" />
            </div>
          </div>
          <div className="rightContainer2">
            <div className=""></div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
