import React, { useState } from "react";
import deleteIcon from "../assets/icons/trash-delete-bin.svg";
import viewmoreIcon from "../assets/icons/chevron-right.svg";

import ModifyTask from "./ModifyTask";
import { deleteTaskFun } from "./TaskApi";
const MediumPriority = (listTaskData) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const openModal = (index) => {
    setSelectedTaskIndex(index);
    setIsModalOpen(true);
  };
  function deleteItem(index) {
    deleteTaskFun(index);
  }
  const onClose = () => {
    setIsModalOpen(false);
    setSelectedTaskIndex(null);
  };
  let sequentialNumber = 0;
  return (
    <div>
      {listTaskData?.listTaskData?.tasks?.map((item, index) => {
        if (item.priority === 2) {
          sequentialNumber++;
          return (
            <div key={index + 1} className="userDetailes">
              <div className="userDetailesSl">{sequentialNumber}</div>
              <div className="userDetailsMessage">
                {console.log(item)}
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
                <button
                  className="viewMoreBtn"
                  onClick={() => openModal(index)}
                >
                  View
                  <img src={viewmoreIcon} alt="viewmoreIcons" />
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
                    id={item.id}
                    onClose={onClose}
                  />
                )}
              </div>
              <div className="userDetailesDelete">
                <img
                  src={deleteIcon}
                  onClick={() => deleteItem(item.id)}
                  alt="deleteIcon"
                />
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default MediumPriority;
