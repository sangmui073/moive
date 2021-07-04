import React, { memo, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Redirect, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { SIGN_IN_SAGA } from '../../redux/saga/Constants/auth-constants';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const userAdmin = JSON.parse(localStorage.getItem("user"));
function UserManagerment() {
  const classes = useStyles();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: ""
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const handleSubtmit = (e) => {
    e.preventDefault();
    dispatch({
      type: SIGN_IN_SAGA,
      payload: { user }
    });
    setTimeout(() => {
      history.push("/admin/dashboard")
    }, 2000);

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }
  // if (userAdmin) {
  if (userAdmin?.maLoaiNguoiDung && userAdmin?.maLoaiNguoiDung === "QuanTri") {
    return <Redirect to="/admin/dashboard" />
  }
  return (
    <Container className="box" component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Tài Khoản"
            name="taiKhoan"
            autoComplete="taiKhoan"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="matKhau"
            label="Password"
            type="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubtmit}
          >
            Đăng Nhập
          </Button>
        </form>
      </div>
    </Container>
  )
}
export default memo(UserManagerment);
