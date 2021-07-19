import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Container,
    Grid,
    Backdrop,
    Modal,
    Fade,
} from "@material-ui/core";
import dateFormat from "dateformat";
import { ErrorMessage, Formik, Form } from "formik";
import Swal from "sweetalert2";
import * as yup from "yup";
import { useStyles } from "../ModalMoive/style";
import axios from "axios";
ModalShowTime.propTypes = {
    showOpen: PropTypes.bool,
    handleShowOpen: PropTypes.func,
    showTime: PropTypes.object,
};
ModalShowTime.defaultProps = {
    handleShowOpen: null,
    showOpen: false,
};

const moiveSchema = yup.object().shape({

    rap: yup.string().required("không được đễ trống"),
    maRap: yup.string().required("không được đễ trống"),

    ngayKhoiChieu: yup.string().required("Không được để trống"),


})

const cumRap = [
    {
        heThongRap: "BHDStar",
        tenHeThong: "BHD Star Cineplex",
        list: [
            "bhd-star-cineplex-3-2",
            "bhd-star-cineplex-bitexco",
            "bhd-star-cineplex-pham-hung",
            "bhd-star-cineplex-vincom-le-van-viet",
            "bhd-star-cineplex-vincom-quang-trung", "", "", "", ""
        ],
    },
    {
        heThongRap: "CGV",
        tenHeThong: "CGV",
    },
    {
        heThongRap: "CineStar",
        tenHeThong: "CineStar",
    },
    {
        heThongRap: "Galaxy",
        tenHeThong: "Galaxy",
    },
    {
        heThongRap: "LotteCinima",
        tenHeThong: "LotteCinima",
    },
    {
        heThongRap: "MegaGS",
        tenHeThong: "MegaGS",
    },
];
function ModalShowTime(props) {
    const { showOpen, handleShowOpen, showTime } = props;
    const classes = useStyles();
    const [heThong, setHeThong] = useState("BHDStar");
    const [listRap, setListRap] = useState(null);
    const [danhSachRap, setDanhSachRap] = useState(null);
    const [value, setValue] = useState({
        maRap: "",
        rap: "",
    })
    const handleStyle = (e) => {
        e.stopPropagation();
        document.querySelectorAll(".form-group").forEach((el) => {
            el.classList.remove("active");
        });
        e.currentTarget.closest(".form-group").classList.add("active");
    };
    useEffect(() => {
        async function fetchSystem() {
            try {
                const res = await axios({
                    method: "GET",
                    url: `https://movie0706.cybersoft.edu.vn/api//QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${heThong}`,
                });
                const { data, status } = res;
                if (status === 200) {
                    setListRap(data);
                    setDanhSachRap(data[0].danhSachRap);

                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchSystem();
    }, [heThong]);
    const handleUltyModal = () => {
        if (!handleShowOpen) return;
        setValue({
            maRap: "",
            rap: ""
        })
        handleShowOpen(false, {});
    };
    const handleSubmit = async (value) => {
        if (!value) return;
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user)
        const token = `Bearer ${user.accessToken}`;
        try {
            const res = await axios({
                method: "POST",
                url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
                data: {
                    maPhim: value.maPhim,
                    ngayChieuGioChieu: value.ngayKhoiChieu,
                    maRap: value.maRap,
                    giaVe: value.giaVe
                },
                headers: {
                    Authorization: token
                }
            })
            const { data, status } = res;
            console.log(res)
            if (status === 200) {
                console.log(data);
                Swal.fire({
                    title: data,
                    icon: "success",
                    confirmButtonText: `OK!`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleUltyModal()
                    }
                })
            }
        } catch (error) {
            Swal.fire({
                title: error.response.data,
                icon: "error",
                confirmButtonText: `Thử Lại`,
            })
        }
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={showOpen}
                onClose={handleUltyModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={showOpen}>
                    <div className={classes.paper}>
                        <Container maxWidth="md">
                            <Formik
                                initialValues={{
                                    maPhim: showTime?.maPhim ? showTime?.maPhim : "",
                                    tenPhim: showTime?.tenPhim ? showTime?.tenPhim : "",
                                    cumRap: heThong,
                                    rap: "",
                                    ngayKhoiChieu: dateFormat(
                                        showTime?.ngayKhoiChieu,
                                        "dd/mm/yyyy HH:MM:ss"
                                    ),
                                    giaVe: "85000",
                                    maRap: "",
                                }} validationSchema={moiveSchema}
                                onSubmit={handleSubmit}
                            >
                                {(formikProps) => (
                                    <Form
                                        className={classes.form}
                                        onClick={() => {
                                            document.querySelectorAll(".form-group").forEach((el) => {
                                                el.classList.remove("active");
                                            });
                                        }}
                                        noValidate
                                    >
                                        <h2
                                            style={{
                                                textAlign: "center",
                                                color: "#f37520",
                                                margin: "15px 0px",
                                            }}
                                        >
                                            Thêm Lịch Chiếu
                                        </h2>

                                        <Grid spacing={2} container>
                                            <Grid item sm={6}>
                                                <div
                                                    style={{
                                                        background: showTime.maPhim
                                                            ? "rgba(0,0,0,.54)"
                                                            : "",
                                                    }}
                                                    className="form-group"
                                                >
                                                    <Grid className="title" item sm={3}>
                                                        <label
                                                            style={{ color: showTime.maPhim ? "#fff" : "" }}
                                                        >
                                                            Mã Phim
                                                        </label>
                                                    </Grid>
                                                    <Grid className="form-input" item sm={9}>
                                                        <label className="hd">Mã Phim</label>
                                                        <input
                                                            style={{
                                                                background: showTime.maPhim ? "inherit" : "",
                                                                color: showTime.maPhim ? "#fff" : "",
                                                            }}
                                                            disabled={showTime.maPhim ? true : false}
                                                            defaultValue={showTime.maPhim}
                                                            onChange={formikProps.handleChange}
                                                            name="maPhim"
                                                            onClick={handleStyle}
                                                        />
                                                    </Grid>
                                                </div>
                                                <ErrorMessage
                                                    name="maPhim"
                                                    render={(msg) => <p className="errorMess">{msg}</p>}
                                                ></ErrorMessage>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <div
                                                    style={{
                                                        background: showTime.maPhim
                                                            ? "rgba(0,0,0,.54)"
                                                            : "",
                                                    }}
                                                    className="form-group"
                                                >
                                                    <Grid className="title" item sm={3}>
                                                        <label
                                                            style={{ color: showTime.tenPhim ? "#fff" : "" }}
                                                        >
                                                            Mã Phim
                                                        </label>
                                                    </Grid>
                                                    <Grid className="form-input" item sm={9}>
                                                        <label className="hd">Tên Phim</label>
                                                        <input
                                                            style={{
                                                                background: showTime.tenPhim ? "inherit" : "",
                                                                color: showTime.tenPhim ? "#fff" : "",
                                                            }}
                                                            disabled={showTime.tenPhim ? true : false}
                                                            defaultValue={showTime.tenPhim}
                                                            onChange={formikProps.handleChange}
                                                            name="tenPhim"
                                                            onClick={handleStyle}
                                                        />
                                                    </Grid>
                                                </div>
                                                <ErrorMessage
                                                    name="tenPhim"
                                                    render={(msg) => <p className="errorMess">{msg}</p>}
                                                ></ErrorMessage>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <div className="form-group">
                                                    <Grid
                                                        style={{
                                                            background: "#7ab893",
                                                            borderRadius: "5px",
                                                        }}
                                                        className="title"
                                                        item
                                                        sm={3}
                                                    >
                                                        <label>Cụm Rạp</label>
                                                    </Grid>
                                                    <Grid className="form-input" item sm={9}>
                                                        <label style={{ width: "auto" }} className="hd">
                                                            Cụm Rạp
                                                        </label>
                                                        <select
                                                            onChange={(e) => {
                                                                const newValue = e.target.value;
                                                                setHeThong(newValue);
                                                                setValue({
                                                                    rap: "",
                                                                    maRap: ""
                                                                })
                                                                formikProps.setFieldValue("cumRap", newValue)

                                                            }}
                                                            name="cumRap"
                                                            style={{
                                                                border: "none",
                                                                outline: "none",
                                                                fontSize: "16px",
                                                                marginLeft: "20px",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            {cumRap.map((item, index) => {
                                                                return (
                                                                    <option key={index} value={item.heThongRap}>
                                                                        {item.tenHeThong}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                    </Grid>
                                                </div>
                                                <ErrorMessage
                                                    name="cumRap"
                                                    render={(msg) => <p className="errorMess">{msg}</p>}
                                                ></ErrorMessage>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <div className="form-group">
                                                    <Grid
                                                        style={{
                                                            background: "#7ab893",
                                                            borderRadius: "5px",
                                                        }}
                                                        className="title"
                                                        item
                                                        sm={3}
                                                    >
                                                        <label>Mã Rạp</label>
                                                    </Grid>
                                                    <Grid className="form-input" item sm={9}>
                                                        <label style={{ width: "auto" }} className="hd">
                                                            Mã Rạp
                                                        </label>
                                                        <select
                                                            onChange={(e) => {
                                                                setValue({
                                                                    ...value,
                                                                    maRap: e.target.value
                                                                })
                                                                formikProps.setFieldValue("maRap", e.target.value)
                                                            }}
                                                            name="maRap"
                                                            value={value.maRap}
                                                            style={{
                                                                border: "none",
                                                                outline: "none",
                                                                fontSize: "16px",
                                                                marginLeft: "20px",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <option hidden ></option>
                                                            {danhSachRap?.map((ma, index) => {
                                                                return (
                                                                    <option key={index} value={ma.maRap}>
                                                                        {ma.maRap}
                                                                    </option>
                                                                );
                                                            })}


                                                        </select>
                                                    </Grid>
                                                </div>
                                                <ErrorMessage
                                                    name="maRap"
                                                    render={(msg) => <p className="errorMess">{msg}</p>}
                                                ></ErrorMessage>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <div className="form-group">
                                                    <Grid
                                                        style={{
                                                            background: "#7ab893",
                                                            borderRadius: "5px",
                                                        }}
                                                        className="title"
                                                        item
                                                        sm={6}
                                                    >
                                                        <label>Ngày Khởi Chiếu</label>
                                                    </Grid>
                                                    <Grid
                                                        style={{ maxWidth: "100%", flexBasis: "100%" }}
                                                        className="form-input"
                                                        item
                                                        sm={6}
                                                    >
                                                        <label style={{ width: "auto" }} className="hd">
                                                            Cụm Rạp
                                                        </label>
                                                        <input
                                                            defaultValue={dateFormat(
                                                                showTime?.ngayKhoiChieu,
                                                                "dd/mm/yyyy HH:MM:ss"
                                                            )}
                                                            name="ngayKhoiChieu"
                                                            onChange={formikProps.handleChange}
                                                            type="text"
                                                            style={{ marginLeft: "auto", width: "auto" }}
                                                        />
                                                    </Grid>
                                                </div>
                                                <ErrorMessage
                                                    name="ngayKhoiChieu"
                                                    render={(msg) => <p className="errorMess">{msg}</p>}
                                                ></ErrorMessage>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <div className="form-group">
                                                    <Grid
                                                        style={{
                                                            background: "#7ab893",
                                                            borderRadius: "5px",
                                                        }}
                                                        className="title"
                                                        item
                                                        sm={3}
                                                    >
                                                        <label>Giá vé</label>
                                                    </Grid>
                                                    <Grid className="form-input" item sm={9}>
                                                        <label style={{ width: "auto" }} className="hd">
                                                            Giá vé
                                                        </label>
                                                        <select
                                                            onChange={formikProps.handleChange}
                                                            name="giaVe"
                                                            style={{
                                                                border: "none",
                                                                outline: "none",
                                                                fontSize: "16px",
                                                                marginLeft: "20px",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <option value="85000">85.000 VND</option>
                                                            <option value="75000">75.000 VND</option>
                                                        </select>
                                                    </Grid>
                                                </div>
                                                <ErrorMessage
                                                    name="giaVe"
                                                    render={(msg) => <p className="errorMess">{msg}</p>}
                                                ></ErrorMessage>
                                            </Grid>
                                            <Grid item sm={12}>
                                                <div className="form-group">
                                                    <Grid
                                                        style={{
                                                            background: "#7ab893",
                                                            borderRadius: "5px",
                                                        }}
                                                        className="title"
                                                        item
                                                        sm={3}
                                                    >
                                                        <label>Rạp</label>
                                                    </Grid>
                                                    <Grid className="form-input" item sm={9}>
                                                        <label style={{ width: "auto" }} className="hd">
                                                            Rạp
                                                        </label>
                                                        <select
                                                            onChange={(e) => {
                                                                const newDanhSachRap = listRap.find((maRap) => {
                                                                    return maRap.maCumRap === e.target.value;
                                                                });

                                                                setDanhSachRap(newDanhSachRap.danhSachRap);
                                                                setValue({
                                                                    rap: e.target.value,
                                                                    maRap: ""
                                                                })
                                                                formikProps.setFieldValue(
                                                                    "rap",
                                                                    e.target.value
                                                                );
                                                            }}
                                                            name="rap"
                                                            value={value.rap}
                                                            style={{
                                                                border: "none",
                                                                outline: "none",
                                                                fontSize: "16px",
                                                                marginLeft: "20px",
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <option hidden></option>
                                                            {listRap.map((item, index) => {
                                                                return (
                                                                    <option key={index} value={item.maCumRap}>
                                                                        {item.tenCumRap}
                                                                    </option>
                                                                );
                                                            })}

                                                        </select>
                                                    </Grid>
                                                </div>
                                                <ErrorMessage
                                                    name="rap"
                                                    render={(msg) => <p className="errorMess">{msg}</p>}
                                                ></ErrorMessage>
                                            </Grid>
                                            <Grid style={{ textAlign: "center" }} item sm={12}>
                                                <Button
                                                    style={{
                                                        background: "#f37520",
                                                        color: "#fff",
                                                        margin: "15px 0px",
                                                    }}
                                                    type="submit"
                                                >
                                                    Thêm Lịch Chiếu
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Form>
                                )}
                            </Formik>
                        </Container>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default ModalShowTime;
