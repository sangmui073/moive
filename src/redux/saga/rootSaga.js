import { all } from "redux-saga/effects";
import followAuth from "./authSaga";
import followCinema from "./cinemaSaga";
import followMoives from "./movieSaga";
import followBooking from "./bookingSaga"
import followAdmin from "./adminSaga";
function* rootSaga() {
  yield all([followMoives(), followAuth(), followCinema(), followBooking(), followAdmin()]);
}

export default rootSaga;
