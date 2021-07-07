import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  ListSubheader,
  TextField,
  MenuList,
  Menu,
} from "@material-ui/core";

import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_INFO_MOIVE_SAGA,
  GET_SEARCH_MOIVE,
} from "../../../redux/saga/Constants/moive-constants";
import formatDate from "date-format";
import { useStyles } from "./style";
import { useHistory } from "react-router";
import { SET_PATH } from "../../../redux/reducer/Constants/auth-constants";

function SearchMoive() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { searchMoive } = useSelector((state) => state.moive);
  const { list, totalCout } = searchMoive;
  const [filter, setFilter] = useState(5);
  useEffect(() => {
    const url = `QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP11&soPhanTuTrenTrang=${filter}`;
    dispatch({
      type: GET_SEARCH_MOIVE,
      payload: url,
    });
  }, [filter]);
  const [moive, setMoive] = useState({
    maPhim: "",
    maRap: "",
    suatChieu: "",
    lichChieu: [],
    ngayChieu: "",
  });
  const { moiveSearchCine } = useSelector((state) => state.cinema);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "maPhim") {
      if (value === "add") {
        const newFilter = filter + 5 < totalCout ? filter + 5 : totalCout;
        setFilter(newFilter);
        return;
      } else {
        dispatch({
          type: GET_INFO_MOIVE_SAGA,
          payload: value,
        });
      }
    }

    setMoive({
      ...moive,
      [name]: value,
    });
  };

  const renderDay = () => {
    let lichChieu;
    if (moive.maRap && moive.maRap.length > 0) {
      for (const element of moiveSearchCine) {
        lichChieu = element.cumRapChieu.find((item) => {
          return item.maCumRap === moive.maRap;
        });
        if (lichChieu) {
          moive.lichChieu = lichChieu.lichChieuPhim;
          const ngayGioChieu = lichChieu.lichChieuPhim.map((item, index) => {
            return formatDate("dd-MM-yyyy", new Date(item.ngayChieuGioChieu));
          });
          let uique = [...new Set(ngayGioChieu)];
          return uique.map((time, index) => {
            return (
              <MenuItem key={index} value={time}>
                {time}
              </MenuItem>
            );
          });
        }
      }
    } else {
      return <MenuItem disabled>Xin chon rạp</MenuItem>;
    }
  };
  const renderHour = () => {
    if (moive.ngayChieu && moive.ngayChieu.length > 0) {
      const xuatChieu = moive.lichChieu.filter((item, index) => {
        return (
          moive.ngayChieu ==
          formatDate("dd-MM-yyyy", new Date(item.ngayChieuGioChieu))
        );
      });
      return xuatChieu.map((item, index) => {
        return (
          <MenuItem
            style={{ textAlign: "center" }}
            key={index}
            value={item.maLichChieu}
          >
            {formatDate("hh", new Date(item.ngayChieuGioChieu)) +
              ":" +
              formatDate("mm", new Date(item.ngayChieuGioChieu))}
          </MenuItem>
        );
      });
    } else {
      return <MenuItem disabled>Chọn Ngày Xem</MenuItem>;
    }
  };

  const renderCinema = () => {
    if (moiveSearchCine && moiveSearchCine.length > 0) {
      return moiveSearchCine.map((item) => {
        const { maHeThongRap, cumRapChieu } = item;
        return cumRapChieu.map((cumrap, index) => {
          return (
            <MenuItem key={cumrap.tenCumRap} value={cumrap.maCumRap}>
              {cumrap.tenCumRap}
            </MenuItem>
          );
        });
      });
    } else {
      return <MenuItem disabled>Xin Chọn Phim</MenuItem>;
    }
  };
  if (list) {
    return (
      <section className={classes.root}>
        <Grid spacing={2} container className={classes.wapper}>
          <Grid item xs={6} md={3}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="moive-simple">Phim</InputLabel>
              <Select defaultValue="" name="maPhim" onChange={handleChange}>
                <MenuItem disabled aria-label="None" value="">
                  Chọn Phim
                </MenuItem>
                {list.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.maPhim}>
                      {item.tenPhim.length > 30
                        ? item.tenPhim.substr(0, 30) + "..."
                        : item.tenPhim}
                    </MenuItem>
                  );
                })}
                <MenuItem aria-label="None" value="add">
                  ...Thêm Phim...
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl className={classes.formControl}>
              <TextField

                label="Phim"
                select
                value={moive.maRap}
                name="maRap"
                onChange={handleChange}
              >
                {renderCinema()}
              </TextField>
            </FormControl>
          </Grid>

          <Grid item xs={6} md={2}>
            <FormControl className={classes.formControl}>
              <TextField
                label="Ngày Chiếu"
                select
                value={moive.ngayChieu}
                name="ngayChieu"
                onChange={handleChange}

              >

                {renderDay()}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl className={classes.formControl}>
              <TextField
                label="Giờ Chiếu"
                select
                name="suatChieu"
                value={moive.suatChieu}
                onChange={handleChange}

              >

                {renderHour()}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2} className={classes.btn}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (moive.suatChieu && moive.suatChieu.length > 0) {
                  dispatch({
                    type: SET_PATH,
                    payload: {
                      path: history.location.pathname,
                      params: moive.suatChieu,
                    },
                  });
                  history.push(`/Booking/${moive.suatChieu}`);
                }
              }}
            >
              Đặt Vé Ngay
            </Button>
          </Grid>
        </Grid>
      </section>
    );
  }
  return "";
}
export default memo(SearchMoive);

{
  /* <Grid item xs={6} md={3}>
{renderCinema()}
</Grid>
// inputProps={{
//   name: "maPhim",
//   id: "moive-native-simple",
//   //name ngay imputProps phải trùng vs key của value ở select ở đây là
//   //name="maPhim" value ={moive.maPhim}
//   //select => input sẽ không nhảy lên khi có value ở ô đó là string
// }} */
}
