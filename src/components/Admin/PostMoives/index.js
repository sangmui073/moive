import React from "react";
import PropTypes from "prop-types";
import { FilterList, AddCircle } from "@material-ui/icons";
import {
    Table,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
} from "@material-ui/core";
import { useStyles } from "./style";
import { Delete, Edit } from "@material-ui/icons";
import { admin_domain } from "../../../assets/Domain/AdminDomain";
import dateFormat from "dateformat";
import { useDispatch } from "react-redux";
import { DELETE_MOIVE_SAGA } from "../../../redux/saga/Constants/admin-constants";

PostMoives.propTypes = {
    posts: PropTypes.array.isRequired,
    handleModal: PropTypes.func,
    handleAction: PropTypes.func,
};
PostMoives.defaultProps = {
    handleModal: null,
    handleAction: null
};
function PostMoives(props) {
    const { managerMoive } = admin_domain;
    const classes = useStyles();
    const { posts, handleModal, handleAction } = props;

    const dispatch = useDispatch();
    const removeMoive = (moiveId) => {
        const url = `${managerMoive.delete}${moiveId}`;
        if (!handleAction) return
        dispatch({
            type: DELETE_MOIVE_SAGA,
            payload: {
                handleAction,
                url,

            },
        });
    };
    return (
        <TableContainer
            className={classes.root}
            style={{ marginTop: "50px" }}
            component={Paper}
        >
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Hành Động</TableCell>
                        <TableCell align="right">
                            <Button>
                                Mã Phim
                                <FilterList />
                            </Button>
                        </TableCell>

                        <TableCell align="center">Tên Phim</TableCell>
                        <TableCell align="center">Trailer</TableCell>
                        <TableCell align="center">Hình Ảnh</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map((item, index) => {
                        return (
                            <TableRow key={item.maPhim}>
                                <TableCell component="th" scope="row">
                                    <Button
                                        title="Xóa Phim"
                                        className="trash"
                                        onClick={() => {
                                            removeMoive(item.maPhim);
                                        }}
                                    >
                                        <Delete />
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            const newItem = {
                                                title: "Cập Nhật Phim",
                                                action: "replace",
                                                itemMoive: {
                                                    ...item,
                                                    ngayKhoiChieu: dateFormat(
                                                        item.ngayKhoiChieu,
                                                        "yyyy-mm-dd"
                                                    ),
                                                },
                                            };
                                            handleModal(true, newItem);
                                        }}
                                        title="Cập Nhật Phim"
                                        className="edit"
                                    >
                                        <Edit />
                                    </Button>
                                    <Button title="Thêm Lịch Chiếu" className="edit">
                                        <AddCircle />
                                    </Button>
                                </TableCell>
                                <TableCell align="center">{item.maPhim}</TableCell>
                                <TableCell align="center">
                                    {item.tenPhim.length > 25
                                        ? item.tenPhim.substr(0, 25) + "..."
                                        : item.tenPhim}
                                </TableCell>
                                <TableCell align="center">
                                    {item.trailer.length > 30
                                        ? item.trailer.substr(0, 30) + "..."
                                        : item.trailer}
                                </TableCell>
                                <TableCell align="center">
                                    <img src={`${item.hinhAnh}?t=${Date.now()}`} />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PostMoives;
