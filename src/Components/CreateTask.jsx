import React, { useEffect, useState } from "react";
import "../style.css";
import { listUserFun, createTasksFun } from "./TaskApi";

const CreateTask = ({ isopen, onclose, refreshTasks }) => {
  const [userListData, setUserListData] = useState({ users: [] });
  const [taskCreated, setTaskCreated] = useState(false);
  const [createTaskDetails, setCreateTaskDetails] = useState({
    message: "",
    due_date: "",
    priority: "",
    assigned_to: "",
  });
  const [errors, setErrors] = useState({
    message: "",
    due_date: "",
    priority: "",
    assigned_to: "",
  });

  useEffect(() => {
    if (isopen) {
      listUserFun(setUserListData);
    }
  }, [isopen]);

  if (!isopen) return null;

  function handleGetName(event) {
    setCreateTaskDetails({ ...createTaskDetails, message: event.target.value });
    setErrors({ ...errors, message: "" }); // Clear error when typing
  }

  function handleGetDate(event) {
    const inputDate = event.target.value;
    if (!inputDate) {
      setErrors({ ...errors, due_date: "Due date is " });
      return;
    } else {
      setErrors({ ...errors, due_date: "" }); // Clear error when date is entered
    }

    const dateObj = new Date(inputDate);

    const year = dateObj.getFullYear();
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    let hour = dateObj.getHours();
    const minute = ("0" + dateObj.getMinutes()).slice(-2);
    let second = 11;

    if (hour === 0) hour = 12;
    const formattedTime = `${hour}:${minute}:${second}`;

    // Set due_date in createTaskDetails
    setCreateTaskDetails({
      ...createTaskDetails,
      due_date: `${year}-${month}-${day} ${formattedTime}`,
    });
  }

  function handleGetTaskType(event) {
    setCreateTaskDetails({
      ...createTaskDetails,
      priority: event.target.value,
    });
    setErrors({ ...errors, priority: "" }); // Clear error when selecting priority
  }

  function handleGetUser(event) {
    const selectedIndex = event.target.value;
    setCreateTaskDetails({
      ...createTaskDetails,
      assigned_to: userListData.users[selectedIndex].id, // Assuming each user has an 'id' property
    });
    setErrors({ ...errors, assigned_to: "" }); // Clear error when selecting user
  }

  const handleCreateTask = async (event) => {
    event.preventDefault();

    let formIsValid = true;
    const newErrors = { ...errors };

    if (!createTaskDetails.message.trim()) {
      newErrors.message = "Please fill the message box";
      formIsValid = false;
    } else {
      newErrors.message = "";
    }

    // Validate due_date
    if (!createTaskDetails.due_date.trim()) {
      newErrors.due_date = "Plsease select the Due date ";
      formIsValid = false;
    } else {
      newErrors.due_date = "";
    }

    // Validate priority
    if (!createTaskDetails.priority.trim()) {
      newErrors.priority = "Please select the Priority ";
      formIsValid = false;
    } else {
      newErrors.priority = "";
    }

    // Validate assigned_to
    if (!createTaskDetails.assigned_to.trim()) {
      newErrors.assigned_to = "Please select the Assignee  ";
      formIsValid = false;
    } else {
      newErrors.assigned_to = "";
    }

    setErrors(newErrors);

    if (formIsValid) {
      try {
        await createTasksFun(createTaskDetails);
        setTaskCreated(true);
        setCreateTaskDetails({
          message: "",
          due_date: "",
          priority: "",
          assigned_to: "",
        });
        setTimeout(() => {
          setTaskCreated(false);
          refreshTasks();
          onclose();
        }, 1000);
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  return (
    <div className="modal-main">
      <div className="modal">
        <div className="modal-content">
          <h2>Add New Task</h2>
          <form className="modalForm" onSubmit={handleCreateTask}>
            <div className="modalFormDetails">
              Message
              <textarea
                id="name"
                className="messageMore"
                type="textarea"
                value={createTaskDetails.message}
                onChange={handleGetName}
              />
              {errors.message && <p className="error">{errors.message}</p>}
            </div>

            {/* <div className="modalFormDetails">
              <label>Message</label>
              <input
                id="name"
                value={createTaskDetails.message}
                onChange={handleGetName}
                type="text"
              />
              {errors.message && <p className="error">{errors.message}</p>}
            </div> */}
            <div className="modalFormDetails">
              <label>Date</label>
              <input
                type="datetime-local"
                value={createTaskDetails.due_date}
                onChange={handleGetDate}
              />
              {errors.due_date && <p className="error">{errors.due_date}</p>}
            </div>
            <div className="modalFormDetails">
              <label>Priority</label>
              <select
                value={createTaskDetails.priority}
                onChange={handleGetTaskType}
              >
                <option value="">Choose Task</option>
                <option value="1">Normal Task</option>
                <option value="2">Medium Task</option>
                <option value="3">High Priority Task</option>
              </select>
              {errors.priority && <p className="error">{errors.priority}</p>}
            </div>
            <div className="modalFormDetails">
              <label>Assign To</label>
              <select onChange={handleGetUser}>
                <option value="">Choose the User</option>
                {userListData.users.map((item, index) => (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.assigned_to && (
                <p className="error">{errors.assigned_to}</p>
              )}
            </div>
            <div className="modalFormDetails">
              <button type="submit">Create</button>
              {taskCreated && <p>Task Created!</p>}
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
