import { Button, Container, Grid, Paper } from '@material-ui/core';
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { useStyles } from "./style"
import Helper from "../../assets/Fakedata/Hepler"
import { Event, Schedule, Theaters, Movie, ExpandMore } from '@material-ui/icons';
import { GET_CINEMA_DETAILS_SAGA } from '../../redux/saga/Constants/cinema-constants';
import dateFormat from 'dateformat';
import ConverDate from "../../assets/Fakedata/ConverDate";
import logo from "../../assets/img/2d.jpg"

const help = new Helper();
dateFormat.i18n = ConverDate;
const weeks = [
    "2019-01-01", "2019-01-02", "2019-01-03", "2019-01-04",
    "2019-01-05", "2019-01-06", "2019-01-07",
];
function TheaterDetails() {
    const dispatch = useDispatch();
    const classes = useStyles()
    const history = useHistory();
    const param = useParams();
    const { cinemaDetails } = useSelector(state => state.cinema);
    const [cinema, setCinema] = useState();
    const [day, setDay] = useState("Thứ 4");
    const [tick, setTick] = useState(0);

    const cineData = help.formatDataCine(param.maRap, cinemaDetails.lstCumRap);
    useEffect(() => {
        if (cineData) {
            setCinema(cineData)
        }
    }, [cinemaDetails])
    useEffect(() => {
        dispatch({
            type: GET_CINEMA_DETAILS_SAGA,
            payload: param.maRap
        })
    }, []);
    const handleChangeSystem = (cine) => {
        const newCinema = [...cinema];
        const index = newCinema.findIndex(item => (
            item.maCumRap === cine
        ))
        const prevCine = newCinema[index];
        newCinema[index] = newCinema[0];
        newCinema[0] = prevCine;
        setCinema(newCinema)
    }
    const renderSystem = () => {
        return cinema.map((cine, index) => {
            return (
                <div onClick={() => {
                    handleChangeSystem(cine.maCumRap)
                    console.log(cine)
                }} key={index} className="-andess">
                    <Grid container spacing={2}>
                        <Grid style={{ height: "80px" }} item sm={2}>
                            <img src={process.env.PUBLIC_URL + `${cine.hinhAnh}`} />
                        </Grid>
                        <Grid item sm={10}>
                            <p style={{ marginTop: "5px" }}>
                                {cine.tenCumRap.length > 35 ? cine.tenCumRap.substr(0, 35) + "..." : cine.tenCumRap}
                                <span style={{ display: "block", fontSize: "14px" }}>{
                                    cine.diaChi.length > 40 ? cine.diaChi.substr(0, 40) + "..." : cine.diaChi
                                }</span>
                            </p>
                        </Grid>
                    </Grid>
                </div>
            )
        })
    }
    const handleChangeHeight = (data) => {
        if (parseInt(data.maPhim) !== tick) {
            setTick(data.maPhim)
        } else {
            setTick(0)
        }
    }
    const renderTime = (d) => {
        const mouth = [];
        const fullMouth = []
        for (let item of d.lstLichChieuTheoPhim) {
            if (dateFormat(item.ngayChieuGioChieu, "dddd") === day) {
                mouth.push(dateFormat(item.ngayChieuGioChieu, "d-mmm"));
                fullMouth.push({
                    maPhim: item.maLichChieu,
                    lichChieu: item.ngayChieuGioChieu
                })
            }
        }
        const uniqueMouth = [...new Set(mouth)];
        return uniqueMouth.map((item, index) => {

            return (
                <Paper className="hour" elevation={2} key={index}>
                    <h3><Event />
                        <span>{item}</span>
                    </h3>
                    {renderHour(fullMouth, item)}
                </Paper>
            )
        })
    }
    const handleRedirect = (action) => {
        const { type, payload } = action;
        switch (type) {
            case "movie": {
                history.push(`/DetailsMoive/${payload}`)
                break;
            }
            default: {
                history.push(`/Booking/${payload}`)
                break;
            }
        }
    }
    const renderHour = (mouth, item) => {
        const hour = mouth.filter((hou) => {
            return dateFormat(hou.lichChieu, "d-mmm") === item;
        });
        return hour.map((it, index) => {
            return (
                <Button onClick={() => {
                    handleRedirect({
                        type: "booking",
                        payload: it.maPhim
                    })
                }} key={index} startIcon={<Schedule />}>{
                        dateFormat(it.lichChieu, "HH:MM")
                    }</Button>
            )
        })
    }
    const renderMoive = () => {
        const array = [];
        for (let item of cinema[0].danhSachPhim) {
            for (let i of item.lstLichChieuTheoPhim) {
                if (dateFormat(i.ngayChieuGioChieu, "dddd") === day) {
                    array.push(item);
                }
            }
        }
        const uniqueDay = [...new Set(array)];
        if (uniqueDay.length > 0 && uniqueDay) {
            return uniqueDay.map((d, index) => {
                return (
                    <Paper className={d.maPhim === tick ? `-moive ${classes.active} box` : "-moive box"} key={index} >
                        <Grid container spacing={2}>
                            <Grid item sm={2}>
                                <Button className="-img" onClick={() => {
                                    handleRedirect({
                                        type: "movie",
                                        payload: d.maPhim
                                    })
                                }}>
                                    <img src={d.hinhAnh} />
                                </Button>
                            </Grid>
                            <Grid item sm={10}>
                                <p className="-child">
                                    <Button onClick={() => {
                                        handleRedirect({
                                            type: "movie",
                                            payload: d.maPhim
                                        })
                                    }} startIcon={<Movie />}>
                                        {d.tenPhim.length > 40 ? d.tenPhim.substr(0, 40) + "..." : d.tenPhim}
                                    </Button>
                                    <Button startIcon={<ExpandMore style={{ fill: "#fe7900" }} />} onClick={() => {
                                        handleChangeHeight(d)
                                    }} />
                                </p>
                                <p style={{ display: "flex", alignItems: "center", margin: 0 }}>
                                    <img className="-logo2d" src={logo} />
                                    <i>113 phút - TIX 8.5 - IMDb 0</i>
                                </p>
                            </Grid>
                        </Grid>
                        {renderTime(d)}

                    </Paper>
                )
            })
        } else {
            return (
                <Grid justify="center" container>
                    <p style={{ textAlign: "center" }}>
                        Hiện Chưa Có Phim Mời Bạn Chọn Hôm Khác...
                    </p>
                </Grid>
            )
        }


    }
    if (cinema) {
        const [fistName, lastName] = cinema[0].tenCumRap.split("-");
        return (
            <section className={classes.root}>
                <div className="parent-container">
                    <Container maxWidth="md">
                        <Grid container spacing={2}>
                            <Grid className="-img" item sm={3}>
                                <img src={process.env.PUBLIC_URL + `${cinema[0].hinhAnh}`} />
                            </Grid>
                            <Grid className="-content" item sm={8}>
                                <h1>
                                    <span style={{ color: "#fe7900" }}>
                                        {fistName} -
                                    </span>
                                    <span >
                                        {lastName}
                                    </span>
                                </h1>
                                <p>
                                    {cinema[0].diaChi}
                                </p>
                                <Button size="large" onClick={() => {
                                    window.scrollTo({
                                        top: 500,
                                        left: 0,
                                        behavior: 'smooth'
                                    })
                                }}>
                                    <Theaters style={{ marginRight: "10px" }} />
                                    Xem Lịch Chiếu
                                </Button>
                            </Grid>
                            <div style={{ backgroundImage: `linear-gradient(to top,rgba(0,0,0,0.3),transparent 100%),url(${cinema[0].hinhAnh})` }} className="bg-liner"></div>

                        </Grid>

                    </Container>

                </div>
                <Container className={classes.system} maxWidth="md">
                    <h2 style={{ textAlign: "center", fontSize: "25px", color: "#fe7900", margin: "25px 0px" }}>Lịch Chiếu</h2>
                    <Paper className="wapper" elevation={3}>
                        <Grid container spacing={2}>
                            <Grid item sm={5} style={{ borderRight: "1px solid rgba(0,0,0,0.3)", height: "550px", overflowY: "scroll" }}>
                                {renderSystem()}

                            </Grid>
                            <Grid style={{ overflowY: "scroll", height: "520px" }} item sm={7}>
                                <Grid container className="-day">
                                    {weeks.map((d, index) => {
                                        return (
                                            <Button className={dateFormat(d, "dddd") === day ? "active" : ""} key={index} onClick={() => {
                                                const newDay = dateFormat(d, "dddd");
                                                setDay(newDay)
                                            }}>
                                                {dateFormat(d, "dddd")}
                                            </Button>
                                        )
                                    })}
                                </Grid>
                                {renderMoive()}
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </section>
        )
    }
    return ""
}

export default memo(TheaterDetails)
