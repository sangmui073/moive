import React, { useState, memo } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ModalUser from "../../components/Display/Modaluser";
import { useDispatch } from "react-redux";
import { SIGN_IN_SAGA } from "../../redux/saga/Constants/auth-constants";
import { useStyles } from "./style";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function SigIn() {
  const classes = useStyles();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch({
      type: SIGN_IN_SAGA,
      payload: {
        user: user,
      },
    });
    handleOpen(true);
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({
      ...user, //coppy lại state cũ trước đó
      [name]: value, // cập nhật lại state (khác bên class nó tự động clone cho bạn.. bên đây ko clone nó sẽ ghi đè)
    });
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Grid container component="section" className={`${classes.root} box`}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} className={classes.wapper} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng Nhập
          </Typography>
          <form onSubmit={handleLogin} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="taiKhoan"
              label="Tài Khoản"
              name="taiKhoan"
              autoComplete="Tài Khoản"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="matKhau"
              label="Mật Khẩu"
              type="password"
              id="matKhau"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      <ModalUser open={open} setOpen={setOpen} />
    </Grid>
  );
}
export default memo(SigIn);
