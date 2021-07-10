import React, { memo, useEffect, useMemo, useState } from "react";
import { useHistory, useParams, Prompt } from "react-router-dom";
import TabPanel from "../../components/Display/TabPanel"
import { Weekend, Home, PermContactCalendar, Theaters, LocationCity, MonetizationOn } from '@material-ui/icons';
import { Avatar, AppBar, Tabs, Tab, Grid, Button, Paper } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import { useDispatch, useSelector } from "react-redux";
import { CHECK_OUT_SAGA, GET_BOOKING_SAGA } from "../../redux/saga/Constants/booking-constants";
import { CHECK_OUT, CHOICE_CHAIRS } from "../../redux/reducer/Constants/booking-constants"
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content"
import Clock from "../../components/Display/Clock";
import { useStyles } from "./style"
let listGhe = [];
const arrayString = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "j"]

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function Booking() {
  const user = JSON.parse(localStorage.getItem("user"))
  const { suatChieu } = useParams();
  const classes = useStyles();
  const MySwal = withReactContent(Swal)
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const { moiveInfo, listChairs, chairChoices } = useSelector((state) => state.booking);
  const [ticketType, setTicketType] = useState({
    listTicket: [
      { maVe: "thuong", tenVe: "Vé Thường", price: 75000, cout: 0 },
      { maVe: "vip", tenVe: "Vé Vip", price: 90000, cout: 0 },
    ],
    total: 0
  });
  const [valid, setValid] = useState(false)
  useEffect(() => {
    dispatch({
      type: GET_BOOKING_SAGA,
      payload: suatChieu
    })
    return () => {
      listGhe = []
    }
  }, [])

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 1: {
        if (ticketType.total > 0) {
          setValue(newValue);
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Bạn phải chọn vé trước',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
        break;
      }
      case 2: {
        if (ticketType.total > 0) {
          if (chairChoices.length > 0) {
            setValue(newValue);
          } else {
            Swal.fire({
              title: 'Error!',
              text: 'Bạn phải chọn ghế trước',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Bạn phải chọn vé trước',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }

        break
      }
      default: {
        setValue(newValue);
        break;
      }

    }
    setValue(newValue);

  };
  console.log(listGhe)
  if (moiveInfo && moiveInfo.tenCumRap) {
    var [fistName, lastName] = moiveInfo.tenCumRap.split("-");
  }
  const handleCout = (tick, bool) => {

    const newTick = ticketType.listTicket.find((item) => {
      return item.maVe === tick.maVe
    })
    if (bool) {
      newTick.cout++;
    } else {
      newTick.cout--;
    }
    if (newTick.cout < 0) {
      newTick.cout = 0
    }
    const total = ticketType.listTicket.reduce((num, item) => {

      return num += (item.cout * item.price)
    }, 0);

    ticketType.total = total;
    setTicketType({ ...ticketType })
  }

  const handleChoice = (ghe, index, id) => {
    let indexGhe = listGhe.findIndex((item) => {
      return item.maGhe === ghe.maGhe
    });
    if (indexGhe === -1) {
      listGhe.push({ ...ghe, stt: arrayString[index] + (id + 1) })
    } else {
      listGhe.splice(indexGhe, 1)
    }
    const price = listGhe.reduce((num, chair) => {
      return num += chair.giaVe
    }, 0)

    if (price > ticketType.total) {
      Swal.fire({
        title: 'Error!',
        text: 'giá vé vượt mức đặt',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      listGhe.pop();
    } else {

      dispatch({
        type: CHOICE_CHAIRS,
        payload: {
          list: listGhe,
          ghe: ghe
        }
      })
    }
  }
  const renderListChairs = () => {
    return listChairs.map((chair, index) => {
      return (
        <tr key={index}>
          {chair.map((ghe, id) => {

            return (
              < td key={id} style={{ paddingRight: `${id == 1 || id === 13 ? "25px" : "0"}`, position: "relative" }}>
                <Button className={ghe.daDat ? "chair choice" : "chair"} disabled={ghe.daDat ? true : false}

                >
                  <Weekend style={{ fill: ghe.loaiGhe === "Vip" ? "#f7b500" : "#fff", }}
                    className={ghe.dangChon ? classes.chairChoice : ""}

                  />
                  <span className="number-chair" style={{ cursor: ghe.daDat ? "no-drop" : "pointer", width: `${id == 1 || id == 13 ? "65%" : "100%"}` }}
                    onClick={() => {
                      handleChoice(ghe, index, id)
                    }}
                  >  {ghe.dangChon ? id + 1 : ""}</span>
                </Button>
              </td>
            )
          })
          }
        </tr >
      )
    })
  }
  return (
    <div className={`${classes.root} box`}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">

          <Tab style={{ display: `${value === 2 ? "none" : "inline-flex"}` }} label="01-Chọn Loại Vé" {...a11yProps(0)} />
          <Tab style={{ display: `${value === 2 ? "none" : "inline-flex"}` }} label="02-Chọn Ghế" {...a11yProps(1)} />
          <Tab label="03-Thanh Toán" {...a11yProps(2)} />
        </Tabs>
        <Button style={{ width: "150px", margin: "10px auto 0px auto", background: "rgb(254, 121, 0)", color: "#fff" }} startIcon={<Home style={{ fill: "#fff" }} />}
          onClick={() => {
            if (valid) {
              MySwal.fire({
                icon: "warning",
                title: <p style={{ fontSize: "14px" }}>Bạn Chắc Muốn Rời Khỏi</p>,
                showCancelButton: true,

              }).then((result) => {
                if (result.isConfirmed) {
                  history.push("/")
                }
              })
            } else {
              history.push("/")
            }

          }}
        >
          Trang Chủ
        </Button>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid className={classes.choosingChair} item xs={12} md={5} lg={3}>
          <img src={moiveInfo.hinhAnh?.replace("http", "https")} />
          <div className="bg-content">
            <div className="content">
              <p>
                {moiveInfo.ngayChieu}
              </p>
              <p>
                <button>2D</button>
                <span>{moiveInfo.tenPhim}</span>
              </p>
              <p>
                120 phút - 7 - IMBDb 6.9
              </p>
            </div>
          </div>
        </Grid>
        <Grid className={classes.isBooking} item xs={12} md={7} lg={8}>
          <div className="cinema-name">
            <h2>
              <span style={{ color: "rgb(254, 121, 0)" }}>{fistName}</span>-<span>{lastName}</span>
            </h2>
            <p>
              <span>{moiveInfo.ngayChieu}</span> - <span>{moiveInfo.gioChieu}</span> - <button>{moiveInfo.tenRap}</button>
            </p>
            <p>
              {moiveInfo.diaChi}
            </p>
          </div>
          <table className="ticket-type">
            <tbody>
              {ticketType.listTicket.map((tick, index) => {
                return (
                  <tr className="ticket-item" key={index}>
                    <td style={index === 1 ? { textAlign: "left", borderTop: "1px solid rgba(0, 0, 0, 0.3)", paddingTop: "25px" } : { paddingBottom: "25px", textAlign: "left", borderTop: "none" }
                    }>{tick.tenVe}</td>
                    <td style={index === 1 ? { borderTop: "1px solid rgba(0, 0, 0, 0.3)", paddingTop: "25px" } : { paddingBottom: "25px", borderTop: "none" }}>{tick.price.toLocaleString() + "đ"}</td>
                    <td style={index === 1 ? { borderTop: "1px solid rgba(0, 0, 0, 0.3)", paddingTop: "25px" } : { paddingBottom: "25px", borderTop: "none" }}>
                      <button onClick={() => {
                        handleCout(tick, false)
                      }}>-</button>
                      <span>{tick.cout}</span>
                      <button onClick={() => {
                        handleCout(tick, true)
                      }}>+</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="total-price">
            <p >
              <span style={{ fontSize: "16px", color: "rgba(0, 0, 0, 0.3)" }}>Tổng Tiền</span>
              <span className="price">{ticketType.total.toLocaleString() + "đ"}</span>
            </p>
            <button className="btn-total" onClick={() => {
              if (ticketType.total > 0) {
                setValue(1);
                setValid(true)
              } else {
                Swal.fire({
                  title: 'Error!',
                  text: 'Bạn phải chọn vé trước',
                  icon: 'error',
                  confirmButtonText: 'Ok'
                })
              }

            }}>Chọn Ghế</button>
          </div>
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <p style={{ color: "rgba(0, 0, 0, 0.3)" }}>Xin lưu ý bạn không thể đổi hay hủy suất chiếu cho vé đã mua</p>
            <div>
              <span style={{ fontSize: "20px" }}>HOTLINE : </span>
              <b style={{ fontSize: "30px" }}>18001560</b>
            </div>
          </div>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid className={classes.listChairs} item xs={12} sm={12} md={9}>
          <div className="clock-name">
            <div>
              <h2><span style={{ color: "rgb(254, 121, 0)" }}>{fistName}</span> - <span>{lastName}</span> </h2>
              <p>{moiveInfo.ngayChieu} - {moiveInfo.gioChieu} - {moiveInfo.tenRap}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ margin: "5px", fontSize: "12px" }}>Thời Gian Giữ Ghế</p>
              <Clock setValue={setValue} />

            </div>
          </div>
          <div className="screen">

          </div>

          <Grid container className="list-chairs" spacing={1}>

            <Grid className="list-string" item xs={1} sm={1} md={1}>
              {arrayString.map((string, index) => {
                return (
                  <Button key={index} variant="text">
                    {string}
                  </Button>
                )
              })}
            </Grid>
            <Grid className="chairs-container" item xs={11} sm={11} md={11}>
              <p className="name-screen">Màn Hình</p>
              <table className="table-chairs">
                <tbody>
                  {renderListChairs()}
                </tbody>
              </table>
              <div className="menu-chair">
                <p>
                  <Weekend style={{ fill: "#fff" }} />
                  <span>Thường</span>
                </p>
                <p>
                  <Weekend style={{ fill: "rgb(247, 181, 0)" }} />
                  <span>Vip</span>
                </p>
                <p>
                  <Weekend style={{ fill: "#44c020" }} />
                  <span>Đang chọn</span>
                </p>
                <p>
                  <Weekend style={{ fill: "red" }} />
                  <span>Có người Đặt</span>
                </p>
              </div>

            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.profieBooking} item xs={12} sm={12} md={3}>
          <div style={{ display: "flex", flexDirection: "column", height: "100%", }}>
            <p className="profie-price">
              {ticketType.total.toLocaleString() + "đ"}
            </p>
            <div className="profie-listmoive">
              <h2>{moiveInfo.tenPhim}</h2>
              <p>{moiveInfo.tenCumRap}</p>
              <span>
                {moiveInfo.ngayChieu}-{moiveInfo.gioChieu}-{moiveInfo.tenRap}
              </span>
            </div>
            <div className="profie-user">
              <p>
                <span>Khách Hàng : </span>
                <span>{user.hoTen}</span>
              </p>
              <p>
                <span>Email : </span>
                <span>{user.email}</span>
              </p>
              <p>
                <span>Phone : </span>
                <span>{user.soDT}</span>
              </p>
            </div>
            <div className="profie-listChairs">
              <p>
                <span style={{ color: "red" }}>Ghế : </span>
                {chairChoices?.map((chair, index) => {

                  return (
                    <span style={{ color: `${chair.loaiGhe === "Vip" ? "rgb(247, 181, 0)" : "rgb(152, 152, 152)"}`, marginLeft: "10px", display: "inline-block" }} key={index}>
                      {chair.stt ? chair.stt : ""} ,
                    </span>
                  )
                })}
              </p>
              <p>
                Số tiền còn lại :
                <span style={{ color: "green", marginLeft: "5px" }}>
                  {(ticketType.total - chairChoices.reduce((num, item) => {

                    return num += item.giaVe
                  }, 0)).toLocaleString() + "đ"}
                </span>
              </p>
            </div>
            <p style={{ marginTop: "50px" }}> <ErrorIcon style={{ fill: "red", verticalAlign: "bottom" }} /> Vé đã mua không được đổi hoặc hoàn tiền.Mã vé sẽ được gởi thông qua tin nhắn <span style={{ color: "#f79320" }}> ZMS </span>(tin nhắn Zalo) và <span style={{ color: "#f79320" }}>Email</span> đã nhập</p>
            <Button disabled={chairChoices.length <= 0 ? true : false} variant="contained" style={{ background: chairChoices.length > 0 ? "#44c020" : "#e9e9e9" }}
              onClick={() => {
                const danhSachGhe = chairChoices.map((ghe) => {
                  return {
                    maGhe: ghe.maGhe,
                    giaVe: ghe.giaVe
                  }
                })
                const listTicket = {
                  maLichChieu: moiveInfo.maLichChieu,
                  danhSachVe: danhSachGhe,
                  taiKhoanNguoiDung: user.taiKhoan
                };
                const token = `Bearer ${user.accessToken}`;
                dispatch({
                  type: CHECK_OUT_SAGA,
                  payload: {
                    listTicket, token, history, Swal, suatChieu
                  }
                })

                setValue(2);
                setValid(false)
              }}
            >
              Đặt vé
            </Button>
          </div>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className={classes.result}>
          <Paper style={{ padding: "0px 5px", background: "rgb(240 240 240)", }}>
            <h3 style={{ textAlign: "center", padding: "10px 5px", background: "rgb(254, 121, 0)", color: "#fff" }}>Kết Quả Đặt Vé</h3>
            <Grid alignItems="center" container >
              <Grid item xs={2}>
                <Avatar >
                  <PermContactCalendar />
                </Avatar>
              </Grid>
              <Grid item xs={10}>
                <div>
                  <p>
                    Tài Khoản :
                    <span style={{ marginLeft: "5px" }}>{user.hoTen}</span>
                  </p>
                  <p>
                    Email :  <span style={{ marginLeft: "5px" }}>{user.email}</span>
                  </p>
                  <p>
                    Số Dt:  <span style={{ marginLeft: "5px" }}>{user.soDT}</span>
                  </p>
                </div>
              </Grid>
            </Grid>
            <Grid alignItems="center" container>
              <Grid item xs={2}>
                <Avatar>
                  <Theaters />
                </Avatar>
              </Grid>
              <Grid item xs={10}>
                <p>
                  Tên Phim :
                  <span style={{ marginLeft: "5px" }}>{moiveInfo.tenPhim}</span>
                </p>
              </Grid>
            </Grid>
            <Grid alignItems="center" container>
              <Grid item xs={2}>
                <Avatar>
                  <LocationCity />
                </Avatar>

              </Grid>
              <Grid item xs={10}>
                <div>
                  <p>Rạp Chiếu :

                    <span style={{ marginLeft: "5px" }}>{moiveInfo.diaChi}</span>
                  </p>
                  <p>Thời Gian :

                    <span style={{ marginLeft: "5px" }}>{moiveInfo.ngayChieu}</span>
                  </p>
                </div>
              </Grid>
            </Grid>
            <Grid alignItems="center" container>
              <Grid item xs={2}>
                <Avatar>
                  <Weekend />
                </Avatar>

              </Grid>
              <Grid item xs={10}>
                <p>Danh Sách Ghế</p>
                <Grid spacing={1} container>
                  {chairChoices?.map((chair, index) => {
                    return (
                      <Grid key={index} item xs={3} sm={2} md={1}>
                        <Paper style={{ background: "rgb(254, 121, 0)" }}>
                          <Button style={{ color: "#fff" }}>
                            {chair.stt}
                          </Button>
                        </Paper>
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
            </Grid>
            <Grid style={{ padding: "10px 0" }} alignItems="center" container>
              <Grid item xs={2}>
                <Avatar>
                  <MonetizationOn />
                </Avatar>

              </Grid>
              <Grid item xs={10}>
                <p>
                  Tổng Tiền :
                  <span style={{ marginLeft: "10px", color: "green" }}>
                    {chairChoices?.reduce((num, chair) => {
                      return num += chair.giaVe
                    }, 0).toLocaleString() + "Đ"}
                  </span>
                </p>
              </Grid>

            </Grid>
            <div style={{ padding: "10px 0px", width: "80%", margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
              <Button style={{ background: "rgb(254, 121, 0)", color: "#fff" }} onClick={() => {
                history.push("/")
              }}>
                Về Trang Chủ
              </Button>
              <Button style={{ background: "rgb(254, 121, 0)", color: "#fff" }}
                onClick={() => {
                  dispatch({
                    type: CHECK_OUT
                  })
                  const newTicketType = ticketType;
                  newTicketType.total = 0;
                  for (let item of newTicketType.listTicket) {

                    item.cout = 0
                  };
                  setTicketType(newTicketType);
                  listGhe = [];
                  setValue(0)
                }}
              >
                Đặt Vé Mới
              </Button>
            </div>
          </Paper>
        </div>
      </TabPanel>

    </div >
  );;
}

export default memo(Booking);




