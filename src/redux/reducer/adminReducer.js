import { SET_LISTS_USER, SET_LIST_MOIVE } from "./Constants/admin-constants";


const initialState = {
    user: {
        pagination: {},
        posts: [],
    },
    moive: {
        pagination: {},
        posts: [],
    }

};

const adminReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_LISTS_USER: {
            state.user.pagination = payload.pagination
            state.user.posts = payload.items
            return { ...state };
        }
        case SET_LIST_MOIVE: {
            state.moive.pagination = payload.pagination;
            state.moive.posts = payload.items
            return { ...state }
        }
        default:
            return state;
    }
};
export default adminReducer;