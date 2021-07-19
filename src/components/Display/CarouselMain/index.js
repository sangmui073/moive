import React, { memo, useEffect, useState } from "react";
import SwiperCore, { EffectCoverflow } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import "swiper/components/effect-coverflow/effect-coverflow.scss";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { useStyles } from "./style";
import ModalUntility from "../ModalUltiliti";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { GET_MOIVE_SAGA_MAIN } from "../../../redux/saga/Constants/moive-constants";

SwiperCore.use([EffectCoverflow]);

function CarouselMain() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [trailer, setTrailer] = useState(null);

  const handleModal = (bool) => {
    setOpen(bool);
  };
  const { carouselMain } = useSelector(state => state.moive);
  const [current, setCurrent] = useState(carouselMain[0]);
  let cout = 1;
  const getValue = (item) => {
    // console.log(item);
    if (item) {
      cout++;
      if (cout % 6 == 0) {
        setCurrent(item);
        // console.log(item);
        cout = 0;
      }
    }
  };
  useEffect(() => {
    console.log("useEffect")
    const url = `QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP11&soPhanTuTrenTrang=5`
    dispatch({
      type: GET_MOIVE_SAGA_MAIN,
      payload: url
    });
  }, [])
  // `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),url(${current?.hinhAnh})`
  const renderTextCarousel = () => {
    if (current && current.tenPhim) {
      return (<>
        <Typography variant="h3" >
          {current.tenPhim.length > 33 ? current.tenPhim.slice(0, 33) + "..." : current.tenPhim}
        </Typography>
        <Typography variant="subtitle1" >
          {current.moTa.length > 170
            ? current.moTa.slice(0, 170) + "..."
            : current.moTa}
        </Typography>
      </>
      )
    }
    return (
      <>
        <Typography variant="h3" >
          {carouselMain[0].tenPhim > 33 ? carouselMain[0].tenPhim.slice(0, 33) + "..." : carouselMain[0].tenPhim}
        </Typography>
        <Typography variant="subtitle1" >
          {carouselMain[0].moTa.length > 170
            ? carouselMain[0].moTa.slice(0, 170) + "..."
            : carouselMain[0].moTa}
        </Typography>
      </>
    )
  }
  if (carouselMain && carouselMain.length > 0) {
    console.log("render-2")
    return (
      <section
        className={`${classes.root}`}
        style={{
          backgroundImage: !current ? `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),url(${carouselMain[0].hinhAnh.replace("http", "https")})` : `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),url(${current.hinhAnh.replace("http", "https")})`
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={5}>
              <div className={classes.content}>
                {renderTextCarousel()}
                <p className="btn-group">
                  <Button
                    onClick={() => {
                      if (current && current?.maPhim) {
                        history.push(`/DetailsMoive/${current.maPhim}`);
                      } else {
                        history.push(`/DetailsMoive/${carouselMain[0].maPhim}`);
                      }

                    }}
                  >
                    Chi Tiết
                  </Button>
                  <Button
                    onClick={() => {
                      if (current && current?.maPhim) {
                        setTrailer(current.trailer);
                        handleModal(true);

                      } else {
                        setTrailer(carouselMain[0].trailer);
                        handleModal(true);

                      }

                    }}
                  >
                    Trailer
                  </Button>
                </p>
              </div>
            </Grid>
            <Grid item xs={12} md={12} lg={7}>
              <Swiper
                loop={true}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 10,
                  stretch: 0,
                  depth: 300,
                  modifier: 1,
                  slideShadows: false,
                }}
                breakpoints={{
                  0: {
                    slidesPerView: "auto",
                    spaceBetween: 0,
                    loop: false,
                    coverflowEffect: {
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                    }
                  },
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 0,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 0,
                  },
                }}
              >
                {carouselMain?.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      {({ isActive }) => {
                        return (
                          <button
                            style={{ position: "relative" }}
                            onClick={() => {
                              setCurrent(item);
                            }}
                            tabIndex={item.maPhim}
                          >
                            {isActive ? getValue(item) : ""}
                            <img src={item.hinhAnh.replace("http", "https")} />
                            <div className="bgHd">
                              <div className="btnGroup">

                                <Button
                                  onClick={() => {
                                    setTrailer(item.trailer);
                                    handleModal(true);
                                  }}
                                  className="btnTrailer"
                                  startIcon={<PlayCircleOutlineIcon />}
                                />
                                <Button
                                  onClick={() => {
                                    history.push(
                                      `/DetailsMoive/${item.maPhim}`
                                    );
                                  }}
                                  className="btnDetails"
                                  startIcon={<ConfirmationNumberIcon />}
                                >
                                  Chi Tiết
                                </Button>
                              </div>
                            </div>
                          </button>
                        );
                      }}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </Grid>
          </Grid>
        </Container>
        <ModalUntility open={open} item={trailer} handleModal={handleModal} />
      </section>
    );
  } else {
    console.log("render")
    return "";
  }
}
export default memo(CarouselMain);


