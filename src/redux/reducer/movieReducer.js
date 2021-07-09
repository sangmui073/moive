import {
  SET_MOIVE_MAIN_ACTION,
  SET_MOIVE_SHOWING_ACTION,
  SET_MOIVE_DETAILS_ACTION,
  SET_MOIVE_SEARCH_ACTION,
} from "./Constants/moive-constants";

const initialState = {
  carouselMain: [],
  nowShowing: {
    listMoive: [],
    pagitiona: {}
  },
  moiveDetails: {},
  searchMoive: {
    list: [],
    totalCout: 0
  }
};

const movieReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MOIVE_MAIN_ACTION: {
      state.carouselMain = payload;
      return { ...state };
    }
    case SET_MOIVE_SHOWING_ACTION: {
      state.nowShowing.listMoive = payload.items;
      state.nowShowing.pagitiona = payload.filter
      return { ...state }
    }
    case SET_MOIVE_DETAILS_ACTION: {
      state.moiveDetails = payload;
      return { ...state };
    }
    case SET_MOIVE_SEARCH_ACTION: {

      state.searchMoive.list = payload.data;
      state.searchMoive.totalCout = payload.totalCout
      return { ...state }
    }
    default:
      return state;
  }
};
export default movieReducer;
