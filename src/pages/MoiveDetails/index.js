import { CircularProgress, Container, Grid, Paper } from "@material-ui/core";
import React, { memo, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GET_MOIVE_DETAILS_SAGA } from "../../redux/saga/Constants/moive-constants";
import StarRateIcon from "@material-ui/icons/StarRate";
import { useStyles } from "./style";
import formatDate from "date-format";
import dateFormat from "dateformat";
import logo2d from "../../assets/img/2d.jpg";
import Helper from "../../assets/Fakedata/Hepler";
import ConverDate from "../../assets/Fakedata/ConverDate"
const hepl = new Helper();
const initialState = {
  logo: [],
  cumRap: [],
  listMoive: [],
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
      state.cumRap = dataCumRap;
      state.listMoive = dataCumRap[0].lichChieuPhim;

      state.dayCurrent = formatDate(
        "yyyy-MM-dd",
        new Date(state.listMoive[0].ngayChieuGioChieu)
      );

      state.time = setHour(state.dayCurrent, state.listMoive);

      return { ...state };
    }
    case "SET_CINE": {
      if (payload.data && payload.maCumRap) {
        state.cumRap = payload.data;
        const listMoive = payload.data.find((item) => {
          return item.maCumRap === payload.maCumRap;
        });
        state.listMoive = listMoive.lichChieuPhim;
      } else {
        state.listMoive = payload;
      }

      state.dayCurrent = formatDate(
        "yyyy-MM-dd",
        new Date(state.listMoive[0].ngayChieuGioChieu)
      );
      state.time = setHour(state.dayCurrent, state.listMoive);

      return { ...state };
    }
    case "SET_DAY": {
      state.dayCurrent = payload;
      state.time = setHour(state.dayCurrent, state.listMoive);

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

  const renderStar = () => {
    const stars = [];
    const point = parseInt(moiveDetails.danhGia / 2);
    for (let i = 0; i < point; i++) {
      stars.push(<StarRateIcon key={i} />);
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

                dispatchCiner({
                  type: "SET_CINE",
                  payload: { data: data, maCumRap: data[0].maCumRap },
                });
              }}
            >
              <img src={item.logo} />
            </button>
          </div>
        );
      });
    }
  };

  const renderCine = () => {
    if (cine.cumRap && cine.cumRap.length > 0) {
      return cine.cumRap.map((item, index) => {
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
                alt={item.hinhAnh}
                src={process.env.PUBLIC_URL + `${item.hinhAnh}`}
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
    if (cine.listMoive && cine.listMoive.length > 0) {
      const { listMoive } = cine;
      const date = listMoive.map((item) => {
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
              <img src={moiveDetails.hinhAnh} />
            </button>
            <div style={{ marginLeft: "10px", lineHeight: "15px" }}>
              <h2>
                <span>{moiveDetails.tenPhim} </span>

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
          <Grid item xs={6} sm={4}>
            <div className={classes.img}>
              <button>
                <img src={moiveDetails.hinhAnh} />
              </button>
            </div>
          </Grid>
          <Grid style={{ paddingRight: "20px" }} item xs={6} sm={5}>
            <div className={classes.moiveName}>
              <h1>{moiveDetails.tenPhim}</h1>
              <p>Thời Lượng : 120 phút</p>
              <p>Định Dạng : 2D/Digital</p>
              <p>
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
          <Grid item xs={4} sm={2}>
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
            <Grid className={classes.logo} item sm={1}>
              {renderLogo()}
            </Grid>
            <Grid className={classes.cine} item sm={5}>
              {renderCine()}
            </Grid>
            <Grid className={classes.cineDay} item sm={6}>
              {renderDate()}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
// parseFloat(moiveDetails.danhGia * 10)
export default memo(MovieDetails);
