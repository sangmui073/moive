import {
    Avatar,
    Button,
    Container,
    Grid,
    Paper,
    TextField,
} from "@material-ui/core";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_PROFILE, PUT_PROFILE } from "../../redux/saga/Constants/auth-constants";
import { ErrorMessage, Formik, Form } from "formik";
import DnsIcon from "@material-ui/icons/Dns";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import Settings from "@material-ui/icons/SettingsApplications";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import MovieIcon from "@material-ui/icons/Movie";
import TheatersIcon from "@material-ui/icons/Theaters";
import WeekendIcon from "@material-ui/icons/Weekend";
import CloseIcon from '@material-ui/icons/Close';
import Swal from "sweetalert2"
import * as yup from "yup";
import { useStyles } from "./style";
import { Redirect } from "react-router-dom";
const listMenu = [
    {
        id: 0,
        title: "Thông Tin Cá Nhân",
    },
    {
        id: 1,
        title: "Lịch Sử Đặt Vé",
    },
    {
        id: 2,
        title: "Thay Đổi Thông Tin Cá Nhân",
    },
];

const sigupUserSchema = yup.object().shape({

    matKhau: yup
        .string()
        .required("không được đễ trống")
        .min(6, "lớn hơn 6 ký tự"),
    hoTen: yup
        .string()
        .required("không được đễ trống")
        .min(6, "lớn hơn 6 ký tự"),
    email: yup
        .string()
        .required("không được đễ trống")
        .email("đúng định dạng email"),
    soDt: yup
        .string()
        .required("Không được để trống")
        .matches(/^[0-9]+$/, "phải là số")
        .min(8, "lớn hơn 6 ký tự"),
});
const pagition = (arrlenght, perMoive, setCurrentMoive) => {
    const numberPagtion = [];

    for (let i = 1; i <= Math.ceil(arrlenght / perMoive); i++) {

        numberPagtion.push(i)
    }
    return (
        numberPagtion.map((num, index) => {
            return (
                <Button key={index} onClick={() => {
                    setCurrentMoive(num)
                }}>
                    {num}
                </Button>
            )
        })
    )
}

function UserProfie(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const classes = useStyles();
    const dispatch = useDispatch();
    const { checkOutInfo } = useSelector((state) => state.auth);
    useEffect(() => {

        dispatch({
            type: GET_PROFILE,
            payload: user.taiKhoan,
        });
    }, []);
    console.log("render")

    const Modal = (toogle) => {
        if (posts && posts.length > 0) {
            return (
                <div
                    className={
                        toogle ? `${classes.modal} active-modal ` : `${classes.modal}`
                    }
                >
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: "10%" }} >STT</th>
                                <th style={{ width: "50%" }}>
                                    <span>Rạp </span>
                                    <TheatersIcon />
                                </th>
                                <th style={{ width: "40%" }}>
                                    <span>Ghế</span>
                                    <WeekendIcon />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((list, index) => {

                                return (
                                    <tr key={index}>
                                        <td style={{ textAlign: "center" }} >{index + 1}</td>
                                        <td style={{ textAlign: "center" }}>{list.danhSachGhe[0].tenHeThongRap}</td>
                                        <td style={{ textAlign: "center" }}>{list.danhSachGhe.map((ghe, id) => {
                                            return (<span style={{ margin: "0px 5px" }} key={id}>
                                                {ghe.tenGhe}
                                            </span>)
                                        })}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="btn-close">
                                    <Button onClick={() => {
                                        setOpen(false);
                                    }}>
                                        <CloseIcon fontSize="small" />
                                    </Button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                </div >
            );
        }

        return "";
    };
    let [value, setValue] = useState(0);
    let [x, setX] = useState(0);
    const handleSubmit = (values) => {
        const token = `Bearer ${user.accessToken}`;
        dispatch({
            type: PUT_PROFILE,
            payload: {
                user: values,
                token: token,
                Swal: Swal
            }
        })
    };
    const [posts, setPosts] = useState([]);
    let [open, setOpen] = useState(false);
    const [currentMoive, setCurrentMoive] = useState(1);
    const [perMoive, setPostMoive] = useState(5);
    const filterMoive = checkOutInfo.reduce((moive, current) => {
        const x = moive.find(item => item.tenPhim === current.tenPhim);
        if (!x) {
            return moive.concat([current])
        } else {
            return moive
        }
    }, [])
    const lastMoive = currentMoive * perMoive;
    const fistMoive = lastMoive - perMoive;
    const moives = filterMoive.slice(fistMoive, lastMoive)

    const renderListCheckOut = () => {
        return moives.map((name, index) => {
            return (
                <Grid
                    key={index}
                    container
                    className="tickets"
                    onClick={() => {
                        console.log(moives)
                        const listChairs = checkOutInfo.filter((chair) => {
                            return chair.tenPhim === name.tenPhim;
                        });
                        setPosts(listChairs)
                        setOpen(true);
                    }}
                >
                    <Grid style={{ display: "flex" }} item xs={6}>
                        <MovieIcon />
                        <span style={{ marginLeft: "10px" }}>{name.tenPhim.length > 15 ? name.tenPhim.substr(0, 15) + "..." : name.tenPhim}</span>
                    </Grid>
                    <Grid style={{ display: "flex" }} item xs={6}>
                        <Settings />
                        <span style={{ marginLeft: "10px" }}>..Chi tiết</span>
                    </Grid>

                </Grid>
            );
        });
    };
    if (user)
        return (

            <section className={`${classes.root} box`}>
                <Container maxWidth="md">
                    <ul className={classes.menu}>
                        {listMenu.map((item, index) => {
                            return (
                                <li
                                    className={item.id === value ? "active-menu" : ""}
                                    key={index}
                                >
                                    <a
                                        onClick={() => {
                                            setValue(item.id);
                                            setX(item.id);
                                        }}
                                    >
                                        {item.title}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    <Paper elevation={3} className={classes.profie}>
                        <div

                            className="silider-profie"
                            style={{ transform: `translateX(${-x * 100}%)` }}
                        >
                            <h3>Thông Tin Cá Nhân</h3>
                            <Grid container alignItems="center" spacing={3}>
                                <Grid className="profie-img" item xs={12} sm={3} md={3}>
                                    <Avatar src={user.hinhAnh ? user.hinhAnh : `https://i.pravatar.cc/150?u=${user?.taiKhoan}`} />
                                </Grid>
                                <Grid className="profie-content"

                                    item
                                    xs={12} sm={8} md={8}
                                >
                                    <p style={{ marginLeft: "20px" }}>
                                        <b>Họ tên :</b>
                                        <span style={{ marginLeft: "10px" }}>{user?.hoTen}</span>
                                    </p>
                                    <p style={{ marginLeft: "20px" }}>
                                        {" "}
                                        <b>Email :</b>
                                        <span style={{ marginLeft: "10px" }}>{user?.email}</span>
                                    </p>
                                    <p style={{ marginLeft: "20px" }}>
                                        {" "}
                                        <b>Số Điện Thoại :</b>
                                        <span style={{ marginLeft: "10px" }}>{user?.soDT}</span>
                                    </p>
                                </Grid>
                            </Grid>
                        </div>
                        <div

                            className="silider-profie"
                            style={{ transform: `translateX(${-x * 100}%)` }}
                        >
                            <h3>Lịch Sử Đặt Vé</h3>
                            {renderListCheckOut()}
                            <div className="pagition">
                                {pagition(filterMoive.length, perMoive, setCurrentMoive)}
                            </div>

                        </div>
                        <div

                            className="silider-profie"
                            style={{ transform: `translateX(${-x * 100}%)` }}
                        >
                            <h3>Cập Nhật Thông Tin</h3>
                            <Grid justify="center" container spacing={2}>
                                <Grid item xs={1} sm={1}>
                                    <p style={{ margin: 0 }}>
                                        {" "}
                                        <DnsIcon style={{ marginTop: "5px" }} />
                                    </p>
                                    <p>
                                        <PhoneAndroidIcon />
                                    </p>
                                    <p>
                                        <LockIcon />
                                    </p>
                                    <p>
                                        <EmailIcon />
                                    </p>
                                </Grid>
                                <Grid item xs={11} sm={8}>
                                    <Formik
                                        initialValues={{
                                            taiKhoan: user?.taiKhoan,
                                            matKhau: "",
                                            email: "",
                                            soDt: "",
                                            maNhom: "GP11",
                                            maLoaiNguoiDung: "KhachHang",
                                            hoTen: "",
                                        }}
                                        onSubmit={handleSubmit}
                                        validationSchema={sigupUserSchema}
                                    >
                                        {(formikProps) => (
                                            <Form className={classes.form} noValidate>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            name="hoTen"
                                                            variant="outlined"
                                                            fullWidth
                                                            label="Họ và tên"
                                                            onChange={formikProps.handleChange}
                                                        />
                                                        <ErrorMessage
                                                            name="hoTen"
                                                            render={(msg) => (
                                                                <div className={classes.messError}>{msg}</div>
                                                            )}
                                                        ></ErrorMessage>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            variant="outlined"
                                                            fullWidth
                                                            label="Số điện thoại"
                                                            name="soDt"
                                                            onChange={formikProps.handleChange}
                                                        />
                                                        <ErrorMessage
                                                            name="soDt"
                                                            render={(msg) => (
                                                                <div className={classes.messError}>{msg}</div>
                                                            )}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <TextField
                                                            variant="outlined"
                                                            fullWidth
                                                            name="matKhau"
                                                            label="Mật khẩu"
                                                            type="password"
                                                            onChange={formikProps.handleChange}
                                                        />
                                                        <ErrorMessage
                                                            name="matKhau"
                                                            render={(msg) => (
                                                                <div className={classes.messError}>{msg}</div>
                                                            )}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            variant="outlined"
                                                            fullWidth
                                                            id="email"
                                                            label="Email Address"
                                                            type="email"
                                                            name="email"
                                                            onChange={formikProps.handleChange}
                                                        />
                                                        <ErrorMessage
                                                            name="email"
                                                            render={(msg) => (
                                                                <div className={classes.messError}>{msg}</div>
                                                            )}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Button
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.submit}

                                                >
                                                    Lưu Lại
                                                </Button>
                                            </Form>
                                        )}
                                    </Formik>
                                </Grid>
                            </Grid>
                        </div>
                    </Paper>
                    {Modal(open)}
                </Container>
            </section>
        );
    return <Redirect to="/" />
}

export default memo(UserProfie);

