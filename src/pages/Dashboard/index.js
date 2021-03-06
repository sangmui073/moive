import React, { memo, useEffect, useState } from 'react';

import { Button, Grid } from '@material-ui/core';
import SearchTemp from "../../components/Admin/SearchTemp"
import PostUsers from '../../components/Admin/PostUsers';
import PaginationAdmin from '../../components/Admin/PaginationAdmin';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { GET_LIST_USER_SAGA } from '../../redux/saga/Constants/admin-constants';
import { admin_domain } from "../../assets/Domain/AdminDomain"

function DashboardAdmin() {
  const { manageUser } = admin_domain;
  const { user } = useSelector(state => state.admin);
  const { pagination, posts } = user;
  const [action, setAction] = useState("");
  const [filters, SetFilters] = useState({
    currentPage: 1,
    count: 5,
    term: ""
  })
  const dispatch = useDispatch();
  useEffect(() => {
    let paramStrings;
    if (filters.term.length > 0) {
      paramStrings = queryString.stringify({
        soPhanTuTrenTrang: filters.count,
        soTrang: filters.currentPage,
        tuKhoa: filters.term
      });
    } else {
      paramStrings = queryString.stringify({
        soPhanTuTrenTrang: filters.count,
        soTrang: filters.currentPage,
      });
    }
    dispatch({
      type: GET_LIST_USER_SAGA,
      payload: {
        url: `${manageUser.get}${paramStrings}`
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
  return (
    <Grid container className="box">
      <Grid item xs={12} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <SearchTemp onSubmit={hanldeSearch} />
        <Button onClick={() => {
          setAction("Add")
        }} variant="contained">Thêm Người Dùng</Button>
      </Grid>
      <Grid item xs={12}>
        <PostUsers posts={posts} />
        <PaginationAdmin pagination={pagination} onPageChange={handlePageChange} />
      </Grid>
    </Grid>
  );
}

export default memo(DashboardAdmin);