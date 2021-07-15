import { SET_BLOGS } from "./Constants/blogs-constants"

const initialState = {
    comment: []
}

const blogsReducer = (state = initialState, action) => {
    const { payload, type } = action
    switch (type) {
        case SET_BLOGS: {
            state.comment = payload
            return { ...state }
        }


        default: {
            return state
        }

    }
}
export default blogsReducer