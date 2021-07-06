import { all, put, takeLatest, delay, call } from "redux-saga/effects";
import { adminService } from "../../services";
import { STATUS } from "../../services/Constants";
import {
    SET_LISTS_USER,
    SET_LIST_MOIVE,
} from "../reducer/Constants/admin-constants";
import {
    IS_LOADING,
    LOADING_COMPLETE,
} from "../reducer/Constants/loading-constants";
import {
    ADD_MOIVE_SAGA,
    ADD_USER_SAGA,
    DELETE_MOIVE_SAGA,
    DELETE_USER_SAGA,
    GET_LIST_MOIVE_SAGA,
    GET_LIST_USER_SAGA,
    PUT_MOIVE_SAGA,
    PUT_USER_SAGA,
} from "./Constants/admin-constants";
import Swal from "sweetalert2"

function* Get_List_User(action) {
    const { payload } = action;
    const { url } = payload;
    // yield put({
    //     type: IS_LOADING,
    // });
    // yield delay(500);
    try {
        const res = yield call(() => {
            return adminService.get(url);
        });
        const { data, status } = res;
        if (status === STATUS.SUCCESS) {
            const pagination = {
                currentPage: data.currentPage,
                count: data.count,
                totalCount: data.totalCount,
                totalPages: data.totalPages,
            };
            yield put({
                type: SET_LISTS_USER,
                payload: {
                    items: data.items,
                    pagination,
                },
            });
        }
    } catch (error) {
        console.log(error);
    }

    // yield put({
    //     type: LOADING_COMPLETE,
    // });
}
function* Get_List_Moive(action) {
    const { payload } = action;
    const { url } = payload;
    try {
        const res = yield call(() => {
            return adminService.get(url);
        });
        const { data, status } = res;
        if (status === STATUS.SUCCESS) {
            const pagination = {
                currentPage: data.currentPage,
                count: data.count,
                totalCount: data.totalCount,
                totalPages: data.totalPages,
            };
            yield put({
                type: SET_LIST_MOIVE,
                payload: {
                    items: data.items,
                    pagination,
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
}
function* Post_Moive(action) {

    const { payload } = action;
    const { url, item, handleAction } = payload;

    try {
        const res = yield call(() => {
            return adminService.post(url, item);
        });
        const { status, data } = res;
        if (status === STATUS.SUCCESS) {
            Swal.fire({
                title: 'Thêm Thành Công!',
                text: `Film : ${data.tenPhim}`,
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            const newAction = Date.now()
            handleAction(newAction)
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
        console.log(error);
    }
}
function* Put_Moive(action) {
    const user = JSON.parse(localStorage.getItem("user"));
    const { payload } = action;
    const { url, item, handleAction } = payload;

    const token = `Bearer ${user.accessToken}`;
    const header = {
        Authorization: token,
    };
    try {
        const res = yield call(() => {
            return adminService.post(url, item, header);
        });
        const { data, status } = res;
        if (status === STATUS.SUCCESS) {
            Swal.fire({
                title: 'Update thành công!',
                text: `Film : ${data.tenPhim}`,
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            const newAction = Date.now()
            handleAction(newAction)
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.response.data,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
        console.log(error);
    }
}
function* Delete_Moive(action) {
    const user = JSON.parse(localStorage.getItem("user"));
    const { payload } = action;
    const { url, handleAction } = payload;
    const token = `Bearer ${user.accessToken}`;

    const header = {
        Authorization: token,
    };
    try {
        const res = yield call(() => {
            return adminService.delete(url, header);
        })
        const { data, status } = res;
        if (status === STATUS.SUCCESS) {
            Swal.fire({
                title: 'succes!',
                text: data,
                icon: 'success',
                confirmButtonText: 'Cool'
            });
            const newAction = Date.now()
            handleAction(newAction)
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.response,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
        console.log(error)
    }
}
function* AddUser(action) {
    const { payload } = action;
    const { item, url, handleAction } = payload;
    const user = JSON.parse(localStorage.getItem("user"))
    const token = `Bearer ${user.accessToken}`;
    const headers = {
        Authorization: token,
    };
    try {
        const res = yield call(() => {
            return adminService.post(url, item, headers)
        });
        const { data, status } = res;
        if (status === STATUS.SUCCESS) {
            Swal.fire({
                title: 'succes!',
                text: data.taiKhoan,
                icon: 'success',
                confirmButtonText: 'Cool'
            });
            const newAction = Date.now();
            handleAction(newAction)
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.response,
            icon: 'error',
            confirmButtonText: 'Cool'
        });
        console.log(error)
    }
}

function* DeleteUser(action) {
    const { payload } = action;
    const { url, handleAction } = payload;
    const user = JSON.parse(localStorage.getItem("user"))
    const token = `Bearer ${user.accessToken}`;
    const header = {
        Authorization: token,
    };
    try {
        const res = yield call(() => {
            return adminService.delete(url, header)
        })
        const { data, status } = res;
        if (status === STATUS.SUCCESS) {
            Swal.fire({
                title: 'succes!',
                text: data,
                icon: 'success',
                confirmButtonText: 'Cool'
            })
            const newAction = Date.now();
            handleAction(newAction)
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.response.data,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
        console.log(error)
    }
}
function* PutUser(action) {
    const { payload } = action;
    const { item, url, handleAction } = payload;
    const user = JSON.parse(localStorage.getItem("user"))
    const token = `Bearer ${user.accessToken}`;
    const headers = {
        Authorization: token,
    };
    try {
        const res = yield call(() => {
            return adminService.put(url, item, headers);
        })
        const { data, status } = res;
        if (status === STATUS.SUCCESS) {
            console.log(data);
            const newAction = Date.now();
            handleAction(newAction)
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.response.data,
            icon: 'error',
            confirmButtonText: 'Cool'
        });
        console.log(error)
    }
}
function* followDeletMoive() {
    yield takeLatest(DELETE_MOIVE_SAGA, Delete_Moive);
}
function* followPutMoive() {
    yield takeLatest(PUT_MOIVE_SAGA, Put_Moive);
}
function* followPostMoive() {
    yield takeLatest(ADD_MOIVE_SAGA, Post_Moive);
}
function* followGetListMoive() {
    yield takeLatest(GET_LIST_MOIVE_SAGA, Get_List_Moive);
}
function* followAddUser() {
    yield takeLatest(ADD_USER_SAGA, AddUser)
}
function* followGetListsUser() {
    yield takeLatest(GET_LIST_USER_SAGA, Get_List_User);
}
function* followPutUser() {
    yield takeLatest(PUT_USER_SAGA, PutUser)
}
function* followDeleteUser() {
    yield takeLatest(DELETE_USER_SAGA, DeleteUser)
}
export default function* followAdmin() {
    yield all([
        followGetListsUser(),
        followGetListMoive(),
        followPostMoive(),
        followPutMoive(),
        followDeletMoive(),
        followAddUser(),
        followDeleteUser(),
        followPutUser()
    ]);
}
