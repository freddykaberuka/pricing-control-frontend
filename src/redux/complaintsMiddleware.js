import axios from 'axios';
import {
  addComplaint,
  getComplaintsSuccess,
  getComplaintsFailure,
  getComplaints,
  getComplaintById,
  deleteComplaint,
} from './actions/complaintsActions';
import api from './baseUrl'; // replace 'api' with your API request module

const complaintsMiddleware = () => (next) => (action) => {
  if (action.type === 'ADD_COMPLAINT') {
    const { complaintData } = action.payload;

    axios
      .post('/api/complaints/add', complaintData)
      .then((response) => {
        const newComplaint = response.data;
        next(addComplaint(newComplaint));
      })
      .catch((error) => {
        console.error(error);
        // Handle error case, e.g., dispatch an error action
      });
  }

  if (action.type === 'GET_COMPLAINTS') {
    dispatch(getComplaints());

    axios
      .get('/api/complaints')
      .then((response) => {
        const complaints = response.data;
        dispatch(getComplaintsSuccess(complaints));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(getComplaintsFailure(errorMessage));
      });
  }

  if (action.type === 'GET_COMPLAINT_BY_ID') {
    const { id } = action.payload;

    axios
      .get(`/api/complaint/${id}`)
      .then((response) => {
        const complaint = response.data;
        dispatch(getComplaintById(complaint));
      })
      .catch((error) => {
        console.error(error);
        // Handle error case
      });
  }

  if (action.type === 'DELETE_COMPLAINT') {
    const { id } = action.payload;

    axios
      .delete(`/api/complaint/${id}`)
      .then(() => {
        dispatch(deleteComplaint(id));
      })
      .catch((error) => {
        console.error(error);
        // Handle error case
      });
  }

  // Call the next middleware or dispatch the action to the reducers
  next(action);
};

export const getComplaintsMiddleware = () => {
  return (dispatch) => {
    // Dispatch an action to indicate that the getComplaints request is in progress
    dispatch({ type: 'GET_COMPLAINTS_REQUEST' });

    api
      .get('/complaint/')
      .then((response) => {
        // Dispatch an action with the retrieved complaints data
        dispatch(getComplaintsSuccess(response.data));
      })
      .catch((error) => {
        // Dispatch an action with the error message
        dispatch(getComplaintsFailure(error.message));
      });
  };
};

export default complaintsMiddleware;
