import React, { useState } from "react";
import { updateTaskFun } from "./TaskApi";
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
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [updateValue, setUpdateValue] = useState({
    message: message,
    due_date: due_date,
    priority: priority,
    assigned_to: assigned_to,
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    setDueDate(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  function handleMessage(e) {
    setUpdateValue({ ...updateValue, message: e.target.value });
  }

  function handleDueDate(e) {
    formatDate(e.target.value);
    setUpdateValue({ ...updateValue, due_date: dueDate });
  }

  function handlePriority(e) {
    setUpdateValue({ ...updateValue, priority: e.target.value });
  }

  function handleAssignName(e) {
    setUpdateValue({ ...updateValue, assigned_to: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTaskFun(updateValue, id);
    } catch (error) {
      console.log(error, "failed in user edit");
    }
    setIsEdit(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className="modal-main">
      <div class="modal">
        <div className="modal-content">
          <h2>View/Edit Task</h2>
          <form className="modalForm" onSubmit={handleSubmit}>
            <div className="modalFormDetails">
              <span>Message</span>
              <div>
                {isEdit ? (
                  <input
                    type="text"
                    value={updateValue.message || message}
                    onChange={handleMessage}
                  />
                ) : (
                  <span>{message}</span>
                )}
              </div>
            </div>

            <div className="modalFormDetails">
              <span>Due Date</span>
              <div>
                {isEdit ? (
                  <input
                    type="datetime-local"
                    value={updateValue.due_date || due_date}
                    onChange={handleDueDate}
                  />
                ) : (
                  <span>{due_date}</span>
                )}
              </div>
            </div>

            <div className="modalFormDetails">
              <span>Created Date</span>
              <div>
                <span>{created_on}</span>
              </div>
            </div>

            <div className="modalFormDetails">
              <span>Priority</span>
              <div>
                {isEdit ? (
                  <input
                    type="number"
                    value={updateValue.priority || priority}
                    onChange={handlePriority}
                  />
                ) : (
                  <span>{priority}</span>
                )}
              </div>
            </div>

            <div>
              <span>Assigned Name</span>
              <div>
                {isEdit ? (
                  <input
                    type="text"
                    value={updateValue.assigned_to}
                    onChange={handleAssignName}
                  />
                ) : (
                  <span>{assigned_to}</span>
                )}
              </div>
            </div>

            <div className="modalFormDetails">
              <button className="close" onClick={onClose}>
                Close
              </button>
              {/* <img
                src={editIcon}
                alt="editIcon"
                onClick={() => setIsEdit(true)}
              /> */}
              <button onClick={() => setIsEdit(true)}>Edit</button>
              <button type="submit">Update </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifyTask;
