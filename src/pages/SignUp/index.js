import React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { ErrorMessage, Formik, Form } from 'formik';

import Swal from 'sweetalert2'

import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_SAGA } from '../../redux/saga/Constants/auth-constants';
import { useHistory } from 'react-router';
import { useStyles } from "./style";
import { sigupUserSchema } from '../../services/authServices';


export default function SignUp() {
  const classes = useStyles();
  const history = useHistory()
  const { messengerSigUp } = useSelector(state => state.auth);
  console.log(messengerSigUp)
  const handleSubmit = (values, chema) => {
    console.log(chema)
    dispatch({
      type: SIGN_UP_SAGA,
      payload: {
        values: values,
        Swal: Swal,
        history: history
      }
    })

  }

  const dispatch = useDispatch();
  return (
    <section className={`${classes.root} box`} >
      <Container style={{ background: "#fff", borderRadius: "5px" }} component="div" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" style={{ marginBottom: "15px" }} variant="h5">
            Đăng ký
          </Typography>
          <Formik initialValues={{
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: 'GP11',
            maLoaiNguoiDung: "KhachHang",
            hoTen: ""
          }} onSubmit={handleSubmit} validationSchema={sigupUserSchema}>
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
                    <ErrorMessage name="hoTen" render={msg => <div className={classes.messError} >{msg}</div>}></ErrorMessage>

                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      label="Số điện thoại"
                      name="soDt"

                      onChange={formikProps.handleChange}
                    /><ErrorMessage name="soDt" render={msg => <div className={classes.messError} >{msg}</div>} />


                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="taiKhoan"
                      label="Tài Khoản"
                      type="text"
                      onChange={formikProps.handleChange}
                    /><ErrorMessage name="taiKhoan" render={msg => <div className={classes.messError} >{msg}</div>} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="matKhau"
                      label="Mật khẩu"
                      type="password"

                      onChange={formikProps.handleChange}
                    /><ErrorMessage name="matKhau" render={msg => <div className={classes.messError} >{msg}</div>} />
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
                    /><ErrorMessage name="email" render={msg => <div className={classes.messError} >{msg}</div>} />
                  </Grid>

                  <Grid item xs={12}>

                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
                <Grid container justify="center" style={{ marginBottom: "10px" }}>
                  <Grid item>
                    Nếu đã có tài khoản ,
                    <Link style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => {
                      history.push("/Sig-In")
                    }} variant="body2">
                      hãy đăng nhập tại đây
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>

      </Container>
    </section>
  );
}
// }
