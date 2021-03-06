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
  const handleOpen = (trailer) => {
    setTrailer(trailer);
    setOpen(true);
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
          {current.tenPhim}
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
          {carouselMain[0].tenPhim}
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
    return (
      <section
        className={`${classes.root}`}
        style={{
          backgroundImage: !current ? `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),url(${carouselMain[0].hinhAnh})` : `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),url(${current.hinhAnh})`
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid className={`${classes.anitext}  carousel-text`} item xs={5}>
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
                    Chi Ti???t
                  </Button>
                  <Button
                    onClick={() => {
                      if (current && current?.maPhim) {
                        handleOpen(current.trailer);

                      } else {
                        handleOpen(carouselMain[0].trailer);

                      }

                    }}
                  >
                    Trailer
                  </Button>
                </p>
              </div>
            </Grid>
            <Grid className={`${classes.aniImg} carousel-img`} item xs={12} md={7}>
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
                    slidesPerView: 2,
                    spaceBetween: 0,
                  },
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 0,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 0,
                  },
                  1024: {
                    slidesPerView: 3,
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
                            <img src={item.hinhAnh} />
                            <div className="bgHd">
                              <div className="btnGroup">
                                {/* <Button
                                  onClick={() => {
                                    handleOpen(item.trailer);
                                  }}
                                  className="btnTrailer"
                                  startIcon={<PlayCircleOutlineIcon />}
                                ></Button> */}
                                <Button
                                  onClick={() => {
                                    handleOpen(item.trailer);
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
                                  Chi Ti???t
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
        <ModalUntility open={open} item={trailer} setOpen={setOpen} />
      </section>
    );
  } else {
    return "";
  }
}
export default memo(CarouselMain);


