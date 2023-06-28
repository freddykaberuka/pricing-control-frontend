// Action types
export const ADD_COMPLAINT = 'ADD_COMPLAINT';
export const GET_COMPLAINTS_SUCCESS = 'GET_COMPLAINTS_SUCCESS';
export const GET_COMPLAINTS_FAILURE = 'GET_COMPLAINTS_FAILURE';
export const GET_COMPLAINT_BY_ID = 'GET_COMPLAINT_BY_ID';
export const DELETE_COMPLAINT = 'DELETE_COMPLAINT';

// Action creators
export const addComplaint = (complaint) => ({
  type: ADD_COMPLAINT,
  payload: complaint,
});

export const getComplaints = () => ({
  type: GET_COMPLAINTS, // Action type constant
});


export const getComplaintsSuccess = (complaints) => ({
  type: GET_COMPLAINTS_SUCCESS,
  payload: complaints,
});

export const getComplaintsFailure = (error) => ({
  type: GET_COMPLAINTS_FAILURE,
  payload: error,
});

export const getComplaintById = (complaint) => ({
  type: GET_COMPLAINT_BY_ID,
  payload: complaint,
});

export const deleteComplaint = (id) => ({
  type: DELETE_COMPLAINT,
  payload: id,
});

// Add your additional action creators here
export const someOtherAction = () => {
  // Action logic here
};
