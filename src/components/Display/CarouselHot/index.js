import React, { useEffect, useState, memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import SwiperCore, { Autoplay, EffectCoverflow, Navigation } from "swiper/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Container,
  Grid,
  Paper

} from "@material-ui/core";
import { ConfirmationNumber, PlayArrow, StarRate } from "@material-ui/icons";

import formatDate from "date-format";
import bg from "../../../assets/img/bg_topmovie.png";
import { useStyles } from "./style";
import ModalUntility from "../ModalUltiliti";
import queryString from "query-string"

import { GET_MOIVE_SAGA_SHOWING } from "../../../redux/saga/Constants/moive-constants";
SwiperCore.use([Navigation, EffectCoverflow, Autoplay]);

function CarouselHot() {
  const { nowShowing } = useSelector((state) => state.moive);
  const { listMoive, pagitiona } = nowShowing;
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState("nowShowing");
  // const size = useWindowSize();
  const renderStar = (number) => {
    const listStar = [];
    const view = parseFloat(number / 2);
    for (let i = 0; i < view; i++) {
      listStar.push(
        <StarRate
          style={{ verticalAlign: "bottom", fill: "#FFC300" }}
          key={i}
        />
      );
    }
    return listStar;
  };
  const [filterMoive, setFilterMoive] = useState({
    currentPage: 1,
    cout: 8
  })
  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case "nowShowing": {
        setFilterMoive({
          cout: 8,
          currentPage: 1
        });
        break;
      }
      case "comingSon": {
        setFilterMoive({
          cout: 8,
          currentPage: 2
        });
        break;
      }
    }
  };

  const [trailer, setTrailer] = useState(null);
  const dispatch = useDispatch();
  console.log(pagitiona)
  useEffect(() => {
    const newFilterMoive = {
      soTrang: filterMoive.currentPage,
      soPhanTuTrenTrang: filterMoive.cout
    }
    const params = queryString.stringify(newFilterMoive);
    const url = `QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP11&${params}`;
    dispatch({
      type: GET_MOIVE_SAGA_SHOWING,
      payload: url
    })
  }, [filterMoive]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (trailer) => {
    setTrailer(trailer);
    setOpen(true);
  };



  const renderMobiMoive = () => {
    if (listMoive) {

      return listMoive.map((item, index) => {

        return (
          <Grid key={index} className="mobiMoive-child" item xs={6}>
            <Paper className="moive-img">
              <img src={item.hinhAnh.replace("http", "https")} />
              <Button variant="contained" color="primary">
                <PlayArrow />
              </Button>
            </Paper>
          </Grid>
        )
      })
    }
  }
  if (listMoive && listMoive.length > 0) {
    return (
      <section className={classes.root}
        style={{
          backgroundImage: `url(${bg}), linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9))`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px 0px",
        }}
      >
        <BottomNavigation
          className={classes.btnGroup}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction

            label="Phim Đang Chiếu"
            value="nowShowing"
          />
          <BottomNavigationAction label="Phim Sắp Chiếu" value="comingSon" />
        </BottomNavigation>
        <Swiper
          loop={true}
          effect={"coverflow"}
          centeredSlides={true}
          slidesPerView={4}
          coverflowEffect={{
            rotate: 10,
            stretch: 20,
            depth: 250,
            modifier: 1,
            slideShadows: false,
          }}
          navigation={true}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 0,

            },
            640: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
          }}
          className={classes.swapper}
        >
          {listMoive.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className={classes.slider}
                style={{
                  backgroundImage: `url(${item.hinhAnh.replace("http", "https")})`

                }}
              >
                <div className="slider-content">
                  <h2 >{item.tenPhim}</h2>
                  <div className="slider-review">
                    <p className="slider-btnGroup">
                      <Button
                        onClick={() => {
                          history.push(`/DetailsMoive/${item.maPhim}`);
                        }}
                        style={{ marginRight: "10px" }}
                      >
                        <ConfirmationNumber />
                        Mua vé
                      </Button>
                      <Button
                        onClick={() => {
                          handleOpen(item.trailer);
                        }}
                        style={{ left: "-20px" }}
                      >
                        <PlayArrow style={{ marginLeft: "-5px" }} />
                        Trailer
                      </Button>
                    </p>
                    Đánh Giá :
                    <span style={{ marginLeft: "3px" }}>
                      {renderStar(item.danhGia)}
                    </span>
                    <span style={{ display: "block", marginTop: "10px" }}>
                      Ngày Khởi Chiếu :
                      <i style={{ marginLeft: "3px" }}>
                        {formatDate("dd-MM-yyy", new Date(item.ngayKhoiChieu))}
                      </i>
                    </span>
                  </div>
                </div>
                <div className="slider-bg"></div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Container maxWidth={false} className={classes.mobiMoive}>
          <Grid spacing={2} container>
            {renderMobiMoive()}
            <Grid item xs={6} style={{ margin: "20px auto" }}>
              <Button style={{ width: "100%" }} variant="outlined" color="primary"
                onClick={() => {
                  const newCout = ((filterMoive.cout + 2) >= (pagitiona.totalCount / 2)) ? (pagitiona.totalCount / 2) : (filterMoive.cout + 2);
                  setFilterMoive({
                    ...filterMoive,
                    cout: newCout
                  })
                }}
              >
                Xem Thêm
              </Button>
            </Grid>
          </Grid>

        </Container>
        <ModalUntility open={open} item={trailer} setOpen={setOpen} />
      </section >
    );
  } else {
    return "";
  }
}


function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
export default memo(CarouselHot);
