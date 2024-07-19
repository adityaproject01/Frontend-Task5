import React, { useEffect, useState } from "react";
import "../style.css";
import { listUserFun, createTasksFun } from "./TaskApi";

const CreateTask = ({ isopen, onclose }) => {
  const [userListData, setUSerListData] = useState([]);
  const [dueDate, setDueDate] = useState("");

  const [createTaskDetails, setCreateTaskDetails] = useState({
    message: "",
    due_date: "",
    priority: "",
    assigned_to: "",
  });

  useEffect(() => {
    if (isopen) {
      listUserFun(setUSerListData);
    }
  }, [isopen, createTaskDetails]);
  if (!isopen) return null;

  function handleGetName(event) {
    setCreateTaskDetails({ ...createTaskDetails, message: event.target.value });
  }
  function handleGetDate(event) {
    const inputDate = event.target.value;
    if (!inputDate) return;

    const dateObj = new Date(inputDate);

    const year = dateObj.getFullYear();
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    let hour = dateObj.getHours();
    const minute = ("0" + dateObj.getMinutes()).slice(-2);
    let second = 11;
    // let period = "AM";
    // if (hour >= 12) {
    //   period = "PM";
    //   if (hour > 12) hour -= 12;
    // }
    if (hour === 0) hour = 12;
    const formattedTime = `${hour}:${minute}:${second}`;
    setDueDate(`${year}-${month}-${day} ${formattedTime}`);
    console.log(dueDate, "dfd");
    setCreateTaskDetails({
      ...createTaskDetails,
      due_date: dueDate,
    });
  }
  function handleGetTaskType(event) {
    setCreateTaskDetails({
      ...createTaskDetails,
      priority: event.target.value,
    });
  }
  function handleGetUser(event) {
    setCreateTaskDetails({
      ...createTaskDetails,
      assigned_to: event.target.value,
    });
  }
  const handleCreateTask = async (event) => {
    event.preventDefault();
    try {
      await createTasksFun(createTaskDetails);
      setCreateTaskDetails({
        message: "",
        due_date: "",
        priority: "",
        assigned_to: "",
      });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="modal-main">
      <div class="modal">
        <div className="modal-content">
          <h2>Add New Task</h2>
          <form className="modalForm" onSubmit={handleCreateTask}>
            <div className="modalFormDetails">
              <label>Name</label>
              <input id="name" onChange={handleGetName} type="text" />
            </div>
            <div className="modalFormDetails">
              <label>Date</label>
              <input type="datetime-local" onChange={handleGetDate} />
            </div>
            <div className="modalFormDetails">
              <label>Priority</label>
              <select type="text" onChange={handleGetTaskType}>
                <option disabled>Choose Task</option>
                <option value="1">Normal Task</option>
                <option value="2">Medium Task</option>
                <option value="3">High Priority Task</option>
              </select>
            </div>
            <div className="modalFormDetails">
              <label>User</label>
              <select onChange={handleGetUser}>
                <option>Choose the USer</option>
                {userListData?.users?.map((item, index) => (
                  <option key={index} value={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modalFormDetails">
              <button>Create</button>
              <button className="close" onClick={onclose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
