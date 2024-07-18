import axios from "axios";
import {
  listUserKey,
  apiKey,
  createTaskApi,
  listTaskApi,
  deleteTaskApi,
  updateTaskApi,
} from "./TaskUrl";
async function getDetails(apiToGetDetails) {
  try {
    const response = await axios.get(apiToGetDetails, {
      headers: {
        AuthToken: apiKey,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
async function postDetails(apiToGetDetails, userValue) {
  console.log(userValue);
  try {
    const response = await axios.post(apiToGetDetails, userValue, {
      headers: {
        "Content-Type": "multipart/form-data",
        AuthToken: apiKey,
      },
    });
    console.log(response.data, "response.data");
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

// async function updateDetails(apiToGetDetails, userDetail, taskId) {
//   try {
//     const userDetails = Object.assign({ taskid: taskId }, userDetail);
//     // const response = await axios.put(apiToGetDetails, userDetails, {
//     //   headers: {
//     //     AuthToken: apiKey,
//     //     "Content-Type": "multipart/form-data",
//     //   },
//     // });
//     const config = {
//       headers: {
//         AuthToken: apiKey,
//         "Content-Type": "application/json",
//       },
//     };
//     const response = await axios.post(apiToGetDetails, userDetails, config);
//     // console.log(apiToGetDetails, "url");
//     // console.log(userDetails, "details");
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error constructing FormData:", error);
//     throw error;
//   }
// }

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

    console.log("Task deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}

function listUserFun(setUSerListData) {
  getDetails(listUserKey)
    .then((data) => {
      setUSerListData(data);
    })
    .catch((error) => {
      console.log("firstErrssor");
    });
}
function createTasksFun(createTaskDetails) {
  postDetails(createTaskApi, createTaskDetails);
}

function deleteTaskFun(deleteId) {
  deleteTask(deleteTaskApi, deleteId);
}
function listTaskFun(setListTaskData) {
  getDetails(listTaskApi)
    .then((data) => {
      setListTaskData(data);
    })
    .catch((error) => {
      console.log("firstErrssor");
    });
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
