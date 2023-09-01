import {
  ADD_COMPLAINT,
  GET_COMPLAINTS_SUCCESS,
  GET_COMPLAINTS_FAILURE,
  GET_COMPLAINT_BY_ID,
  DELETE_COMPLAINT,
} from '../actions/complaintsActions';

const initialState = {
  complaints: [],
  loading: true,
  error: null,
};

const complaintsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMPLAINT:
      return {
        ...state,
        complaints: [...state.complaints, action.payload],
        loading: false,
      };
    case GET_COMPLAINTS_SUCCESS:
      return {
        ...state,
        complaints: action.payload,
        loading: false,
        error: null,
      };
    case GET_COMPLAINTS_FAILURE:
      return {
        ...state,
        complaints: [],
        loading: false,
        error: action.payload,
      };
    case GET_COMPLAINT_BY_ID:
      return {
        ...state,
        complaints: [action.payload],
        loading: false,
      };
    case DELETE_COMPLAINT:
      return {
        ...state,
        complaints: state.complaints.filter(
          (complaint) => complaint.id !== action.payload
        ),
        loading: false,
      };
    default:
      return state;
  }
};

export default complaintsReducer;
