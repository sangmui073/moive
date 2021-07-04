import React from 'react';
import PropTypes from 'prop-types';
import { FilterList, AddCircle } from '@material-ui/icons';
import { Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@material-ui/core';
import { useStyles } from "./style"
import { Delete, Edit } from '@material-ui/icons';
import dateFormat from 'dateformat';

PostMoives.propTypes = {
    posts: PropTypes.array.isRequired,
    handleModal: PropTypes.func
};
PostMoives.defaultProps = {
    handleModal: null
};
function PostMoives(props) {
    const classes = useStyles();
    const { posts, handleModal } = props;
    // console.log(posts)
    return (
        <TableContainer className={classes.root} style={{ marginTop: "50px" }} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Hành Động
                        </TableCell>
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
                        return <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                <Button title="Xóa Phim" className="trash">
                                    <Delete />
                                </Button>
                                <Button onClick={() => {
                                    const newItem = {
                                        ...item,
                                        ngayKhoiChieu: dateFormat(item.ngayKhoiChieu, "yyyy-mm-dd"),
                                        title: "Cập Nhật Phim"
                                    }
                                    handleModal(true, newItem)
                                }} title="Sữa Phim" className="edit">
                                    <Edit />
                                </Button>
                                <Button title="Thêm Lịch Chiếu" className="edit">
                                    <AddCircle />
                                </Button>
                            </TableCell>
                            <TableCell align="center">{item.maPhim}</TableCell>
                            <TableCell align="center">{item.tenPhim.length > 25 ? item.tenPhim.substr(0, 25) + "..." : item.tenPhim}</TableCell>
                            <TableCell align="center">{item.trailer.length > 30 ? item.trailer.substr(0, 30) + "..." : item.trailer}</TableCell>
                            <TableCell align="center">
                                <img src={item.hinhAnh} />
                            </TableCell>
                        </TableRow>
                    })}


                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default PostMoives;