import React, { memo, useCallback, useMemo, useState } from "react";
import {
  ButtonGroup,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardActionArea,
  useScrollTrigger,
} from "@material-ui/core";
import PropTypes from 'prop-types';
import logo from "../../../assets/img/img_66.png";
import AccoutIcon from "@material-ui/icons/AccountCircleRounded";
import MenuIcon from "@material-ui/icons/Menu";
import PrimaryTitle from "../Menu";
import Drawer from "../Drawer";
import LogOut from "@material-ui/icons/ExitToApp";
import { useStyles } from "./style";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT } from "../../../redux/reducer/Constants/auth-constants";


ButtonAppBar.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string
};
ButtonAppBar.defaultProps = {
  title: "navCarousel",
  onChange: null
}
function ButtonAppBar({ title, onChange, id }, props) {

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawer = useCallback(() => {
    setDrawerOpen(!drawerOpen);
  }, [drawerOpen]);

  const renderUser = () => {
    if (user && user.hoTen) {
      return (
        <ButtonGroup
          className={classes.btnGroup}
          variant="text"
          color="inherit"
          aria-label="text primary button group"
        >
          <Button color="inherit" onClick={() => {
            history.push("/User-Profie")
          }}>
            <img
              src={`https://i.pravatar.cc/150?u=${user.taiKhoan}`}
              style={{
                width: "30px",
                height: "30px",
                marginRight: "10px",
                borderRadius: "50%",
              }}
            />
            <span style={{ fontWeight: "bold" }}>{user.taiKhoan}</span>
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              dispatch({
                type: LOG_OUT,
              });
              history.push("/")
            }}
            color="inherit"
          >
            <LogOut />
          </Button>
        </ButtonGroup>
      );
    } else {
      return (
        <ButtonGroup
          className={classes.btnGroup}
          variant="text"
          color="inherit"
          aria-label="text primary button group"
        >
          <Button
            color="inherit"
            onClick={() => {
              history.push("/Sig-In");
            }}
          >
            <AccoutIcon className={classes.icon} />
            Login
          </Button>
          <Button
            onClick={() => {
              history.push("/Sig-Up");
            }}
          >
            Register
          </Button>
        </ButtonGroup>
      );
    }
  };
  return (
    <div id={id} className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Card className={classes.Card}>
            <CardActionArea>
              <CardMedia
                title="Contemplative Reptile"
                component="img"
                src={logo}
              />
            </CardActionArea>
          </Card>
          <PrimaryTitle title={title} onChange={onChange} />
          {renderUser()}

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              setDrawerOpen(!drawerOpen);
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer handleDrawer={handleDrawer} toggle={drawerOpen} />

    </div>
  );
}
export default memo(ButtonAppBar);
