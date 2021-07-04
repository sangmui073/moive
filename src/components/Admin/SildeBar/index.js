import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Drawer, List, Divider, IconButton, ListItem, ListItemIcon, ListItemText, } from '@material-ui/core';
import { ChevronLeft, ChevronRight, Inbox, Mail, Group, Movie, Facebook, Twitter, Input, PowerSettingsNew } from '@material-ui/icons';

import { useTheme } from '@material-ui/core/styles';
import { useStyles } from "./style"
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

SideBar.propTypes = {
    open: PropTypes.bool,

};
SideBar.defaultProps = {
    open: true,

}
const arrayMenuOne = [
    {
        text: 'Quản Lý Người Dùng',
        icon: <Group />,
        path: "/admin/dashboard",
        handleRedirect: (history) => {
            history.push("/admin/dashboard")
        }
    },
    {
        text: "Quản Lý Phim",
        icon: <Movie />,
        path: "/admin/usermanager",
        handleRedirect: (history) => {
            history.push("/admin/usermanager")
        }
    },
    {
        text: "Facebook",
        icon: <Facebook />
    },
    ,
    {
        text: "Twitter",
        icon: <Twitter />
    }
];
const arrayMenuTwo = [
    {
        text: "Quay Lại Home",
        icon: <Input />
    },
    {
        text: "Đăng Xuất",
        icon: <PowerSettingsNew />
    }
]

function SideBar(props) {
    const history = useHistory();
    const theme = useTheme();
    const classes = useStyles();
    const { open } = props;
    const url = useRouteMatch();

    return (
        <Drawer
            className={open ? classes.drawer : classes.hide}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton >
                    {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {arrayMenuOne.map((item, index) => {
                    const { path, handleRedirect, text, icon } = item;
                    return (
                        <ListItem button={true} key={index} className={path === url.path ? classes.active : ""} onClick={() => {

                            if (!item.handleRedirect) return
                            handleRedirect(history);

                        }}>
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    )
                })}
            </List>
            <Divider />
            <List>
                {arrayMenuTwo.map((item, index) => (
                    <ListItem button key={index}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}

            </List>
        </Drawer>
    )
}

export default SideBar;

// import React from 'react';
// import Proptype from "prop-types"


// SideBar.propTypes = {
//     open : Proptype
// }

// function SideBar(props) {
//     const theme = useTheme();
//     const classes = useStyles();
//     const handleDrawerClose = () => {

//     }
//     
// }
// export default SideBar