import React, { memo, useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import SearchTemp from "../../components/Admin/SearchTemp"
import PostMoives from '../../components/Admin/PostMoives';
import PaginationAdmin from '../../components/Admin/PaginationAdmin';
import queryString from 'query-string';

import { useDispatch, useSelector } from 'react-redux';
import { GET_LIST_MOIVE_SAGA } from '../../redux/saga/Constants/admin-constants';
import { admin_domain } from "../../assets/Domain/AdminDomain"
import Modalmoive from '../../components/Admin/ModalMoive';
import ModalShowTime from '../../components/Admin/ModalShowtime';

function Usermanager() {
    const { managerMoive } = admin_domain;
    const { moive } = useSelector(state => state.admin);
    const { pagination, posts } = moive;
    const [action, setAction] = useState("")
    const [filters, SetFilters] = useState({
        currentPage: 1,
        count: 5,
        term: ""
    })
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [showOpen, setShowOpen] = useState(false);
    const [showTime, setShowTime] = useState(null);
    const handleModal = (boolean, item) => {
        setItemMoive(item);
        setOpen(boolean);
    }
    const [itemMoive, setItemMoive] = useState({
        title: "",
        action: "",
        itemMoive: {
            maPhim: null,
            tenPhim: '',
            biDanh: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: null,
            danhGia: '',
            maNhom: "GP11",
            hinhAnh: null,
        }
    })
    useEffect(() => {
        let paramStrings;
        if (filters.term.length > 0) {
            paramStrings = queryString.stringify({
                soPhanTuTrenTrang: filters.count,
                soTrang: filters.currentPage,
                tenPhim: filters.term
            });
        } else {
            paramStrings = queryString.stringify({
                soPhanTuTrenTrang: filters.count,
                soTrang: filters.currentPage,
            });
        }
        dispatch({
            type: GET_LIST_MOIVE_SAGA,
            payload: {
                url: `${managerMoive.get}${paramStrings}`
            }
        })
    }, [filters, action])
    const hanldeSearch = (newTerm) => {
        SetFilters({
            ...filters,
            currentPage: 1,
            term: newTerm
        })
    }
    const handlePageChange = (newPage) => {
        SetFilters({
            ...filters,
            ...newPage
        })
    }
    const handleShowOpen = (bool, item) => {
        setShowOpen(bool);
        setShowTime(item)
    }
    return (
        <Grid container className="box">
            <Grid item xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <SearchTemp onSubmit={hanldeSearch} />
                <Button style={{ background: "#f37520", color: "#fff" }} onClick={() => {
                    const newItem = {
                        title: "Thêm Phim",
                        action: "add",
                        itemMoive: {
                            maPhim: null,
                            tenPhim: '',
                            biDanh: '',
                            trailer: '',
                            moTa: '',
                            ngayKhoiChieu: null,
                            danhGia: '',
                            maNhom: "GP11",
                            hinhAnh: null,
                        }
                    }
                    handleModal(true, newItem)
                }} variant="contained" >Thêm Phim</Button>
            </Grid>
            <Grid item xs={12}>
                <PostMoives handleShowOpen={handleShowOpen} handleAction={setAction} handleModal={handleModal} posts={posts} />
                <PaginationAdmin pagination={pagination} onPageChange={handlePageChange} />
            </Grid>
            <Modalmoive handleAction={setAction} items={itemMoive} open={open} handleModal={handleModal} />
            <ModalShowTime handleShowOpen={handleShowOpen} showOpen={showOpen} showTime={showTime} />
        </Grid>
    );
}

export default memo(Usermanager)
