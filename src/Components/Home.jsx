import React, { useEffect, useState } from "react";
import "../style.css";
import { listTaskFun } from "./TaskApi";

import dashboardIcon from "../assets/icons/dashboard.svg";
import taskIcon from "../assets/icons/task.svg";
import notoficationIcon from "../assets/icons/notifications-outline.svg";
import userIcon from "../assets/icons/profile.jpg";
import dropdownIcon from "../assets/icons/caret-square-down.svg";
import clientsIcon from "../assets/icons/users.svg";

import HighPriority from "./HighPriority";
import NormalTask from "./NormalTask";
import MediumPriority from "./MediumPriority";
import CreateTask from "./CreateTask";
const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listTaskData, setListTaskData] = useState(null);
  const [toggleBtn, setToggleBtn] = useState(false);
  useEffect(() => {
    listTaskFun(setListTaskData);
  }, []);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const refreshTaskList = () => {
    listTaskFun(setListTaskData);
  };
  function handleToggleOn() {
    setToggleBtn(true);
  }
  function handleToggleOff() {
    setToggleBtn(false);
  }
  return (
    <div className="main">
      <div className="container">
        <button
          className="toggleBtn"
          style={{ zIndex: "1px" }}
          onClick={handleToggleOn}
        >
          Toggle
        </button>
        {toggleBtn ? (
          <div className="left">
            <div>
              <button onClick={handleToggleOff}>CloseToggle</button>
              <p>Aditya</p>
            </div>
            <div className="rightContainer1sm">
              <div className="rightContainer1Rightsm">
                <img src={notoficationIcon} alt="notofocation icon" />
                <img
                  src={userIcon}
                  className="profilesm"
                  alt="notofocation icon"
                />
                <span>Aditya</span>
                <img src={dropdownIcon} alt="notofocation icon" />
              </div>
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
                <img src={clientsIcon} alt="dashboardIcon" />
                <p>Clients</p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
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
            <div className="box4">
              <button onClick={openModal}>Create Task</button>
              <CreateTask
                isopen={isModalOpen}
                onclose={closeModal}
                refreshTasks={refreshTaskList}
              />
            </div>

            <div className="boxs">
              <div className="box1">
                <p style={{ padding: "5px" }}>Priority Task</p>
                <HighPriority
                  listTaskData={listTaskData}
                  refreshTasks={refreshTaskList}
                />
              </div>
              <div className="box2">
                <p style={{ padding: "5px" }}>Medium Task</p>
                <MediumPriority
                  listTaskData={listTaskData}
                  refreshTasks={refreshTaskList}
                />
              </div>
              <div className="box3">
                <p style={{ padding: "5px" }}>Normal Task</p>
                <NormalTask
                  listTaskData={listTaskData}
                  refreshTasks={refreshTaskList}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
