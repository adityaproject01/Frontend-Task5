import axios from "axios";
import {
  listUserKey,
  apiKey,
  createTaskApi,
  listTaskApi,
  deleteTaskApi,
  updateTaskApi,
} from "./TaskUrl";
async function getDetails(apiToGetDetails, setData) {
  try {
    const response = await axios.get(apiToGetDetails, {
      headers: {
        AuthToken: apiKey,
      },
    });
    setData(response.data);
    // return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
async function postDetails(apiToGetDetails, userValue) {
  try {
    const response = await axios.post(apiToGetDetails, userValue, {
      headers: {
        "Content-Type": "multipart/form-data",
        AuthToken: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting details:", error);
    throw error;
  }
}

async function updateDetails(apiToGetDetails, userDetail, taskId) {
  try {
    const formData = new FormData();
    if (userDetail) {
      Object.keys(userDetail).forEach((key) => {
        formData.append(key, userDetail[key]);
      });
    }
    formData.append("taskid", taskId);
    const config = {
      headers: {
        AuthToken: apiKey,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post(apiToGetDetails, formData, config);
    return response.data;
  } catch (error) {
    console.error("Error updating details:", error);
    return {
      status: "error",
      error: "Failed to update details. Please try again later.",
    };
  }
}

async function deleteTask(deleteTaskApi, taskId) {
  try {
    const formData = new FormData();
    formData.append("taskid", taskId);

    const response = await axios.post(deleteTaskApi, formData, {
      headers: {
        AuthToken: apiKey,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}

function listUserFun(setUSerListData) {
  getDetails(listUserKey, setUSerListData);
}
function createTasksFun(createTaskDetails) {
  postDetails(createTaskApi, createTaskDetails);
}

function deleteTaskFun(deleteId) {
  return deleteTask(deleteTaskApi, deleteId);
}

function listTaskFun(setListTaskData) {
  getDetails(listTaskApi, setListTaskData);
}

function updateTaskFun(updateValue, taskId) {
  updateDetails(updateTaskApi, updateValue, taskId);
}

export {
  listUserFun,
  createTasksFun,
  listTaskFun,
  updateTaskFun,
  deleteTaskFun,
};
