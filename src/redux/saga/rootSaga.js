import { all } from "redux-saga/effects";
import followAuth from "./authSaga";
import followCinema from "./cinemaSaga";
import followMoives from "./movieSaga";
import followBooking from "./bookingSaga"
import followAdmin from "./adminSaga";
import followBlogs from "./blogsSaga";
function* rootSaga() {
  yield all([followMoives(), followAuth(), followCinema(), followBooking(), followAdmin(), followBlogs()]);
}

export default rootSaga;
