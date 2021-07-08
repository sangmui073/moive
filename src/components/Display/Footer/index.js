import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid } from '@material-ui/core';

import { useStyles } from "./style"

FooterClient.propTypes = {

};
const logoCinemas = [
    "/img/logo/1.png",
    "/img/logo/2.png",
    "/img/logo/3.png",
    "/img/logo/4.jpg",
    "/img/logo/5.png",
    "/img/logo/6.png",
    "/img/logo/7.jpg",
    "/img/logo/8.png",
    "/img/logo/9.png",
    "/img/logo/10.png",
    "/img/logo/11.png",
    "/img/logo/12.png",
    "/img/logo/13.png",
    "/img/logo/14.png",
    "/img/logo/15.jpg",
    "/img/logo/16.png",
    "/img/logo/17.png",
    "/img/logo/18.png",
    "/img/logo/19.png",
    "/img/logo/20.png",
];
const logoApps = [
    "/img/logo/apple.png", "/img/logo/androin.png",
];
const logoSocials = [
    "/img/logo/facebook.png", "/img/logo/zalo.png",
];
function FooterClient(props) {
    const classes = useStyles();
    return (
        <footer className={classes.root}>
            <Container maxWidth="lg">
                <Grid className="container-ft" spacing={4} container>
                    <Grid item sm={3} md={4}>
                        <Grid container>
                            <Grid item sm={12} md={6}>
                                <h4>TIX</h4>
                                <p className="tix_text">
                                    <a href="#" target="_blank">
                                        FAQ
                                    </a>
                                    <a style={{ marginTop: "10px" }} href="#" target="_blank">
                                        Brand Guidelines
                                    </a>
                                </p>
                            </Grid>
                            <Grid item sm={12} md={6}>
                                <h4 className="hd-field" >hidden</h4>
                                <p className="tix_text">
                                    <a href="#" target="_blank">
                                        Thỏa thuận sử dụng
                                    </a>
                                    <a style={{ marginTop: "10px" }} href="#" target="_blank">
                                        Chính sách bảo mật
                                    </a>
                                </p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid className="sm-multilogo" item sm={5} md={4}>
                        <div className={classes.mutilogo}>
                            <h4 style={{ marginLeft: "10px", marginBottom: "5px" }}>ĐỐI TÁC</h4>
                            <p style={{ marginTop: "5px" }}>
                                {logoCinemas.map((lo, index) => {
                                    return (
                                        <a className="logo-img" key={index} href="#" target="_blank">
                                            <img src={process.env.PUBLIC_URL + `${lo}`} />
                                        </a>
                                    )
                                })}
                            </p>
                        </div>
                    </Grid>
                    <Grid item sm={3} md={4}>
                        <Grid container>
                            <Grid item sm={12} md={6}>
                                <h4 style={{ marginLeft: "10px", marginBottom: "5px" }}>MOBILE APP</h4>

                                <p style={{ marginTop: "5px" }}>
                                    {logoSocials.map((lo, index) => {
                                        return (
                                            <a className="logo-img -app" key={index} href="#" target="_blank">
                                                <img src={process.env.PUBLIC_URL + `${lo}`} />
                                            </a>
                                        )
                                    })}
                                </p>
                            </Grid>
                            <Grid item sm={12} md={6}>
                                <h4 style={{ marginLeft: "20px", marginBottom: "5px" }}>SOCIAL</h4>

                                <p style={{ marginTop: "5px" }}>
                                    {logoApps.map((lo, index) => {
                                        return (
                                            <a className="logo-img -app" key={index} href="#" target="_blank">
                                                <img src={process.env.PUBLIC_URL + `${lo}`} />
                                            </a>
                                        )
                                    })}
                                </p>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid className={classes.confirm} container spacing={1}>
                    <Grid item sm={2}>
                        <a className="zion">
                            <img src={process.env.PUBLIC_URL + "/img/logo/zion.jfif"} />
                        </a>
                    </Grid>
                    <Grid item sm={8}>
                        <h4>TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION</h4>
                        <p className="andress">
                            <span>
                                Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.
                            </span>
                            <span>
                                Giấy chứng nhận đăng ký kinh doanh số: 0101659783,

                            </span>
                            <span>
                                đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh
                            </span>
                            <span>
                                Số Điện Thoại (Hotline): 1900 545 436
                            </span>
                            <span>
                                Email :
                                <a href="#" target="_blank" style={{ marginLeft: "5px", display: "inline-block", color: "#fb4226" }}>
                                    support@tix.vn
                                </a>
                            </span>
                        </p>
                    </Grid>
                    <Grid item sm={2}>
                        <a className="boTT" href="#" target="_blank">
                            <img src={process.env.PUBLIC_URL + "/img/logo/bott.png"} />
                        </a>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
}

export default memo(FooterClient);