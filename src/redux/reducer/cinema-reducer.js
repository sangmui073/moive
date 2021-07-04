import { SET_CINEMA_DETAILS, SET_CINEMA_LIST } from "./Constants/cinema-constants";
import { SET_MOIVE_INFO_CINEMA_ACTION } from "./Constants/moive-constants";

const initialState = {
  moiveSearchCine: [],
  cinemaList: [],
  cinemaDetails: {}
};

const cinemaReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MOIVE_INFO_CINEMA_ACTION: {
      state.moiveSearchCine = payload;
      return { ...state };
    }
    case SET_CINEMA_LIST: {
      state.cinemaList = payload;
      return { ...state };
    }
    case SET_CINEMA_DETAILS: {
      state.cinemaDetails = { ...payload[0] };

      return { ...state }
    }
    default:
      return state;
  }
};
export default cinemaReducer;
