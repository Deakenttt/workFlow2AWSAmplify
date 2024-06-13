import axios from "axios";
import { BASE_URL } from '../config';
// Construct URL with query parameters

const options = {
    method: 'get', // Specify the method (get)
  };

export const fetchFromAPI = async (url) => {
    try { 
      // Fetch data from backend API using axios with options/parameters, both ways work
      const response = await axios(`${BASE_URL}/${url}`, options);
    //   const response = await axios.get(`${BASE_URL}/${url}`, params);
      const data = response.data;
  
      // Assuming data.contacts is a list of objects with properties id, firstname, lastname, email
      console.log("fetchFromAPI");
      console.log(data);
      return data; // Return the contacts data
    } catch (error) {
      console.error("Error fetching goals:", error);
      return []; // Return an empty array in case of error
    }
  };


