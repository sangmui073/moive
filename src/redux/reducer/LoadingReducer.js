import { IS_LOADING, LOADING_COMPLETE } from "./Constants/loading-constants";

const initialState = {
  status: false,
};

const LoadingReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case IS_LOADING: {
      state.status = true;
      return { ...state };
    }
    case LOADING_COMPLETE: {
      state.status = false;
      return { ...state };
    }
    default:
      return state;
  }
};
export default LoadingReducer;
