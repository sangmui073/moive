import { all, call, takeLatest, put, delay } from "@redux-saga/core/effects";
import { cinemaService } from "../../services";
import { GET_CINEMA_DETAILS_SAGA, GET_CINEMA_LIST_SAGA } from "./Constants/cinema-constants";
import { STATUS } from "../../services/Constants";
import { SET_CINEMA_DETAILS, SET_CINEMA_LIST } from "../reducer/Constants/cinema-constants";
import { IS_LOADING, LOADING_COMPLETE } from "../reducer/Constants/loading-constants";
function* GET_THEATERS_API() {
  const URL = "QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP11"
  try {
    const res = yield call(() => {
      return cinemaService.getCinemaList(URL);
    });
    const { status, data } = res;
    if (status === STATUS.SUCCESS) {
      yield put({
        type: SET_CINEMA_LIST,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
function* GET_THEATERS_DETAILS_API(action) {
  yield put({
    type: IS_LOADING,
  });
  yield delay(500);
  const { payload } = action;

  const url = `QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${payload}&maNhom=GP11`
  try {
    const res = yield call(() => {
      return cinemaService.getCinemaList(url)
    })
    const { status, data } = res;
    if (status === STATUS.SUCCESS) {
      yield put({
        type: SET_CINEMA_DETAILS,
        payload: data
      });

    }
  } catch (error) {
    console.log(error)
  }

  yield put({
    type: LOADING_COMPLETE,
  });
}
function* followCinemaDetails() {
  yield takeLatest(GET_CINEMA_DETAILS_SAGA, GET_THEATERS_DETAILS_API)
}
function* followGetCinemaList() {
  yield takeLatest(GET_CINEMA_LIST_SAGA, GET_THEATERS_API);
}
export default function* followCinema() {
  yield all([followGetCinemaList(), followCinemaDetails()]);
}
