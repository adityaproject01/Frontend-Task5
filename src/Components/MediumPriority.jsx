import React, { useEffect, useState } from "react";
import deleteIcon from "../assets/icons/trash-delete-bin.svg";
import viewmoreIcon from "../assets/icons/chevron-right.svg";
import ModifyTask from "./ModifyTask";
import { deleteTaskFun } from "./TaskApi";

const MediumPriority = ({ listTaskData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (listTaskData?.tasks) {
      setTasks(listTaskData.tasks.filter((item) => item.priority === 2));
    } else {
      setTasks([]);
    }
  }, [listTaskData]);

  const openModal = (index) => {
    setSelectedTaskIndex(index);
    setIsModalOpen(true);
  };

  const deleteItem = (taskId) => {
    deleteTaskFun(taskId).then(() => {
      const updatedTasks = tasks.filter((item) => item.id !== taskId);
      setTasks(updatedTasks);
    });
  };

  const onClose = () => {
    setIsModalOpen(false);
    setSelectedTaskIndex(null);
  };

  let sequentialNumber = 0;
  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((item, index) => (
          <div key={index + 1} className="userDetailes">
            <div className="userDetailsSl">{++sequentialNumber}</div>
            <div className="userDetailsMessage">
              <p
                style={{
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
              >
                {item.message}
              </p>
            </div>
            <div>
              <button className="viewMoreBtn" onClick={() => openModal(index)}>
                View <img src={viewmoreIcon} alt="viewmoreIcons" />
              </button>
              {selectedTaskIndex === index && (
                <ModifyTask
                  key={index}
                  isModalOpen={isModalOpen}
                  message={item.message}
                  due_date={item.due_date}
                  created_on={item.created_on}
                  priority={item.priority}
                  assigned_to={item.assigned_to}
                  assigned_from={item.assigned_from}
                  id={item.id}
                  onClose={onClose}
                />
              )}
            </div>
            <div className="userDetailsDelete">
              <img
                src={deleteIcon}
                onClick={() => deleteItem(item.id)}
                alt="deleteIcon"
              />
            </div>
          </div>
        ))
      ) : (
        <p>No high priority tasks found.</p>
      )}
    </div>
  );
};

export default MediumPriority;
