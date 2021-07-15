import { combineReducers } from "redux";
import cinemaReducer from "./cinema-reducer";
import authReducer from "./authReducer";
import LoadingReducer from "./LoadingReducer";
import movieReducer from "./movieReducer";
import bookingReducer from "./bookingReducer"
import adminReducer from "./adminReducer";
import blogsReducer from "./blogsReducer";
const rootReducer = combineReducers({
  moive: movieReducer,
  loading: LoadingReducer,
  cinema: cinemaReducer,
  auth: authReducer,
  booking: bookingReducer,
  admin: adminReducer,
  blogs: blogsReducer
});

export default rootReducer;
