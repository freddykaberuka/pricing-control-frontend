import axios from 'axios';

export const registerUserAPI = async (userData) => {
  try {
    const response = await axios.post('localhost:5000/user/signup', userData); // Replace '/api/register' with your actual registration endpoint
    return response.data; // Return the response data from the API
  } catch (error) {
    throw new Error(error.response.data.message); // Throw an error with the error message from the API
  }
};
