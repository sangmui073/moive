import React from 'react';
import PropTypes from 'prop-types';
import { FilterList } from '@material-ui/icons';
import { Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@material-ui/core';
import { useStyles } from "./style"
import { Delete, Edit } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { admin_domain } from "../../../assets/Domain/AdminDomain"
import { DELETE_USER_SAGA } from '../../../redux/saga/Constants/admin-constants';


PostUsers.propTypes = {
    posts: PropTypes.array.isRequired,
    handleModal: PropTypes.func,
    handleAction: PropTypes.func,
};
PostUsers.defaultProps = {
    handleModal: null,

};
function PostUsers(props) {
    const classes = useStyles();
    const { posts, handleModal, handleAction } = props
    const dispatch = useDispatch();
    const { manageUser } = admin_domain;
    return (
        <TableContainer className={classes.root} style={{ marginTop: "50px" }} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            hành động
                        </TableCell>
                        <TableCell align="right">
                            <Button>Tài Khoảng
                                <FilterList />
                            </Button>
                        </TableCell>
                        <TableCell align="center">
                            Mật Khẩu
                        </TableCell>
                        <TableCell align="center">Họ tên</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="right">Số Điện thoại</TableCell>
                        <TableCell align="right">mã loại người dùng</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map((item, index) => {
                        return <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                <Button className="trash"
                                    onClick={() => {
                                        const url = `${manageUser.delete}${item.taiKhoan}`
                                        dispatch({
                                            type: DELETE_USER_SAGA,
                                            payload: {
                                                url,
                                                handleAction: handleAction
                                            }
                                        })
                                    }}
                                >
                                    <Delete />
                                </Button>
                                <Button className="edit" onClick={() => {
                                    handleModal(true, {
                                        title: "Cập Nhật Người Dùng",
                                        action: "REPALCE",
                                        items: {
                                            ...item,
                                            maNhom: "GP11"
                                        }

                                    })
                                }}>
                                    <Edit />
                                </Button>
                            </TableCell>
                            <TableCell align="center">{item.taiKhoan}</TableCell>
                            <TableCell align="center">{item.matKhau}</TableCell>
                            <TableCell align="center">{item.hoTen}</TableCell>
                            <TableCell align="center">{item.email}</TableCell>
                            <TableCell align="right">{item.soDt}</TableCell>
                            <TableCell align="center">{item.maLoaiNguoiDung}</TableCell>
                        </TableRow>
                    })}


                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default PostUsers;