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
  Grid,
} from "@material-ui/core";
import { ConfirmationNumber, PlayArrow, StarRate } from "@material-ui/icons";
import formatDate from "date-format";
import bg from "../../../assets/img/bg_topmovie.png";
import { useStyles } from "./style";
import ModalUntility from "../ModalUltiliti";
import queryString from "query-string"
import useWindowSize from "../utils/Responsive";
import { GET_MOIVE_SAGA_SHOWING } from "../../../redux/saga/Constants/moive-constants";
SwiperCore.use([Navigation, EffectCoverflow, Autoplay]);

function CarouselHot() {
  const { nowShowing } = useSelector((state) => state.moive);
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState("nowShowing");
  const { width } = useWindowSize();
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
    cout: 10
  })
  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case "nowShowing": {
        setFilterMoive({
          ...filterMoive,
          currentPage: 1
        });
        break;
      }
      case "comingSon": {
        setFilterMoive({
          ...filterMoive,
          currentPage: 2
        });
        break;
      }
    }
  };
  console.log(nowShowing)
  const [trailer, setTrailer] = useState(null);
  const dispatch = useDispatch()
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
  console.log(width)
  const renderMobiMoive = () => {

  }
  if (nowShowing && nowShowing.length > 0) {
    return (
      <section
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
          {nowShowing.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className={classes.slider}
                style={{
                  backgroundImage: `url(${item.hinhAnh})`

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
        <Grid className={classes.mobiMoive}>
          {renderMobiMoive()}
        </Grid>
        <ModalUntility open={open} item={trailer} setOpen={setOpen} />
      </section>
    );
  } else {
    return "";
  }
}

export default memo(CarouselHot);
