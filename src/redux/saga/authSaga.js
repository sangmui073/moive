import { all, call, takeLatest, put, delay } from "@redux-saga/core/effects";
import { authService } from "../../services";
import { STATUS } from "../../services/Constants";
import { SIGN_IN_ACTION, ERROR, SIGN_UP_ACTION, SET_PROFIE } from "../reducer/Constants/auth-constants";
import {
  IS_LOADING,
  LOADING_COMPLETE,
} from "../reducer/Constants/loading-constants";
import { GET_PROFILE, PUT_PROFILE, SIGN_IN_SAGA, SIGN_UP_SAGA } from "./Constants/auth-constants";

function* SIGN_IN(action) {
  const { payload } = action;

  yield put({
    type: IS_LOADING,
  });
  yield delay(500);
  try {
    const res = yield call(() => {
      return authService.signIn(payload.user);
    });
    const { data, status } = res;

    if (status === STATUS.SUCCESS) {
      localStorage.setItem("user", JSON.stringify(data));
      yield put({
        type: SIGN_IN_ACTION,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error.response)
    yield put({
      type: ERROR,
      payload: error.response,
    });
  }
  yield put({
    type: LOADING_COMPLETE,
  });
}
function* SIGN_UP(action) {
  const { payload } = action;
  const { values, Swal, history } = payload;
  yield put({
    type: IS_LOADING,
  });
  yield delay(500);
  try {
    const res = yield call(() => {
      return authService.signUp(values)
    })
    const { data, status } = res;
    if (status === STATUS.SUCCESS) {
      const user = yield call(() => {
        return authService.signIn({
          taiKhoan: data.taiKhoan,
          matKhau: data.matKhau
        })
      })
      localStorage.setItem("user", JSON.stringify(user.data));
      yield put({
        type: SIGN_UP_ACTION,
        payload: data
      })
      Swal.fire({
        title: '',
        text: 'Bạn đã đăng ký thành công',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      setTimeout(() => {
        history.push("/")
      }, 2000);
    }
  } catch (error) {
    Swal.fire({
      title: '',
      text: error.response.data,
      icon: 'error',
      confirmButtonText: 'Ok'
    })

  }
  yield put({
    type: LOADING_COMPLETE,
  });

}

function* Get_Profie_Api(action) {
  const { payload } = action;
  const user = {
    taiKhoan: payload
  }
  yield put({
    type: IS_LOADING,
  });
  yield delay(500);
  try {
    const res = yield call(() => {
      return authService.getProfie(user)
    })
    const { data, status } = res;
    if (status === STATUS.SUCCESS) {

      yield put({
        type: SET_PROFIE,
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
function* reaplaceProfie(action) {
  const { payload } = action;
  const { user, token, Swal } = payload;

  yield put({
    type: IS_LOADING,
  });
  yield delay(500);
  try {
    const res = yield call(() => {

      return authService.putProfile(user, token);
    })
    const { data, status } = res;

    if (status === STATUS.SUCCESS) {
      const user = {
        taiKhoan: data.taiKhoan,
        matKhau: data.matKhau
      };
      try {
        const userLogin = yield call(() => {
          return authService.signIn(user)
        })
        if (userLogin.status === STATUS.SUCCESS) {
          console.log(userLogin)
          localStorage.setItem("user", JSON.stringify(userLogin.data))
        }
      } catch (error) {
        console.log(error.response.data)
      }


    }
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.response.data,
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }
  yield put({
    type: LOADING_COMPLETE,
  });
}
function* followPutProfile() {
  yield takeLatest(PUT_PROFILE, reaplaceProfie)
}
function* followGetProfie() {
  yield takeLatest(GET_PROFILE, Get_Profie_Api)
}

function* followSignUp() {
  yield takeLatest(SIGN_UP_SAGA, SIGN_UP)
}
function* followSignIn() {
  yield takeLatest(SIGN_IN_SAGA, SIGN_IN);
}


export default function* followAuth() {
  yield all([followSignIn(), followSignUp(), followGetProfie(), followPutProfile()]);
}
