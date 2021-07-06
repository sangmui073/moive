import React, { useEffect, useState } from 'react';
import { ErrorMessage, Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import avatar from "../../../assets/img/avatar-phim.jpg"
import { useStyles } from "./style"
import { Button, Container, Grid, Backdrop, Modal, Fade } from '@material-ui/core';
import { moiveSchema } from '../../../services/adminService';
import dateFormat from 'dateformat';
import { useDispatch } from 'react-redux';
import { ADD_MOIVE_SAGA, PUT_MOIVE_SAGA } from '../../../redux/saga/Constants/admin-constants';
import { admin_domain } from "../../../assets/Domain/AdminDomain"
Modalmoive.propTypes = {
    handleModal: PropTypes.func,
    open: PropTypes.bool,
    itemMoive: PropTypes.object,
    handleAction: PropTypes.func
};
Modalmoive.defaultProps = {
    handleModal: null,
    open: false,
    handleAction: null
}


function Modalmoive(props) {

    const classes = useStyles();
    const { handleModal, open, items, handleAction } = props;
    const { itemMoive, action } = items
    const [src, SetSrc] = useState({
        value: '',
        error: ''
    });
    useEffect(() => {
        if (itemMoive.hinhAnh) {
            SetSrc({
                ...src,
                value: itemMoive.hinhAnh
            })
        } else {
            SetSrc({
                ...src,
                value: avatar
            })
        }
    }, [itemMoive])
    const dispatch = useDispatch();
    const handleUltyModal = () => {
        handleModal(false, items)
    }
    const handleSubmit = (value) => {
        const converDate = { ...value };
        converDate.ngayKhoiChieu = dateFormat(converDate.ngayKhoiChieu, "dd/mm/yyyy")
        let form_data = new FormData();
        for (let key in converDate) {
            form_data.append(key, converDate[key]);
        }

        if (!handleAction) return
        switch (action) {
            case "add": {
                dispatch({
                    type: ADD_MOIVE_SAGA,
                    payload: {
                        url: admin_domain.managerMoive.post,
                        item: form_data,
                        handleAction
                    }
                })
                break;
            }
            default: {
                dispatch({
                    type: PUT_MOIVE_SAGA,
                    payload: {
                        url: admin_domain.managerMoive.put,
                        item: form_data,
                        handleAction
                    }
                })
                break;
            }
        }
        handleModal(false, items)
    }

    const handleStyle = (e) => {
        e.stopPropagation();
        document.querySelectorAll(".form-group").forEach((el) => {
            el.classList.remove("active")
        })
        e.currentTarget.closest(".form-group").classList.add("active");

    }
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={
                    handleUltyModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Container maxWidth="md">
                            <Formik initialValues={itemMoive.maPhim ? itemMoive : {
                                maPhim: '',
                                tenPhim: '',
                                biDanh: '',
                                trailer: '',
                                moTa: '',
                                ngayKhoiChieu: '',
                                danhGia: '',
                                hinhAnh: "",
                                maNhom: 'GP11'
                            }} onSubmit={handleSubmit} validationSchema={moiveSchema}>
                                {(formikProps) => (
                                    <Form className={classes.form} onClick={() => {
                                        document.querySelectorAll(".form-group").forEach((el) => {
                                            el.classList.remove("active")
                                        })
                                    }} noValidate>
                                        <h2 style={{ textAlign: "center", color: "#f37520", margin: "15px 0px" }}>{items.title}</h2>

                                        <Grid spacing={2} container>
                                            <Grid item sm={6}>
                                                <div style={{ background: itemMoive.maPhim ? "rgba(0,0,0,.54)" : "" }} className="form-group">
                                                    <Grid className="title" item sm={3}>
                                                        <label style={{ color: itemMoive.maPhim ? "#fff" : "" }}>
                                                            Mã Phim
                                                        </label>
                                                    </Grid>
                                                    <Grid className="form-input" item sm={9}>
                                                        <label className="hd">Mã Phim</label>
                                                        <input style={{ background: itemMoive.maPhim ? "inherit" : "", color: itemMoive.maPhim ? "#fff" : "" }} disabled={itemMoive.maPhim ? true : false} defaultValue={itemMoive.maPhim} onChange={formikProps.handleChange} name="maPhim" placeholder="Mã Phim" onClick={handleStyle} />
                                                    </Grid>
                                                </div>
                                                <ErrorMessage name="maPhim" render={msg => <p className="errorMess" >{msg}</p>}></ErrorMessage>

                                            </Grid>
                                            <Grid item sm={6}>
                                                <div className="form-group">
                                                    <Grid className="title" item sm={3}>
                                                        <label>
                                                            Tên Phim
                                                        </label>
                                                    </Grid>

                                                    <Grid className="form-input" item sm={9}>
                                                        <label className="hd"> Tên Phim</label>
                                                        <input defaultValue={itemMoive.tenPhim} name="tenPhim" onClick={handleStyle} placeholder="Tên Phim" onChange={formikProps.handleChange} />
                                                    </Grid>
                                                </div>
                                                <ErrorMessage name="tenPhim" render={msg => <p className="errorMess" >{msg}</p>}></ErrorMessage>
                                            </Grid>

                                            <Grid item sm={6}>
                                                <div className="form-group">
                                                    <Grid className="title" item sm={3}>
                                                        <label>
                                                            Bí Danh
                                                        </label>
                                                    </Grid>

                                                    <Grid className="form-input" item sm={9}>
                                                        <label className="hd"> Bí Dánh</label>
                                                        <input defaultValue={itemMoive.biDanh} name="biDanh" onChange={formikProps.handleChange} onClick={handleStyle} placeholder="Bí Dánh" />
                                                    </Grid>
                                                </div>
                                                <ErrorMessage name="biDanh" render={msg => <p className="errorMess" >{msg}</p>}></ErrorMessage>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <div className="form-group">
                                                    <Grid className="title" item sm={3}>
                                                        <label>
                                                            Trailer
                                                        </label>
                                                    </Grid>

                                                    <Grid className="form-input" item sm={9}>
                                                        <label className="hd"> Trailer</label>
                                                        <input defaultValue={itemMoive.trailer} name="trailer" onChange={formikProps.handleChange} onClick={handleStyle} placeholder="Trailer" />
                                                    </Grid>
                                                </div>
                                                <ErrorMessage name="trailer" render={msg => <p className="errorMess" >{msg}</p>}></ErrorMessage>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <div >
                                                    <Grid style={{ display: "flex", alignItems: "center" }} item sm={12}>
                                                        <input name="hinhAnh" className={classes.inputFile} type="file"
                                                            onChange={(e) => {

                                                                formikProps.setFieldValue("hinhAnh", e.target.files[0]);
                                                                const fReader = new FileReader();
                                                                fReader.readAsDataURL(e.target.files[0]);
                                                                fReader.onloadend = function (event) {
                                                                    SetSrc({
                                                                        ...src,
                                                                        value: event.target.result
                                                                    });
                                                                }
                                                            }}
                                                        />
                                                        <img style={{ borderRadius: "5px", width: "80px", height: "70px", objectFit: "cover" }} src={src.value} />
                                                        <ErrorMessage name="hinhAnh" render={msg => <p className="errorMess" >{msg}</p>}></ErrorMessage>
                                                    </Grid>
                                                </div>
                                                <p className="errorMess"></p>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <div className="form-group">
                                                    <Grid className="title" item sm={4}>
                                                        <label>
                                                            Ngày Khởi Chiếu
                                                        </label>
                                                    </Grid>

                                                    <Grid className="form-input" item sm={8}>
                                                        <label className="hd">Ngày Khởi Chiếu</label>
                                                        <input defaultValue={itemMoive.ngayKhoiChieu} name="ngayKhoiChieu" onChange={formikProps.handleChange} type="date" style={{ marginLeft: "10px" }} onClick={handleStyle} placeholder="Ngày Khởi Chiếu" />
                                                    </Grid>

                                                </div>
                                                <ErrorMessage name="ngayKhoiChieu" render={msg => <p className="errorMess" >{msg}</p>}></ErrorMessage>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <div className="form-group">
                                                    <Grid className="title" item sm={3}>
                                                        <label>
                                                            Đánh Giá
                                                        </label>
                                                    </Grid>
                                                    <Grid className="form-input" item sm={9}>
                                                        <label className="hd"> Đánh Giá</label>
                                                        <input defaultValue={itemMoive.danhGia} name="danhGia" onChange={formikProps.handleChange} type="number" onClick={handleStyle} placeholder=" Đánh Giá" />
                                                    </Grid>
                                                </div>
                                                <ErrorMessage name="danhGia" render={msg => <p className="errorMess" >{msg}</p>}></ErrorMessage>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <div className="form-group">
                                                    <Grid className="title" item sm={3}>
                                                        <label>
                                                            Mã Nhóm
                                                        </label>
                                                    </Grid>
                                                    <Grid className="form-input" item sm={9}>
                                                        <label className="hd">Mã Nhóm</label>
                                                        <input disabled defaultValue="GP11" />
                                                    </Grid>
                                                </div>
                                                <p className="errorMess"></p>
                                            </Grid>
                                            <Grid item sm={12}>
                                                <div className="form-group">
                                                    <Grid className="desciption" item sm={1}>
                                                        <label>
                                                            Mô tả
                                                        </label>
                                                    </Grid>
                                                    <Grid className="form-input" item sm={11}>
                                                        <label style={{ width: "10%" }} className="hd">Mô tả</label>
                                                        <textarea defaultValue={itemMoive.moTa} name="moTa" onChange={formikProps.handleChange} onClick={handleStyle} placeholder="Mô tả" />
                                                    </Grid>
                                                </div>
                                                <ErrorMessage name="moTa" render={msg => <p className="errorMess" >{msg}</p>}></ErrorMessage>
                                            </Grid>
                                            <Grid style={{ textAlign: "center", }} item sm={12}>
                                                <Button style={{ background: "#f37520", color: "#fff" }} type="submit">
                                                    {items.title}
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

export default Modalmoive;



