import React, { useState } from "react";
import deleteIcon from "../assets/icons/trash-delete-bin.svg";
import ModifyTask from "./ModifyTask";
import { deleteTaskFun } from "./TaskApi";
const HighPriority = (listTaskData) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  // const [selectedDeleteItem, setSelectedDeleteItem] = useState(null);
  const openModal = (index) => {
    setSelectedTaskIndex(index);
    setIsModalOpen(true);
  };
  function deleteItem(index) {
    // setSelectedDeleteItem(index);
    deleteTaskFun(index);
  }
  const onClose = () => {
    setIsModalOpen(false);
    setSelectedTaskIndex(null);
  };
  return (
    <div>
      {listTaskData?.listTaskData?.tasks?.map((item, index) => {
        if (item.priority === 3) {
          return (
            <div key={index} className="userDetailes">
              <p>{item.assigned_to}</p>
              {console.log(item)}
              {/* <p>Due Date: {item.due_date}</p> */}
              <p> {item.message}</p>
              <p>
                <button onClick={() => openModal(index)}>ViewMore</button>
                {selectedTaskIndex === index && (
                  <ModifyTask
                    key={index}
                    isModalOpen={isModalOpen}
                    message={item.message}
                    due_date={item.due_date}
                    created_on={item.created_on}
                    priority={item.priority}
                    assigned_to={item.assigned_to}
                    id={item.id}
                    onClose={onClose}
                  />
                )}
              </p>
              <p>
                <img
                  src={deleteIcon}
                  onClick={() => deleteItem(item.id)}
                  alt="deleteIcon"
                />
              </p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default HighPriority;
