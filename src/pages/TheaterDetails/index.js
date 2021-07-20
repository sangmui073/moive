import { Button, Container, Grid, Paper } from "@material-ui/core";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import CommentBlogs from "../../components/Display/Comment"
import {
    Event,
    Schedule,
    Theaters,
    Movie,
    ExpandMore,
    KeyboardArrowDown,
    KeyboardArrowUp,

} from "@material-ui/icons";
import { GET_CINEMA_DETAILS_SAGA } from "../../redux/saga/Constants/cinema-constants";
import dateFormat from "dateformat";
import ConverDate from "../../assets/Fakedata/ConverDate";
import logo from "../../assets/img/2d.jpg";
import { useStyles } from "./style";
import Helper from "../../assets/Fakedata/Hepler";
import { GET_COMMENT_SAGA, PATCH_COMMENT_SAGA, POST_COMMENT_SAGA } from "../../redux/saga/Constants/blogs-constance";
const help = new Helper();
dateFormat.i18n = ConverDate;
const weeks = [
    "2019-01-01",
    "2019-01-02",
    "2019-01-03",
    "2019-01-04",
    "2019-01-05",
    "2019-01-06",
    "2019-01-07",
];
function TheaterDetails() {

    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const param = useParams();
    const { cinemaDetails } = useSelector((state) => state.cinema);
    const [cinema, setCinema] = useState();
    const [day, setDay] = useState("Thứ 4");
    const [tick, setTick] = useState(0);
    const [y, setY] = useState(0);
    const [index, setIndex] = useState(0)
    const [title, setTitle] = useState(0);
    const [theater, setTheater] = useState("");

    useEffect(() => {
        const cineData = help.formatDataCine(param.maRap, cinemaDetails.lstCumRap);

        if (cineData) {
            setCinema(cineData);
            setTheater(cineData[0].maCumRap)
        }
    }, [cinemaDetails]);
    useEffect(() => {
        let newY = 0;
        if (y < 0) {
            newY = y / -100;
            setIndex(newY);

        } else {
            newY = y / 100;
            setIndex(newY);
        };
        if (newY !== 0) {
            setTheater(cinema[newY].maCumRap)
        }
    }, [y])

    useEffect(() => {
        dispatch({
            type: GET_CINEMA_DETAILS_SAGA,
            payload: param.maRap,
        });
    }, []);
    const handleCommemt = (post, user) => {
        const newComment = {
            ...post,
            userName: user.taiKhoan,
            maRap: theater,
            rate: post.rate > 0 ? post.rate : 0.5,
            like: []
        };
        dispatch({
            type: POST_COMMENT_SAGA,
            payload: {
                comment: newComment,
                souce: "blogCinemas",
                urlChild: `?maRap=${theater}`
            }
        })
    }
    const handleLike = (cm, user) => {
        const index = cm.like.indexOf(user.taiKhoan);
        if (index !== -1) {
            cm.like.splice(index, 1);
        } else {
            cm.like.push(user.taiKhoan);
        };
        dispatch({
            type: PATCH_COMMENT_SAGA,
            payload: {
                souce: `blogCinemas`,
                urlChild: `?maRap=${theater}`,
                comment: cm
            }
        })
    }
    const goUp = () => {
        y === 0 ? setY(-100 * (cinema.length - 1)) : setY(y + 100)

    };
    const goDown = () => {
        y === -100 * (cinema.length - 1) ? setY(0) : setY(y - 100)

    }
    const handleChangeSystem = (cine) => {
        if (index === 0) {
            const newCinema = [...cinema];
            const index = newCinema.findIndex((item) => item.maCumRap === cine);
            const prevCine = newCinema[index];
            newCinema[index] = newCinema[0];
            newCinema[0] = prevCine;
            setTheater(newCinema[0].maCumRap)
            setCinema(newCinema);
        }
    };
    const renderSystem = () => {
        return cinema.map((cine, index) => {
            return (
                <div
                    onClick={() => {
                        handleChangeSystem(cine.maCumRap);

                        setTheater(cine.maCumRap)
                    }}
                    key={index}
                    className="-andess"
                    style={{ transform: `translateY(${y}%)` }}
                >
                    <Grid container spacing={2}>
                        <Grid className="andress-img" item xs={6} sm={2}>
                            <img
                                src={
                                    process.env.PUBLIC_URL +
                                    `${cine?.hinhAnh?.replace("http", "https")}`
                                }
                            />
                        </Grid>
                        <Grid item xs={6} sm={10}>
                            <p style={{ marginTop: "5px" }}>
                                {cine.tenCumRap.length > 35
                                    ? cine.tenCumRap.substr(0, 35) + "..."
                                    : cine.tenCumRap}
                                <span style={{ color: "rgb(0,0,0)" }}>
                                    {cine.diaChi.length > 40
                                        ? cine.diaChi.substr(0, 40) + "..."
                                        : cine.diaChi}
                                </span>
                            </p>
                        </Grid>
                    </Grid>
                </div>
            );
        });
    };
    const handleChangeHeight = (data) => {
        if (parseInt(data.maPhim) !== tick) {
            setTick(data.maPhim);
        } else {
            setTick(0);
        }
    };
    const renderTime = (d) => {
        const mouth = [];
        const fullMouth = [];
        for (let item of d.lstLichChieuTheoPhim) {
            if (dateFormat(item.ngayChieuGioChieu, "dddd") === day) {
                mouth.push(dateFormat(item.ngayChieuGioChieu, "d-mmm"));
                fullMouth.push({
                    maPhim: item.maLichChieu,
                    lichChieu: item.ngayChieuGioChieu,
                });
            }
        }
        const uniqueMouth = [...new Set(mouth)];
        return uniqueMouth.map((item, index) => {
            return (
                <Paper className="hour" elevation={2} key={index}>
                    <h3>
                        <Event />
                        <span>{item}</span>
                    </h3>
                    {renderHour(fullMouth, item)}
                </Paper>
            );
        });
    };
    const handleRedirect = (action) => {
        const { type, payload } = action;
        switch (type) {
            case "movie": {
                history.push(`/DetailsMoive/${payload}`);
                break;
            }
            default: {
                history.push(`/Booking/${payload}`);
                break;
            }
        }
    };
    const renderHour = (mouth, item) => {
        const hour = mouth.filter((hou) => {
            return dateFormat(hou.lichChieu, "d-mmm") === item;
        });
        return hour.map((it, index) => {
            return (
                <Button
                    onClick={() => {
                        handleRedirect({
                            type: "booking",
                            payload: it.maPhim,
                        });
                    }}
                    key={index}
                    startIcon={<Schedule />}
                >
                    {dateFormat(it.lichChieu, "HH:MM")}
                </Button>
            );
        });
    };
    const renderMoive = () => {
        const newId = index === 0 ? 0 : index;
        const array = [];
        for (let item of cinema[newId].danhSachPhim) {
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
                    <Paper
                        className={
                            d.maPhim === tick ? `-moive ${classes.active} box` : "-moive box"
                        }
                        key={index}
                    >
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={3} sm={2}>
                                <Button
                                    className="-img"
                                    onClick={() => {
                                        handleRedirect({
                                            type: "movie",
                                            payload: d.maPhim,
                                        });
                                    }}
                                >
                                    <img src={d.hinhAnh.replace("http", "https")} />
                                </Button>
                            </Grid>
                            <Grid item xs={9} sm={10}>
                                <p className="-child">
                                    <Button
                                        onClick={() => {
                                            handleRedirect({
                                                type: "movie",
                                                payload: d.maPhim,
                                            });
                                        }}
                                        startIcon={<Movie />}
                                    >
                                        {d.tenPhim.length > 40
                                            ? d.tenPhim.substr(0, 40) + "..."
                                            : d.tenPhim}
                                    </Button>
                                    <Button
                                        startIcon={<ExpandMore style={{ fill: "#fe7900" }} />}
                                        onClick={() => {
                                            handleChangeHeight(d);
                                        }}
                                    />
                                </p>
                                <p style={{ display: "flex", alignItems: "center", margin: 0 }}>
                                    <img className="-logo2d" src={logo} />
                                    <i>113 phút - TIX 8.5 - IMDb 0</i>
                                </p>
                            </Grid>
                        </Grid>
                        {renderTime(d)}
                    </Paper>
                );
            });
        } else {
            return (
                <Grid justify="center" container>
                    <p style={{ textAlign: "center" }}>
                        Hiện Chưa Có Phim Mời Bạn Chọn Hôm Khác...
                    </p>
                </Grid>
            );
        }
    };
    if (cinema && cinema.length) {
        const newId = index === 0 ? 0 : index;
        const [fistName, lastName] = cinema[newId].tenCumRap.split("-");
        return (
            <section className={classes.root}>
                <div className="parent-container">
                    <Container maxWidth="md">
                        <Grid container spacing={2}>
                            <Grid className="-img" item xs={12} sm={3}>
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        `${cinema[newId]?.hinhAnh?.replace("http", "https")}`
                                    }
                                />
                            </Grid>
                            <Grid className="-content" item xs={12} sm={8}>
                                <h1>
                                    <span style={{ color: "#fe7900" }}>{fistName} -</span>
                                    <span>{lastName}</span>
                                </h1>
                                <p>{cinema[newId].diaChi}</p>
                                <Button
                                    size="large"
                                    onClick={() => {
                                        setTitle(0)
                                        window.scrollTo({
                                            top: 500,
                                            left: 0,
                                            behavior: "smooth",
                                        });
                                    }}
                                >
                                    <Theaters style={{ marginRight: "10px" }} />
                                    Xem Lịch Chiếu
                                </Button>
                            </Grid>
                            <div
                                style={{
                                    backgroundImage: `linear-gradient(to top,rgba(0,0,0,0.3),transparent 100%),url(${cinema[newId]?.hinhAnh?.replace(
                                        "http",
                                        "https"
                                    )})`,
                                }}
                                className="bg-liner"
                            ></div>
                        </Grid>
                    </Container>
                </div>
                <div style={{ backgroundImage: "linear-gradient(to top, #dfe9f3 50%, white 100%)" }}>
                    <Container className={classes.system} maxWidth="md">
                        <div className="container-title">
                            <h2
                                style={{
                                    textAlign: "center",

                                    margin: "25px 0px",
                                }}
                                onClick={() => {
                                    setTitle(0)
                                }}
                            >
                                <Button style={{
                                    fontSize: "25px",
                                    color: "#fe7900",
                                }}>  Lịch Chiếu</Button>

                            </h2>
                            <h2
                                style={{

                                    textAlign: "center",
                                    fontSize: "25px",
                                    color: "#fe7900",
                                    margin: "25px 0px 25px 15px",
                                }}
                                onClick={() => {
                                    setTitle(1);

                                    // dispatch({
                                    //     type: GET_COMMENT_SAGA,
                                    //     payload: {
                                    //         source: `blogCinemas?maRap=${theater}`
                                    //     }
                                    // })

                                }}
                            >
                                <Button style={{
                                    fontSize: "25px",
                                    color: "#fe7900",
                                }}

                                > Đánh Giá</Button>

                            </h2>
                        </div>
                        <Paper style={{ display: title === 0 ? "block" : "none" }} className="wapper" elevation={3}>
                            <Grid container spacing={2}>
                                <Grid className="system-child" item xs={12} sm={5}>
                                    <Grid className="mobile-btnUp" item xs={12}>
                                        <Button onClick={goUp}>
                                            <KeyboardArrowUp className="icon-up" fontSize="large" />
                                        </Button>
                                    </Grid>
                                    <Paper className="silde">
                                        {renderSystem()}
                                    </Paper>
                                    <Grid className="mobile-btnUp" item xs={12}>
                                        <Button onClick={goDown}>
                                            <KeyboardArrowDown className="icon-down" fontSize="large" />
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid className="moive-child" item xs={12} sm={7}>
                                    <Grid container className="-day">
                                        {weeks.map((d, index) => {
                                            return (
                                                <Button
                                                    className={
                                                        dateFormat(d, "dddd") === day ? "active" : ""
                                                    }
                                                    key={index}
                                                    onClick={() => {
                                                        const newDay = dateFormat(d, "dddd");
                                                        setDay(newDay);
                                                    }}
                                                >
                                                    {dateFormat(d, "dddd")}
                                                </Button>
                                            );
                                        })}
                                    </Grid>
                                    {renderMoive()}
                                </Grid>
                            </Grid>
                        </Paper>
                        <div style={{ display: title === 1 ? "block" : "none" }} >
                            <CommentBlogs url={`blogCinemas?maRap=${theater}`} handleLike={handleLike} handleComment={handleCommemt} />
                        </div>
                    </Container>
                </div>
            </section>
        );
    }
    return "";
}

export default memo(TheaterDetails);
