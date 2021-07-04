import { all, put, takeLatest, delay, call } from "redux-saga/effects";
import { adminService } from "../../services";
import { STATUS } from "../../services/Constants";
import { SET_LISTS_USER, SET_LIST_MOIVE } from "../reducer/Constants/admin-constants";
import { IS_LOADING, LOADING_COMPLETE } from "../reducer/Constants/loading-constants";
import { GET_LIST_MOIVE_SAGA, GET_LIST_USER_SAGA } from "./Constants/admin-constants";

function* Get_List_User(action) {
    const { payload } = action;
    const { url } = payload;
    yield put({
        type: IS_LOADING,
    });
    yield delay(500);
    try {
        const res = yield call(() => {
            return adminService.get(url)
        })
        const { data, status } = res;
        if (status === STATUS.SUCCESS) {
            const pagination = {
                currentPage: data.currentPage,
                count: data.count,
                totalCount: data.totalCount,
                totalPages: data.totalPages
            }
            yield put({
                type: SET_LISTS_USER,
                payload: {
                    items: data.items,
                    pagination
                }
            })
        }
    } catch (error) {
        console.log(error)
    }

    yield put({
        type: LOADING_COMPLETE,
    });
}
function* Get_List_Moive(action) {
    const { payload } = action;
    const { url } = payload;
    try {
        const res = yield call(() => {
            return adminService.get(url)
        });
        const { data, status } = res;
        if (status === STATUS.SUCCESS) {

            const pagination = {
                currentPage: data.currentPage,
                count: data.count,
                totalCount: data.totalCount,
                totalPages: data.totalPages
            }
            yield put({
                type: SET_LIST_MOIVE,
                payload: {
                    items: data.items,
                    pagination
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}
function* followGetListMoive() {
    yield takeLatest(GET_LIST_MOIVE_SAGA, Get_List_Moive)
}
function* followGetListsUser() {
    yield takeLatest(GET_LIST_USER_SAGA, Get_List_User)
}


export default function* followAdmin() {
    yield all([followGetListsUser(), followGetListMoive()]);
}
