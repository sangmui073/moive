import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Container,
  Grid,
  Paper,
} from "@material-ui/core";
import React, { memo, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_CINEMA_LIST_SAGA } from "../../../redux/saga/Constants/cinema-constants";

import ArrowDown from "@material-ui/icons/KeyboardArrowDown";
import AlarmIcon from "@material-ui/icons/Alarm";
import { useStyles } from "./style";
import { useHistory } from "react-router";
const initialState = {
  listCinema: [],
  listCumrap: [],
  listMoive: [],
  maPhim: "",
};
const theatersReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_THEATERS": {
      state.listCinema = payload;
      state.listCumrap = state.listCinema[0];
      state.listMoive = state.listCumrap.lstCumRap[0];
      state.maPhim = state.listMoive.danhSachPhim[0].maPhim;
      return { ...state };
    }
    case "SET_SYSTEM": {
      const newSystem = state.listCinema.find((item) => {
        return item.maHeThongRap == payload;
      });
      state.listCumrap = newSystem;
      state.listMoive = newSystem.lstCumRap[0];
      const newMaPhim = state.listMoive.danhSachPhim[0].maPhim;
      state.maPhim = newMaPhim;
      return { ...state };
    }
    case "SET_MOIVE": {
      const newListMoive = state.listCumrap.lstCumRap.find((item) => {
        return item.maCumRap == payload;
      });
      state.listMoive = newListMoive;
      const newMaPhim = newListMoive.danhSachPhim[0].maPhim;
      state.maPhim = newMaPhim;

      return { ...state };
    }
    default:
      return state;
  }
};
function TheatersCluster() {
  const classes = useStyles();
  const { cinemaList } = useSelector((state) => state.cinema);
  const dispatch = useDispatch();
  let [theaters, dispatchTheaters] = useReducer(theatersReducer, initialState);
  const [listCine, setValue] = React.useState(0);
  useEffect(() => {
    dispatch({
      type: GET_CINEMA_LIST_SAGA,
    });
  }, []);
  const history = useHistory();

  useEffect(() => {
    if (cinemaList.length > 0 && cinemaList) {
      const action = {
        type: "SET_THEATERS",
        payload: cinemaList,
      };
      dispatchTheaters(action);
    }
  }, [cinemaList]);
  const renderLogo = () => {
    const { listCinema } = theaters;
    return (
      <BottomNavigation
        value={listCine}
        onChange={(event, newValue) => {
          const elements = document.querySelectorAll(".cineSystem");
          for (let i = 0; i < elements.length; i++) {
            if (i === 0) {
              elements[i].style.opacity = "1";
            } else {
              elements[i].style.opacity = "0.3";
            }
          }
          setValue(newValue);
        }}
        showLabels
      >
        {listCinema?.map((item, index) => {
          if (index === 0) {
            return (
              <BottomNavigationAction
                onClick={() => {
                  const action = {
                    type: "SET_SYSTEM",
                    payload: item.maHeThongRap,
                  };
                  dispatchTheaters(action);
                }}
                icon={
                  <img
                    style={{ display: "block", width: "100%", height: "100%" }}
                    src={item.logo}
                  />
                }
                style={{ marginTop: "0px" }}
                key={index}
              ></BottomNavigationAction>
            );
          }
          return (
            <BottomNavigationAction
              key={index}
              onClick={() => {
                const action = {
                  type: "SET_SYSTEM",
                  payload: item.maHeThongRap,
                };
                dispatchTheaters(action);
              }}
              icon={
                <img
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                  }}
                  src={item.logo}
                />
              }
            />
          );
        })}
      </BottomNavigation>
    );
  };
  const renderTheaterSystem = () => {
    const { listCumrap } = theaters;

    return listCumrap?.lstCumRap?.map((item, index) => {
      if (index === 0) {
        return (
          <div
            className="cineSystem"
            style={{ marginTop: "0", cursor: "pointer" }}
            key={index}
            onClick={(event) => {
              const elements = document.querySelectorAll(".cineSystem");
              for (let i = 0; i < elements.length; i++) {
                elements[i].style.opacity = "0.3";
              }
              event.currentTarget.style.opacity = "1";
              const action = {
                type: "SET_MOIVE",
                payload: item.maCumRap,
              };
              dispatchTheaters(action);
            }}
          >
            <h4>
              {item.tenCumRap.length > 30
                ? item.tenCumRap.substr(0, 30) + "..."
                : item.tenCumRap}
            </h4>
            <span style={{ display: "block" }}>
              {item.diaChi.length > 30
                ? item.diaChi.substr(0, 30) + " ..."
                : item.diaChi}
            </span>
            <a
              style={{ color: "rgb(254, 121, 0)" }}
              onClick={() => {
                history.push(`/TheaterDetails/${listCumrap.maHeThongRap}`);
              }}
            >
              {"[Chi Tiết]"}
            </a>
          </div>
        );
      }
      return (
        <div
          className="cineSystem"
          key={index}
          style={{
            cursor: "pointer",
            opacity: "0.3",
            transition: "ease-out .5s",
          }}
          onClick={(event) => {
            const elements = document.querySelectorAll(".cineSystem");
            for (let i = 0; i < elements.length; i++) {
              elements[i].style.opacity = "0.3";
            }
            event.currentTarget.style.opacity = "1";
            const action = {
              type: "SET_MOIVE",
              payload: item.maCumRap,
            };
            dispatchTheaters(action);
          }}
        >
          <h4>{item.tenCumRap.length > 30
            ? item.tenCumRap.substr(0, 30) + "..."
            : item.tenCumRap}</h4>
          <span style={{ display: "block" }}>
            {item.diaChi.length > 30
              ? item.diaChi.substr(0, 30) + " ..."
              : item.diaChi}
          </span>
          <a
            style={{ color: "rgb(254, 121, 0)" }}
            onClick={() => {
              history.push(`/TheaterDetails/${listCumrap.maHeThongRap}`);
            }}
          >
            {"[Chi Tiết]"}
          </a>
        </div>
      );
    });
  };
  const renderMoiveList = () => {
    const { listMoive, maPhim } = theaters;
    const { danhSachPhim } = listMoive;
    if (danhSachPhim && danhSachPhim.length > 0) {
      return (
        <>
          {danhSachPhim.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  padding: "5px",
                  borderBottom: "1px solid  rgba(0, 0, 0, 0.1)",
                }}
              >
                <p
                  style={{
                    marginLeft: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <a style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
                    <img
                      src={item.hinhAnh}
                      style={{
                        width: "65px",
                        height: "65px",
                        display: "block",
                      }}
                    />
                  </a>
                  <span style={{ marginLeft: "30px" }}>
                    <b style={{ display: "block" }}>
                      <Button
                        size="small"
                        style={{
                          backgroundColor: "rgb(254, 121, 0)",
                          color: "#fff",
                          marginRight: "10px",
                          minWidth: "35px",
                        }}
                        onClick={(event) => {
                          history.push(`/DetailsMoive/${item.maPhim}`);
                        }}
                      >
                        2D
                      </Button>
                      {item.tenPhim.length > 30
                        ? item.tenPhim.substr(0, 30) + "..."
                        : item.tenPhim}
                    </b>
                    <i style={{ marginTop: "10px", display: "block" }}>
                      120 phút - 7 - IMBDb 6.9
                    </i>
                  </span>
                </p>
              </div>
            );
          })}
        </>
      );
    }
  };

  return (
    <>
      <Container className={classes.root} maxWidth="md">
        <h1 className={classes.title}>
          <span className="fist">Cụm Rạp</span>
          <span className="last">Cụm Rạp</span>
        </h1>
        <Paper className="container-Pager" elevation={3}>
          <Grid container spacing={1}>
            <Grid
              className={`utility ${classes.logo}`}
              item
              xs={12}
              item
              sm={1}
            >
              {renderLogo()}
            </Grid>
            <Grid
              className={`utility ${classes.system}`}
              item
              xs={12}
              item
              sm={4}
            >
              {renderTheaterSystem()}
            </Grid>
            <Grid
              item
              xs={12}
              item
              sm={7}
              className={`utility ${classes.moive}`}
            >
              {renderMoiveList()}
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Container maxWidth="lg" className={classes.mobi}>
        {theaters.listCinema.map((item, index) => {
          // console.log(item);
          let bolen = false;
          return (
            <Paper key={index} className="mobi-theaters">
              <div
                className="mobi-logo"
                onClick={(e) => {
                  const elements = document.querySelectorAll(".mobi-systems");

                  for (let i = 0; i < elements.length; i++) {
                    elements[i].classList.remove("active");
                  }
                  if (!bolen) {
                    e.currentTarget.nextElementSibling.classList.add("active");
                    bolen = true;
                  } else {
                    e.currentTarget.nextElementSibling.classList.remove(
                      "active"
                    );
                    bolen = false;
                  }
                }}
              >
                <Button>
                  <img src={item.logo} />
                </Button>
                <p>
                  {item.tenHeThongRap}
                  <ArrowDown style={{ fill: "#fe7900" }} />
                </p>
              </div>
              <div className="mobi-systems">
                {item.lstCumRap.map((rap, index) => {
                  let bol = false;
                  return (
                    <div className="systems" key={index}>
                      <div
                        style={{
                          transition: "all 0.7s",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={(e) => {
                          const elements =
                            document.querySelectorAll(".moive-wapper");
                          for (let i = 0; i < elements.length; i++) {
                            elements[i].classList.remove("active-moive");
                          }
                          if (!bol) {
                            e.currentTarget.nextElementSibling.classList.add(
                              "active-moive"
                            );
                            bol = true;
                          } else {
                            e.currentTarget.nextElementSibling.classList.remove(
                              "active-moive"
                            );
                            bol = false;
                          }
                        }}
                      >
                        {/* <Button className="btn-waper">
                          <img
                            style={{
                              marginRight: "15px",
                            }}
                            src={`https://picsum.photos/250/300?random=${index}`}
                          />
                        </Button> */}

                        <div>
                          <p>
                            <span style={{ marginRight: "25px" }}>
                              Tên Rạp:
                            </span>
                            <b>{rap.tenCumRap}</b>
                          </p>
                          <p>
                            <span style={{ marginRight: "25px" }}>
                              Địa Chỉ:
                            </span>
                            <span style={{ marginLeft: "5px" }}>
                              {rap.diaChi.length > 40
                                ? rap.diaChi.substr(0, 40) + "..."
                                : rap.diaChi}
                            </span>
                          </p>
                          <p style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button
                              style={{
                                color: "#fff",
                                background: "rgb(254, 121, 0)",
                              }}
                            >
                              [chi tiết]
                            </Button>
                            <ArrowDown style={{ fill: "#fe7900" }} />
                          </p>
                        </div>
                      </div>
                      <div className="moive-wapper">
                        {rap.danhSachPhim.map((phim, index) => {
                          return (
                            <div className="moive" key={index}>
                              <Button className="btn-waper">
                                <img src={phim.hinhAnh} />
                              </Button>
                              <p style={{ marginLeft: "10px" }}>
                                <span
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "5px 0px",
                                  }}
                                >
                                  <AlarmIcon /> : 120p
                                </span>
                                <Button
                                  color="primary"
                                  variant="contained"
                                  size="small"
                                  onClick={() => {
                                    history.push(
                                      `/DetailsMoive/${phim.maPhim}`
                                    );
                                  }}
                                >
                                  Chi Tiết
                                </Button>
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Paper>
          );
        })}
      </Container>
    </>
  );
}

export default memo(TheatersCluster);
