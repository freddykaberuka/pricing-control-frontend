import axios from 'axios';
import { GET_COMPLAINTS, getComplaintsSuccess, getComplaintsFailure } from './actions/complaintActions';

export const getComplaintsMiddleware = () => {
  return (dispatch) => {
    dispatch({ type: GET_COMPLAINTS }); // Dispatch an action to indicate that the API request is in progress

    axios
      .get('/api/complaints') // Replace with your API endpoint for fetching complaints
      .then((response) => {
        dispatch(getComplaintsSuccess(response.data)); // Dispatch an action with the received data
      })
      .catch((error) => {
        dispatch(getComplaintsFailure(error.message)); // Dispatch an action with the error message
      });
  };
};
