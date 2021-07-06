import React from 'react';
import { ErrorMessage, Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import { useStyles } from "../ModalMoive/style"
import { Button, Container, Grid, Backdrop, Modal, Fade } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { admin_domain } from "../../../assets/Domain/AdminDomain";
import { sigupUserSchema } from "../../../services/authServices"
import { ADD_USER_SAGA, PUT_USER_SAGA } from '../../../redux/saga/Constants/admin-constants';
Modalusers.propTypes = {
    handleModal: PropTypes.func,
    open: PropTypes.bool,
    handleAction: PropTypes.func,
    list: PropTypes.object,
    handleAction: PropTypes.func
};
Modalusers.defaultProps = {
    handleModal: null,
    open: false,
    handleAction: null
}


function Modalusers(props) {
    const { manageUser } = admin_domain;
    const classes = useStyles();
    const { handleModal, open, list, handleAction } = props;
    const { items, title, action } = list

    const dispatch = useDispatch();
    const handleUltyModal = () => {
        handleModal(false, {
            title: "",
            action: "",
            items: {
                taiKhoan: "",
                matKhau: "",
                hoTen: "",
                email: "",
                soDt: "",
                maLoaiNguoiDung: "KhachHang",
                maNhom: "GP11",
            }
        })
    }
    const handleSubmit = (value) => {
        switch (action) {
            case "ADD": {
                const url = manageUser.post;
                console.log("alo")
                dispatch({
                    type: ADD_USER_SAGA,
                    payload: {
                        item: value,
                        url: url,
                        handleAction: handleAction
                    }
                })
                break;
            }
            default: {
                const url = manageUser.put;
                dispatch({
                    type: PUT_USER_SAGA,
                    payload: {
                        url: url,
                        item: value,
                        handleAction: handleAction
                    }
                })
                break;
            }

        }

        handleUltyModal()
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
                            <Formik initialValues={items} onSubmit={handleSubmit} validationSchema={sigupUserSchema}>
                                {(formikProps) => (
                                    <Form className={classes.form} onClick={() => {
                                        document.querySelectorAll(".form-group").forEach((el) => {
                                            el.classList.remove("active")
                                        })
                                    }} noValidate>
                                        <h2 style={{ textAlign: "center", color: "#f37520", margin: "15px 0px" }}>{title}</h2>

                                        <Grid spacing={2} container>
                                            <Grid item sm={6}>
                                                <div style={{ background: items.taiKhoan ? "rgba(0,0,0,.54)" : "" }} className="form-group">
                                                    <Grid className="title" item sm={3}>
                                                        <label style={{ color: items.taiKhoan ? "#fff" : "" }}>
                                                            Tài Khoản
                                                        </label>
                                                    </Grid>
                                                    <Grid className="form-input" item sm={9}>
                                                        <label className="hd">Tài Khoản</label>
                                                        <input style={{ background: items.taiKhoan ? "inherit" : "", color: items.taiKhoan ? "#fff" : "" }} disabled={items.taiKhoan ? true : false} defaultValue={items.taiKhoan} onChange={formikProps.handleChange} name="taiKhoan" placeholder="Tài Khoản" onClick={handleStyle} />
                                                    </Grid>
                                                </div>
                                                <ErrorMessage name="taiKhoan" render={msg => <p className="errorMess" >{msg}</p>}></ErrorMessage>

                                            </Grid>
                                            <Grid item sm={6}>
                                                <div className="form-group">
                                                    <Grid className="title" item sm={3}>
                                                        <label>
                                                            Mật Khẩu
                                                        </label>
                                                    </Grid>

                                                    <Grid className="form-input" item sm={9}>
                                                        <label className="hd"> Mật Khẩu</label>
                                                        <input defaultValue={items.matKhau} name="matKhau" onClick={handleStyle} placeholder="Mật Khẩu" onChange={formikProps.handleChange} />
                                                    </Grid>
                                                </div>
                                                <ErrorMessage name="matKhau" render={msg => <p className="errorMess" >{msg}</p>}></ErrorMessage>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <div className="form-group">
                                                    <Grid className="title" item sm={3}>
                                                        <label>
                                                            Họ Tên
                                                        </label>
                                                    </Grid>

                                                    <Grid className="form-input" item sm={9}>
                                                        <label className="hd"> Họ Tên</label>
                                                        <input defaultValue={items.hoTen} name="hoTen" onClick={handleStyle} placeholder="Họ Tên" onChange={formikProps.handleChange} />
                                                    </Grid>
                                                </div>
                                                <ErrorMessage name="hoTen" render={msg => <p className="errorMess" >{msg}</p>}></ErrorMessage>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <div className="form-group">
                                                    <Grid className="title" item sm={3}>
                                                        <label>
                                                            Email
                                                        </label>
                                                    </Grid>

                                                    <Grid className="form-input" item sm={9}>
                                                        <label className="hd"> Email</label>
                                                        <input defaultValue={items.email} name="email" onClick={handleStyle} type="email" placeholder="Email" onChange={formikProps.handleChange} />
                                                    </Grid>
                                                </div>
                                                <ErrorMessage name="email" render={msg => <p className="errorMess" >{msg}</p>}></ErrorMessage>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <div className="form-group">
                                                    <Grid className="title" item sm={3}>
                                                        <label>
                                                            Phone
                                                        </label>
                                                    </Grid>

                                                    <Grid className="form-input" item sm={9}>
                                                        <label className="hd"> Phone</label>
                                                        <input defaultValue={items.soDt} name="soDt" onClick={handleStyle} placeholder="số điện thoại" onChange={formikProps.handleChange} />
                                                    </Grid>
                                                </div>
                                                <ErrorMessage name="soDt" render={msg => <p className="errorMess" >{msg}</p>}></ErrorMessage>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <div className="form-group">
                                                    <Grid style={{ background: "#7ab893", borderRadius: "5px" }} className="title" item sm={3}>
                                                        <label>
                                                            Người Dùng
                                                        </label>
                                                    </Grid>
                                                    <Grid className="form-input" item sm={9}>
                                                        <label style={{ width: "35%" }} className="hd"> Người Dùng</label>
                                                        <select defaultValue={items.maLoaiNguoiDung} onChange={formikProps.handleChange} name="maLoaiNguoiDung" style={{ border: "none", outline: "none", fontSize: "16px" }}>

                                                            <option value="KhachHang">Khách Hàng</option>
                                                            <option value="QuanTri">Quản Trị</option>
                                                        </select>
                                                    </Grid>
                                                </div>
                                                <ErrorMessage name="maLoaiNguoiDung" render={msg => <p className="errorMess" >{msg}</p>}></ErrorMessage>
                                            </Grid>

                                            <Grid style={{ textAlign: "center" }} item sm={12}>
                                                <Button style={{ background: "#f37520", color: "#fff", margin: "15px 0px" }} type="submit" >
                                                    {title}
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
export default Modalusers;

// : {
//     taiKhoan: "",
//     matKhau: "",
//     hoTen: "",
//     email: "",
//     soDt: "",
//     maLoaiNguoiDung: "KhachHang",
//     maNhom: "GP11",
// }