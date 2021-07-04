import { all, call, takeLatest, put, delay } from "@redux-saga/core/effects";
import { bookingService } from "../../services";
import { STATUS } from "../../services/Constants";
import { SET_BOOKING, CHECK_OUT } from "../reducer/Constants/booking-constants";
import { IS_LOADING, LOADING_COMPLETE } from "../reducer/Constants/loading-constants";
import { CHECK_OUT_SAGA, GET_BOOKING_SAGA } from "./Constants/booking-constants";

function* GET_BOOKING_API(action) {
  const { payload } = action
  yield put({
    type: IS_LOADING,
  });
  yield delay(500);
  try {
    const res = yield call(() => {
      return bookingService.getListChairs(payload)
    })
    const { data, status } = res;
    if (status === STATUS.SUCCESS) {
      let array = [];
      while (data.danhSachGhe.length > 0) {
        let arrayElement = data.danhSachGhe.splice(0, 16);
        array.push(arrayElement)
      }
      data.danhSachGhe = array;
      yield put({
        type: SET_BOOKING,
        payload: data
      })
    }

  } catch (error) {
    console.log(error)
  }
  yield put({
    type: LOADING_COMPLETE,
  });
}
function* CHECK_OUT_API(action) {
  const { payload } = action;
  const { listTicket, token, history, Swal } = payload;

  yield put({
    type: IS_LOADING,
  });
  yield delay(500);
  try {
    const res = yield call(() => {
      return bookingService.checkOut(listTicket, token)
    });
    const { data, status } = res;
    if (status === STATUS.SUCCESS) {
      Swal.fire({
        text: data,
        icon: 'success',
      });
      yield put({
        type: CHECK_OUT
      })
      history.push("/")
    }
  } catch (error) {
    console.log(error)
  }
  yield put({
    type: LOADING_COMPLETE,
  });
}
function* followCheckOut() {
  yield takeLatest(CHECK_OUT_SAGA, CHECK_OUT_API);
}
function* followGetBooking() {
  yield takeLatest(GET_BOOKING_SAGA, GET_BOOKING_API);
}
export default function* followBooking() {
  yield all([followGetBooking(), followCheckOut()]);
}
