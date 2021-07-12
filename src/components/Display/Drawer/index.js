import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Avatar,
} from "@material-ui/core";
import {
  VpnKey,
  Theaters,
  FiberNew,
  ExitToApp,
  Movie,
  Home,
  Menu,
  Settings,
} from "@material-ui/icons";

import { useStyles } from "./style";
import { useHistory } from "react-router-dom";
import { LOG_OUT } from "../../../redux/reducer/Constants/auth-constants";
import { useDispatch } from "react-redux";
const menuUser = [
  {
    text: "Đăng Nhập",
    icon: <Avatar />,
    path: "/Sig-In",
  },
  {
    text: "Đăng Ký",
    icon: <VpnKey />,
    path: "/Sig-Up",
  },
  {
    text: "Trang Chủ",
    icon: <Home />,
    path: "/",
  },
];
const menuSection = [
  {
    text: "Menu",
    icon: <Menu />,
    id: "navCarousel",
  },
  {
    text: "Lịch Chiếu",
    icon: <Movie />,
    id: "carouselHot",
  },
  {
    text: "Cụm Rạp",
    icon: <Theaters />,
    id: "thearter",
  },
  {
    text: "Tin Tức",
    icon: <FiberNew />,
    id: "news",
  },
];
function ResponsiveDrawer(props) {
  const { window, toggle, handleDrawer } = props;
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));
  const [value, setValue] = useState("navCarousel");
  const [action, setAction] = useState("");
  const handleClick = (event, id) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      `#${id}`
    );
    if (anchor) {
      console.log("sroll");
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  const dispatch = useDispatch();
  const renderLogin = () => {
    return (
      <List>
        <ListItem>
          <ListItemIcon>
            {" "}
            <Avatar
              src={
                user.hinhAnh
                  ? user.hinhAnh
                  : `https://i.pravatar.cc/150?u=${user.taiKhoan}`
              }
            />
          </ListItemIcon>
          <ListItemText
            primary={user.hoTen}
            style={{ marginLeft: "5px" }}
            onClick={() => {
              history.push("/User-Profie");
            }}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {" "}
            <Home />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
              history.push("/");
            }}
            primary={"Trang Chủ"}
            style={{ marginLeft: "5px" }}
          />
        </ListItem>
      </List>
    );
  };

  useEffect(() => { }, [action]);
  const drawer = (
    <div>
      <List>
        {user
          ? renderLogin()
          : menuUser.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                if (item.path === "/Sig-In") {
                  setAction(item.path);
                }
                history.push(item.path);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                style={{ marginLeft: "5px" }}
              />
            </ListItem>
          ))}
      </List>
      <Divider />
      {history.location.pathname === "/" ? (
        <List>
          {menuSection.map((item, index) => {
            return (
              <ListItem button key={index}>
                <ListItemIcon
                  style={{ color: `${value === item.id ? "#fe7900" : ""}` }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  onClick={(event) => {
                    handleClick(event, item.id);
                    setValue(item.id);
                  }}
                  primary={item.text}
                  style={{
                    color: `${value === item.id ? "#fe7900" : ""}`,
                    marginLeft: "5px",
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      ) : (
        ""
      )}
      <Divider />
      {user ? (
        <List>
          <ListItem>
            <ListItemIcon style={{ color: "red" }}>
              {" "}
              <ExitToApp />
            </ListItemIcon>
            <ListItemText
              primary="Đăng Xuất"
              style={{ marginLeft: "5px", color: "red" }}
              onClick={() => {
                localStorage.removeItem("user");
                dispatch({
                  type: LOG_OUT,
                });
                setAction("LOG_OUT");
              }}
            />
          </ListItem>
        </List>
      ) : (
        ""
      )}
      <List>
        <ListItem>
          <ListItemIcon>
            {" "}
            <Settings />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
              history.push("/admin");
            }}
            primary="Admin"
            style={{ marginLeft: "5px" }}
          />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={toggle}
            onClose={handleDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default memo(ResponsiveDrawer);
