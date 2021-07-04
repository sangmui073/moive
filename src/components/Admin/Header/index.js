import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Typography, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { useStyles } from "./style"
HeaderAdmin.propTypes = {
    setOpen: PropTypes.func,
    open: PropTypes.bool
};
HeaderAdmin.defaultProps = {
    setOpen: null,
    open: true
}
function HeaderAdmin(props) {
    const user = JSON.parse(localStorage.getItem("user"));

    const classes = useStyles()
    const { setOpen, open } = props;
    const handleDrawerOpen = () => {
        if (setOpen) {
            setOpen(!open)
        }
    }
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar className={classes.toolBar}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                    <h3>
                        Dashboard
                    </h3>
                </IconButton>
                <div className={classes.accout} >
                    <Avatar alt="Remy Sharp" src={`https://i.pravatar.cc/150?u=${user?.taiKhoan}`} className={classes.large} />
                    <Typography variant="subtitle1">{user?.taiKhoan}</Typography>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default HeaderAdmin;