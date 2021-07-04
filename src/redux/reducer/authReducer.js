import {
  CHECK_LOGIN,
  ERROR,

  LOG_OUT,
  SET_PATH,
  SET_PROFIE,
  SIGN_IN_ACTION,
  SIGN_UP_ACTION,
} from "./Constants/auth-constants";

const initialState = {
  user: {},
  messenger: {
    isLogin: false,
    mess: "",
  },
  checkOutInfo: [],
  path: "",
  param: "",
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_IN_ACTION: {
      state.user = payload;
      const newMess = "Bạn Đã Đăng Nhập Thành Công";
      state.messenger.isLogin = true;
      state.messenger.mess = newMess;
      return { ...state };
    }
    case ERROR: {
      const NewMes = payload.data;
      state.messenger.isLogin = false;
      state.messenger.mess = NewMes;

      return { ...state };
    }
    case SET_PATH: {
      state.path = payload.path;
      state.param = payload.params;
      return { ...state };
    }
    case CHECK_LOGIN: {
      state.user = payload;
      return { ...state };
    }
    case LOG_OUT: {
      state.user = {};
      state.messenger.mess = "";
      state.messenger.isLogin = false;
      return { ...state };
    }
    case SIGN_UP_ACTION: {
      state.user = payload;
      return { ...state }
    }
    case SET_PROFIE: {

      state.checkOutInfo = payload.thongTinDatVe
      return { ...state }
    }
    default:
      return state;
  }
};
export default authReducer;
