import { all, call, takeLatest, put, delay } from "@redux-saga/core/effects";
import { blogsService } from "../../services";
import { STATUS } from "../../services/Constants";
import { SET_BLOGS } from "../reducer/Constants/blogs-constants";
import {
    GET_COMMENT_SAGA,
    PATCH_COMMENT_SAGA,
    POST_COMMENT_SAGA,
} from "./Constants/blogs-constance";
import { JsonDomain } from "../../assets/Domain";
import {
    IS_LOADING,
    LOADING_COMPLETE,
} from "../reducer/Constants/loading-constants";


function* getCommentAPI(action) {
    const { payload } = action;
    const { source } = payload;
    const url = `${JsonDomain}${source}`;

    yield put({
        type: IS_LOADING,
    });
    try {
        const res = yield call(() => {
            return blogsService.getListComment(url);
        });
        const { data, status } = res;
        if (status === STATUS.SUCCESS) {
            yield put({
                type: SET_BLOGS,
                payload: data,
            });
        }
    } catch (error) {
        console.log(error);
    }
    yield put({
        type: LOADING_COMPLETE,
    });
}
function* postComentAPI(action) {
    const { payload } = action;
    const { comment, souce, urlChild } = payload;
    const url = `${JsonDomain}${souce}`;
    try {
        const res = yield call(() => {
            return blogsService.postComment(url, comment);
        });
        const { status } = res;

        if (status === 201 || 202 || 200) {
            const url = `${JsonDomain}${souce}${urlChild}`;

            const resComment = yield call(() => {
                return blogsService.getListComment(url);
            });
            if (resComment.status === 201 || 202 || 200) {
                yield put({
                    type: SET_BLOGS,
                    payload: resComment.data,
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
}
function* patchCommentAPI(action) {
    const { payload } = action;
    const { souce, urlChild, comment } = payload;
    const urlPatch = `${JsonDomain}${souce}/${comment.id}`;
    try {
        const res = yield call(() => {
            return blogsService.patchComment(urlPatch, comment);
        });
        const { status } = res;
        if (status === 200 || 201 || 202) {
            const resComment = yield call(() => {
                const url = `${JsonDomain}${souce}${urlChild}`
                return blogsService.getListComment(url)
            });
            if (resComment.status === 200 || 201 || 202) {
                yield put({
                    type: SET_BLOGS,
                    payload: resComment.data,
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
}
function* followPatchComment() {
    yield takeLatest(PATCH_COMMENT_SAGA, patchCommentAPI);
}
function* followPostComent() {
    yield takeLatest(POST_COMMENT_SAGA, postComentAPI);
}
function* followGetComment() {
    yield takeLatest(GET_COMMENT_SAGA, getCommentAPI);
}
export default function* followBlogs() {
    yield all([followGetComment(), followPostComent(), followPatchComment()]);
}
