import axios from "axios";

// Construct URL with query parameters
const BASE_URL = 'https://workflowbackendapi-production.up.railway.app'

export const createGoal = async ( url, inputData ) => {
  const options = {
    method: 'post', // Specify the method (post)
    headers: {
        "Content-Type": "application/json"
    },
    // The attribute Nmae of the data object should mmatch with the backend sechema we definded
    // here can cause the bad request 400, if the attribute Name mismatch
    data: {
      goal: inputData.goal
    }
  };
    try {
      const response = await axios(`${BASE_URL}/${url}`, options);
      const data = response;

      console.log("create Goal From API");
      return data; // Return the contacts data
    } catch (error) {
      console.error("Error creating goal:", error);
      return {}; // Return an empty array in case of error
    }
  };