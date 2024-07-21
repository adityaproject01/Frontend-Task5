import React, { useEffect, useState } from "react";
import { updateTaskFun } from "./TaskApi";
import editIcon from "../assets/icons/icons8-edit.svg";
import { listUserFun } from "./TaskApi";
import updatedIcon from "../assets/icons/updated.png";
import "../style.css";

const ModifyTask = ({
  isModalOpen,
  onClose,
  message,
  due_date,
  created_on,
  priority,
  assigned_to,
  id,
  refreshTasks,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [userListData, setUserListData] = useState(null);
  const [updateTask, setUpdated] = useState(false);
  const [getmessage, setGetmessage] = useState(message);
  const [getdue_date, setGetdue_date] = useState(due_date);
  const [getpriority, setGetpriority] = useState(priority);
  const [getassigned_to, setGetassigned_to] = useState(assigned_to);

  const [updateValue, setUpdateValue] = useState({
    message: getmessage,
    due_date: getdue_date,
    priority: getpriority,
    assigned_to: getassigned_to,
  });

  useEffect(() => {
    listUserFun(setUserListData);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  function handleMessage(e) {
    setGetmessage(e.target.value);
  }

  function handleDueDate(e) {
    setGetdue_date(e.target.value);
  }

  function handlePriority(e) {
    setGetpriority(e.target.value);
  }

  function handleAssignName(e) {
    setGetassigned_to(e.target.value);
  }
  function handleUpdated() {
    setTimeout(() => {
      setUpdated(true);
      onClose();
    }, 3000);
  }
  useEffect(() => {
    setUpdateValue({
      message: getmessage,
      due_date: getdue_date,
      priority: getpriority,
      assigned_to: getassigned_to,
    });
  }, [getmessage, getdue_date, getpriority, getassigned_to]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTaskFun(updateValue, id);
      refreshTasks();
    } catch (error) {
      console.log(error, "failed in user edit");
    }
    setUpdated(true);
    refreshTasks();
    setIsEdit(false);
  };

  function handleSelectedPriority(value) {
    switch (value) {
      case 1:
        return <option value={1}>Normal Task</option>;
      case 2:
        return <option value={2}>Medium Task</option>;
      case 3:
        return <option value={3}>High Priority Task</option>;
      default:
        return "No Data Found";
    }
  }

  if (!isModalOpen) return null;

  return (
    <div className="modal-main">
      <div className="modal">
        <div className="modal-content">
          {!updateTask ? (
            <>
              <h2>View/Edit Task</h2>
              <form className="modalForm" onSubmit={handleSubmit}>
                <div className="modalFormDetails">
                  Message
                  <div className="">
                    {isEdit ? (
                      <textarea
                        className="messageMore"
                        type="textarea"
                        value={getmessage}
                        onChange={handleMessage}
                      />
                    ) : (
                      <div className="">{message}</div>
                    )}
                  </div>
                </div>

                <div className="modalFormDetails">
                  <p>Due Date</p>
                  <div>
                    {isEdit ? (
                      <input
                        type="datetime-local"
                        value={formatDate(getdue_date)}
                        onChange={handleDueDate}
                      />
                    ) : (
                      <span>{due_date}</span>
                    )}
                  </div>
                </div>

                <div className="modalFormDetails">
                  <p>Created On</p>
                  <div>
                    <span>{created_on}</span>
                  </div>
                </div>

                <div className="modalFormDetails">
                  <p>Priority</p>
                  <div>
                    {isEdit ? (
                      <select value={getpriority} onChange={handlePriority}>
                        <option disabled>Choose Task</option>
                        <option value="1">Normal Task</option>
                        <option value="2">Medium Task</option>
                        <option value="3">High Priority Task</option>
                      </select>
                    ) : (
                      <span>{handleSelectedPriority(priority.priority)}</span>
                    )}
                  </div>
                </div>

                <div className="modalFormDetails">
                  <p>Assigned To</p>
                  {isEdit ? (
                    <div>
                      <select
                        value={getassigned_to}
                        onChange={handleAssignName}
                      >
                        <option disabled>Choose the user</option>
                        {userListData &&
                          userListData.users.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  ) : (
                    <>
                      <span>{assigned_to}</span>
                    </>
                  )}
                </div>

                <div className="modalFormDetailsBtn">
                  <button className="closeBtn" onClick={onClose}>
                    Close
                  </button>
                  <div className="editDetails" onClick={() => setIsEdit(true)}>
                    <img src={editIcon} alt="editIcon" />
                    <span>Edit</span>
                  </div>
                  <button
                    className="updateBtn"
                    type="submit"
                    onClick={handleUpdated}
                  >
                    Update
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="updatedTask">
                Update Task Successfully{" "}
                <img src={updatedIcon} alt="update logo" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModifyTask;
