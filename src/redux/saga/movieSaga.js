import { all, call, takeLatest, put, delay } from "@redux-saga/core/effects";
import {
  IS_LOADING,
  LOADING_COMPLETE,
} from "../reducer/Constants/loading-constants";
import {
  GET_INFO_MOIVE_SAGA,
  GET_MOIVE_DETAILS_SAGA,
  GET_MOIVE_SAGA_MAIN,
  GET_MOIVE_SAGA_SHOWING,
  GET_SEARCH_MOIVE
} from "./Constants/moive-constants";
import { movieService } from "../../services";
import { STATUS } from "../../services/Constants";
import {
  SET_MOIVE_MAIN_ACTION,
  SET_MOIVE_DETAILS_ACTION,
  SET_MOIVE_INFO_CINEMA_ACTION,
  SET_MOIVE_SHOWING_ACTION,
  SET_MOIVE_SEARCH_ACTION
} from "../reducer/Constants/moive-constants";

function* GET_MOIVE_API(action) {
  const { payload } = action;
  yield put({
    type: IS_LOADING,
  });
  yield delay(500);
  try {
    const res = yield call(() => {
      return movieService.getMoive(payload);
    });
    const { status, data } = res;
    if (status === STATUS.SUCCESS) {
      yield put({ type: SET_MOIVE_MAIN_ACTION, payload: data.items });

    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: LOADING_COMPLETE,
  });
}
function* GET_INFO_MOIVE_API(action) {
  const { payload } = action;

  try {
    const res = yield call(() => {
      return movieService.getMoiveInfo(payload);
    });
    const { data, status } = res;
    if (status === STATUS.SUCCESS) {
      const { heThongRapChieu } = data;
      yield put({
        type: SET_MOIVE_INFO_CINEMA_ACTION,
        payload: heThongRapChieu,
      });
    }
  } catch (err) {
    console.log(err);
  }
}
function* GET_MOIVE_DETAILS_API(action) {
  const { payload } = action;
  yield put({
    type: IS_LOADING,
  });
  yield delay(500);
  try {
    const res = yield call(() => {
      return movieService.getMoiveDetails(payload);
    });
    const { data, status } = res;
    if (status === STATUS.SUCCESS) {
      yield put({
        type: SET_MOIVE_DETAILS_ACTION,
        payload: data,
      });
    }
  } catch (error) { }
  yield put({
    type: LOADING_COMPLETE,
  });
}
function* SEARCH_MOIVE_API(action) {
  const { payload } = action;
  yield put({
    type: IS_LOADING,
  });
  yield delay(500);
  try {
    const res = yield call(() => {
      return movieService.getMoive(payload);
    });
    const { status, data } = res;
    if (status === STATUS.SUCCESS) {

      yield put({
        type: SET_MOIVE_SEARCH_ACTION, payload: {
          data: data.items,
          totalCout: data.totalCount
        }
      });

    }
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: LOADING_COMPLETE,
  });
}
function* followSearchMoive() {
  yield takeLatest(GET_SEARCH_MOIVE, SEARCH_MOIVE_API)
}
function* GET_MOIVE_API_SHOWING(action) {
  const { payload } = action;

  try {
    const res = yield call(() => {
      return movieService.getMoive(payload);
    });
    const { status, data } = res;
    if (status === STATUS.SUCCESS) {

      yield put({
        type: SET_MOIVE_SHOWING_ACTION, payload: {
          items: data.items,
          filter: {
            currentPage: data.currentPage,
            count: data.count,
            totalCount: data.totalCount,
            totalPages: data.totalPages
          }
        }
      });

    }
  } catch (error) {
    console.log(error);
  }

}
function* followGetMovie() {
  yield takeLatest(GET_MOIVE_SAGA_MAIN, GET_MOIVE_API);
}
function* followGetMoiveShowing() {
  yield takeLatest(GET_MOIVE_SAGA_SHOWING, GET_MOIVE_API_SHOWING)
}
function* followGetMoiveDetails() {
  yield takeLatest(GET_MOIVE_DETAILS_SAGA, GET_MOIVE_DETAILS_API);
}
function* followGetInfoMoive() {
  yield takeLatest(GET_INFO_MOIVE_SAGA, GET_INFO_MOIVE_API);
}
export default function* followMoives() {
  yield all([followSearchMoive(), followGetMovie(), followGetMoiveShowing(), followGetInfoMoive(), followGetMoiveDetails()]);
}
