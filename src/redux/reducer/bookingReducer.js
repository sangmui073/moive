import { CHECK_OUT, CHOICE_CHAIRS, SET_BOOKING } from "./Constants/booking-constants";

const initialState = {
  listChairs: [],
  moiveInfo: {},
  chairChoices: []
};

const bookingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_BOOKING: {

      state.moiveInfo = payload.thongTinPhim;
      state.listChairs = payload.danhSachGhe
      return { ...state };
    }
    case CHOICE_CHAIRS: {
      const { ghe, list } = payload

      state.listChairs.forEach((item) => {
        const index = item.findIndex((chair) => {
          return chair.maGhe === ghe.maGhe
        })
        if (index !== -1) {
          let oldChair = item[index];
          let newChair = { ...oldChair, dangChon: !oldChair.dangChon };
          item[index] = newChair;
        }
      })
      state.chairChoices = list;
      return { ...state };
    }
    case CHECK_OUT: {
      state.chairChoices = [];
      return { ...state }
    }
    default:
      return state;
  }
};
export default bookingReducer;
