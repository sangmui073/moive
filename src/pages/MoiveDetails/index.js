import { CircularProgress, Container, Grid, Paper, Button } from "@material-ui/core";
import React, { memo, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GET_MOIVE_DETAILS_SAGA } from "../../redux/saga/Constants/moive-constants";
import { StarRate, PlayCircleOutline, KeyboardArrowDown, KeyboardArrowUp, Event, Timer } from "@material-ui/icons";
import { useStyles } from "./style";
import formatDate from "date-format";
import dateFormat from "dateformat";
import logo2d from "../../assets/img/2d.jpg";
import Helper from "../../assets/Fakedata/Hepler";
import ConverDate from "../../assets/Fakedata/ConverDate"
import ModalUntility from "../../components/Display/ModalUltiliti";
const hepl = new Helper();
const initialState = {
  logo: [],
  cumRap: {
    maHeThong: "",
    list: []
  },
  listMoive: {
    maCumRap: "",
    list: []
  },
  dayCurrent: "",
  time: [],
};
dateFormat.i18n = ConverDate;
const setHour = (dayCurrent, listMoive) => {
  const time = listMoive.filter((item) => {
    return (
      dayCurrent === formatDate("yyyy-MM-dd", new Date(item.ngayChieuGioChieu))
    );
  });
  return time;
};
const handleStyle = (e, cls, active) => {
  const element = document.querySelectorAll(cls);
  for (let i = 0; i < element.length; i++) {
    element[i].classList.remove(active);
  }
  e.currentTarget.classList.add(active);
};
const handleResetStyle = (cls, act) => {
  const elements = document.querySelectorAll(cls);
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove(act);
  }
  document.querySelector(cls).classList.add(act);
};
const thearsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_LOGO": {
      const newLogo = payload.map((item) => {
        return {
          logo: item.logo,
          maHeThong: item.maHeThongRap,
        };
      });
      state.logo = newLogo;

      const dataCumRap = hepl.formatDataCine(
        payload[0].maHeThongRap,
        payload[0].cumRapChieu
      );
      state.cumRap.list = dataCumRap;
      state.listMoive.list = dataCumRap[0].lichChieuPhim;

      state.dayCurrent = formatDate(
        "yyyy-MM-dd",
        new Date(state.listMoive.list[0].ngayChieuGioChieu)
      );

      state.time = setHour(state.dayCurrent, state.listMoive.list);

      return { ...state };
    }
    case "SET_CINE": {
      if (payload.data && payload.maCumRap) {

        state.cumRap.list = payload.data;
        const listMoive = payload.data.find((item) => {
          return item.maCumRap === payload.maCumRap;
        });
        state.listMoive.list = listMoive.lichChieuPhim;
      } else {
        state.listMoive.list = payload;
      }

      state.dayCurrent = formatDate(
        "yyyy-MM-dd",
        new Date(state.listMoive.list[0].ngayChieuGioChieu)
      );
      state.time = setHour(state.dayCurrent, state.listMoive.list);

      return { ...state };
    }
    case "SET_DAY": {
      state.dayCurrent = payload;
      state.time = setHour(state.dayCurrent, state.listMoive.list);

      return { ...state };
    }
    default:
      return state;
  }
};

function MovieDetails() {
  const classes = useStyles();
  const { phim } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { moiveDetails } = useSelector((state) => state.moive);
  const { heThongRapChieu } = moiveDetails;
  let [cine, dispatchCiner] = useReducer(thearsReducer, initialState);
  const [open, setOpen] = useState(false)
  const handleModal = (bool) => {
    setOpen(bool)
  }

  const renderStar = () => {
    const stars = [];
    const point = parseInt(moiveDetails.danhGia / 2);
    for (let i = 0; i < point; i++) {
      stars.push(<StarRate key={i} />);
    }
    return stars;
  };

  useEffect(() => {
    dispatch({
      type: GET_MOIVE_DETAILS_SAGA,
      payload: phim,
    });
  }, []);
  useEffect(() => {
    if (heThongRapChieu && heThongRapChieu.length > 0) {
      const action = {
        type: "SET_LOGO",
        payload: heThongRapChieu,
      };
      dispatchCiner(action);
    }
  }, [heThongRapChieu]);
  const renderDayMobie = () => {
    const date = cine.listMoive.list.map((item) => {
      return formatDate("yyyy-MM-dd", new Date(item.ngayChieuGioChieu));
    })
    const unique = [...new Set(date)];
    return unique.map((day, index) => {
      return <Grid item xs={4} key={index}>
        <Paper onClick={() => {
          dispatchCiner({
            type: "SET_DAY",
            payload: day,
          });
        }}>
          <Button variant="outlined" color="primary" startIcon={<Event />}>
            {dateFormat(day, "dd-mm")}
          </Button>
        </Paper>

      </Grid>
    })
  }

  const renderLogo = () => {

    if (cine.logo.length > 0 && cine.logo) {
      return cine.logo.map((item, index) => {
        return (
          <div
            className={index === 0 ? `logo-child active` : `logo-child`}
            key={index}
            onClick={(e) => {
              handleStyle(e, ".logo-child", "active");
              handleResetStyle(".cine-child", "active");
              handleResetStyle(".btn-day", "active-color");
            }}
          >
            <button
              onClick={() => {
                const rapChieu = heThongRapChieu.find((rap) => {
                  return item.maHeThong === rap.maHeThongRap;
                });
                const data = hepl.formatDataCine(
                  item.maHeThong,
                  rapChieu.cumRapChieu
                );
                if (item.maHeThong === cine.cumRap.maHeThong) {
                  cine.cumRap.maHeThong = ""
                } else {
                  cine.cumRap.maHeThong = item.maHeThong
                }
                dispatchCiner({
                  type: "SET_CINE",
                  payload: { data: data, maCumRap: data[0].maCumRap },
                });
              }}
            >
              <img src={item.logo.replace("http", "https")} />
              <span className="mobie-cineName" >
                <span>{heThongRapChieu[index]?.tenHeThongRap}</span>
                <span>  {item.maHeThong === cine.cumRap.maHeThong ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</span>
              </span>
            </button>
            <div className={item.maHeThong === cine.cumRap.maHeThong ? "mobi-theater" : "mb-hidden"}>
              {cine.cumRap.list.map((rapChieu, index) => {
                return (
                  <div className="theater" key={index}>
                    <Paper style={{ margin: "10px 0px", }}
                    >
                      <Paper onClick={() => {
                        if (rapChieu.maCumRap === cine.listMoive.maCumRap) {
                          cine.listMoive.maCumRap = ""
                        } else {
                          cine.listMoive.maCumRap = rapChieu.maCumRap
                        }
                        dispatchCiner({
                          type: "SET_CINE",
                          payload: rapChieu.lichChieuPhim
                        })

                      }}>
                        <Grid alignItems="center" container spacing={2}>
                          <Grid item xs={3}>
                            <img style={{ width: "100%", height: "80px" }} src={rapChieu.hinhAnh} />
                          </Grid>
                          <Grid item xs={7}>
                            <p>
                              <span>{rapChieu.tenCumRap}</span>
                            </p>
                          </Grid>
                          <Grid item xs={1}>
                            <span>
                              {rapChieu.maCumRap === cine.listMoive.maCumRap ? <KeyboardArrowUp /> : <KeyboardArrowDown />}

                            </span>
                          </Grid>
                        </Grid>
                      </Paper>

                      <Paper style={{ margin: "5px 0" }} className={rapChieu.maCumRap === cine.listMoive.maCumRap ? "mobie-canlendar" : "mb-hidden"}>
                        <Grid alignItems="center" container>
                          <Grid item xs={3}>
                            <img
                              style={{
                                width: "50px",
                                height: "50px",
                                display: "inline-block",
                              }}
                              src={logo2d}
                            />
                          </Grid>
                          <Grid item xs={9}>
                            113 phút - TIX 8.5 - IMDb 0
                          </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                          {renderDayMobie()}
                        </Grid>
                        <Grid style={{ padding: "15px 0" }} container spacing={1}>
                          {cine.time.map((hour, index) => {

                            return <Grid item xs={4} key={index}>
                              <Paper>
                                <Button variant="outlined" color="primary" startIcon={<Timer />}
                                  onClick={() => {
                                    history.push(`/Booking/${hour.maLichChieu}`)
                                  }}
                                >
                                  {dateFormat(hour.ngayChieuGioChieu, "HH:MM")}
                                </Button>
                              </Paper>
                            </Grid>
                          })}
                        </Grid>
                      </Paper>
                    </Paper>

                  </div>
                )
              })}

            </div>



          </div>
        );
      });
    }
  };

  const renderCine = () => {
    if (cine.cumRap.list && cine.cumRap.list.length > 0) {
      return cine.cumRap.list.map((item, index) => {
        return (
          <div
            style={{ cursor: "pointer" }}
            className={index === 0 ? `cine-child active` : `cine-child`}
            key={index}
            onClick={(e) => {
              handleStyle(e, ".cine-child", "active");
              handleResetStyle(".btn-day", "active-color");

              dispatchCiner({
                type: "SET_CINE",
                payload: item.lichChieuPhim,
              });
            }}
          >
            <div className="cine-img">
              <img
                alt={item.hinhAnh.replace("http", "https")}
                src={process.env.PUBLIC_URL + `${item.hinhAnh.replace("http", "https")}`}
              />
            </div>
            <div className="cine-andress">
              <p> Tên Rạp : {item.tenCumRap}</p>
              <p>
                Địa Chỉ :{" "}
                {item.diaChi.length > 35
                  ? item.diaChi.substr(0, 35) + "..."
                  : item.diaChi}
              </p>
              <button>[..Bản Đồ..]</button>
            </div>
          </div>
        );
      });
    }
  };

  const renderDate = () => {
    if (cine.listMoive.list && cine.listMoive.list.length > 0) {
      const { listMoive } = cine;
      const date = listMoive.list.map((item) => {
        return formatDate("yyyy-MM-dd", new Date(item.ngayChieuGioChieu));
      });
      const unique = [...new Set(date)];

      return (
        <>
          <div className="cine-date">
            {unique.map((day, index) => {
              return (
                <button
                  className={index === 0 ? `btn-day active-color` : `btn-day`}
                  key={index}
                  onClick={(e) => {
                    handleStyle(e, ".btn-day", "active-color");

                    dispatchCiner({
                      type: "SET_DAY",
                      payload: day,
                    });
                  }}
                >
                  <span style={{ display: "block" }}>
                    {dateFormat(new Date(day), "dddd")}
                  </span>
                  <span>{dateFormat(new Date(day), "dd-mm")}</span>
                </button>
              );
            })}
          </div>
          <div style={{ padding: "10px 5px", display: "flex" }}>
            <button
              style={{
                width: "70px",
                height: "80px",
                padding: "0",
                border: "none",
              }}
            >
              <img src={moiveDetails.hinhAnh.replace("http", "https")} />
            </button>
            <div style={{ marginLeft: "10px", lineHeight: "15px" }}>
              <h2>
                <span>{moiveDetails.tenPhim.length > 20 ? moiveDetails.tenPhim.substr(0, 20) + "..." : moiveDetails.tenPhim} </span>

              </h2>
              <p>
                120 phút - 7 - IMBDb 6.9
              </p>
            </div>

          </div>
          <p style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{
                width: "50px",
                height: "50px",
                display: "inline-block",
              }}
              src={logo2d}
            />
            {cine.time.map((hour, index) => {
              return (
                <button onClick={(e) => {
                  document.querySelectorAll(".btn-hour").forEach((element) => {
                    element.classList.remove("active-hour")
                  })
                  e.currentTarget.classList.add("active-hour");

                  history.push(`/Booking/${hour.maLichChieu}`)
                }} className="btn-hour" style={{ marginLeft: `${index === 0 ? "20px" : "10px"}` }} key={index}>

                  {formatDate("hh:mm", new Date(hour.ngayChieuGioChieu))}
                </button>
              );
            })}
          </p>

        </>
      );
    }
  };
  return (
    <div className={`${classes.root} box`}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <div className={classes.img}>
              <button >
                <img src={moiveDetails.hinhAnh?.replace("http", "https")} />
              </button>
              <div className="bg-hd" onClick={() => {
                handleModal(true)
              }}>
                <PlayCircleOutline style={{ fontSize: "4.1875rem", fill: "rgb(177 171 171)" }} />
              </div>
            </div>
          </Grid>
          <Grid className="details-content" style={{ paddingRight: "20px" }} item xs={12} sm={6}>
            <div className={classes.moiveName}>
              <h1>{moiveDetails.tenPhim}</h1>
              <p>Thời Lượng : 120 phút</p>
              <p>Định Dạng : 2D/Digital</p>
              <p className="details-des">
                Nội Dung :{" "}
                {moiveDetails?.moTa?.length > 400
                  ? moiveDetails?.moTa.substr(0, 400) + " ..."
                  : moiveDetails?.moTa}
              </p>
              <p>
                Ngày Khởi Chiếu :{" "}
                {formatDate("dd-MM-yyyy", new Date(moiveDetails.ngayKhoiChieu))}
              </p>
            </div>
          </Grid>
          <Grid item className="details-review" xs={12} sm={2}>
            <div className={classes.review}>
              <CircularProgress
                className={classes.process}
                variant="determinate"
                thickness={3.6}
                value={parseFloat(moiveDetails.danhGia * 10)}
              />
              <div className={classes.point}>
                <h1>{parseFloat(moiveDetails.danhGia).toString()}</h1>
              </div>
              <div className={classes.stars}>{renderStar()}</div>
            </div>
          </Grid>
        </Grid>
        <h1
          style={{ padding: "25px 0px", color: "#fe7900", textAlign: "center" }}
        >
          Cụm Rạp
        </h1>
        <Paper elevation={3}>
          <Grid container>
            <Grid className={classes.logo} item xs={12} sm={1}>
              {renderLogo()}
            </Grid>
            <Grid className={classes.cine} item xs={12} sm={5}>
              {renderCine()}
            </Grid>
            <Grid className={classes.cineDay} item xs={12} sm={6}>
              {renderDate()}
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <ModalUntility handleModal={handleModal} item={moiveDetails.trailer} open={open} />
    </div>
  );
}
// parseFloat(moiveDetails.danhGia * 10)
export default memo(MovieDetails);
