import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
} from "@material-ui/core";

import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_INFO_MOIVE_SAGA, GET_SEARCH_MOIVE } from "../../../redux/saga/Constants/moive-constants";
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

    const url = `QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP11&soPhanTuTrenTrang=${filter}`
    dispatch({
      type: GET_SEARCH_MOIVE,
      payload: url
    })
  }, [filter])
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
    if (name == "maPhim") {
      if (value === "add") {
        const newFilter = filter + 5 < totalCout ? filter + 5 : totalCout;
        setFilter(newFilter)
        return
      }
      dispatch({
        type: GET_INFO_MOIVE_SAGA,
        payload: value,
      });
      setMoive({
        ...moive,
        [name]: value,
        maPhim: value,
      });
    } setMoive({
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
              <option key={index} value={time}>
                {time}
              </option>
            );
          });
        }
      }
    } else {
      return <option>Xin chon rạp</option>;
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
          <option
            style={{ textAlign: "center" }}
            key={index}
            value={item.maLichChieu}
          >
            {formatDate("hh", new Date(item.ngayChieuGioChieu)) +
              ":" +
              formatDate("mm", new Date(item.ngayChieuGioChieu))}
          </option>
        );
      });
    } else {
      return <option>Chọn Ngày Xem</option>;
    }
  };

  const renderCinema = () => {
    if (moive.maPhim && moive.maPhim.length > 0) {
      return moiveSearchCine.map((item, index) => {
        const { maHeThongRap, cumRapChieu } = item;
        return (
          <optgroup key={index} label={maHeThongRap}>
            {cumRapChieu.map((rap, maRap) => {
              return (
                <option key={maRap} value={rap.maCumRap}>
                  {rap.tenCumRap}
                </option>
              );
            })}
          </optgroup>
        );
      });
    } else {
      return <option disabled>Xin Chọn Phim</option>;
    }
  };
  if (list) {
    return (
      <section className={classes.root}>
        <Grid spacing={2} container className={classes.wapper}>
          <Grid item xs={6} sm={3}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="moive-native-simple">Phim</InputLabel>
              <Select
                native
                value={moive.maPhim}
                onChange={handleChange}
                inputProps={{
                  name: "maPhim",
                  id: "moive-native-simple",
                  //name ngay imputProps phải trùng vs key của value ở select ở đây là
                  //name="maPhim" value ={moive.maPhim}
                  //select => input sẽ không nhảy lên khi có value ở ô đó là string
                }}
              >
                <option aria-label="None" value="" />
                {list.map((item, index) => {
                  return (
                    <option key={index} value={item.maPhim}>
                      {item.tenPhim.length > 30
                        ? item.tenPhim.substr(0, 30) + "..."
                        : item.tenPhim}
                    </option>
                  );
                })}
                <option aria-label="None" value="add">
                  ...Thêm Phim...
                </option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="cine-native-simple">Rạp Chiếu</InputLabel>
              <Select
                native
                value={moive.maRap}
                onChange={handleChange}
                inputProps={{
                  name: "maRap",
                  id: "cine-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {renderCinema()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={2}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="day-native-simple">Ngày Chiếu</InputLabel>
              <Select
                native
                value={moive.ngayChieu}
                onChange={handleChange}
                inputProps={{
                  name: "ngayChieu",
                  id: "day-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {renderDay()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={2}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="day-native-simple">Giờ Chiếu</InputLabel>
              <Select
                native
                value={moive.suatChieu}
                onChange={handleChange}
                inputProps={{
                  name: "suatChieu",
                  id: "day-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {renderHour()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2} className={classes.btn}>
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
  return ""

}
export default memo(SearchMoive);
