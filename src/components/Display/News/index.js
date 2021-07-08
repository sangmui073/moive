import React, { memo, useState } from 'react'
import { BottomNavigation, BottomNavigationAction, Button, Container, Grid } from '@material-ui/core';
import NewsData from "../../../assets/Fakedata/News.json"
import { useStyles } from "./style";
import { Link } from "react-router-dom"
import bg from "../../../assets/img/back-news.d713fc3a.png"

const title = [{
    title: "News",
    label: "Tin Tức",
}, {
    title: "Reviews",
    label: "Đánh Giá",
}, {
    title: "Sales",
    label: "Khuyến Mãi"
}]
function News() {
    const classes = useStyles();
    const [data, setData] = useState(NewsData[0]);
    const topData = data.top;
    const bottomLeft = data.bottomLeft;
    const bottomRight = data.bottomRight;
    const renderTopItems = () => {
        return topData.map((it, index) => {
            return (
                <Grid className={classes.items} key={index} item xs={12} sm={6}>
                    <div className="container-img">
                        <div className="img-content">
                            <img alt={it.img} src={process.env.PUBLIC_URL + `${it.img}`} />
                            <div className="bg-hd">
                                <a href={it.url} target="_blank" />
                            </div>
                        </div>
                    </div>
                    <h3>
                        <a target="_blank" href={it.url}  >
                            {it.title.length > 80 ? it.title.substring(0, 80) + "..." : it.title}
                        </a>
                    </h3>
                    <p>
                        {it.description.length > 130 ? it.description.substring(0, 130) + "..." : it.description}
                    </p>
                </Grid>
            )
        })
    }
    const renderBottomItemLeft = () => {
        return bottomLeft.map((it, index) => {

            return (<Grid key={index} item sm={6}>
                <div className={`${classes.items} `}>
                    <div className="container-img -bottom">
                        <div className="img-content">
                            <img alt={it.img} src={process.env.PUBLIC_URL + `${it.img}`} />

                            <div className="bg-hd">
                                <a target="_blank" href={it.url}>

                                </a>
                            </div>
                        </div>
                    </div>
                    <h3>
                        <a target="_blank" href={it.url}>
                            {it.title}
                        </a>

                    </h3>
                    <p>
                        {it.description.length > 130 ? it.description.substring(0, 130) + "..." : it.description}
                    </p>
                </div>
            </Grid>)
        })
    }
    const renderBottomItemRight = () => {
        return bottomRight.map((it, index) => {
            return (
                <Grid alignItems="center" className={classes.extra} spacing={3} container key={index}>
                    <Grid className="-img" item xs={3} sm={4}>
                        <a target="_blank" href={it.url}>
                            <img src={process.env.PUBLIC_URL + `${it.img}`} />
                        </a>
                    </Grid>
                    <Grid item xs={9} sm={8}>
                        <h3 className="-text">
                            <a target="_blank" href={it.url}>
                                {it.title.length > 50 ? it.title.substr(0, 50) + "..." : it.title}
                            </a>
                        </h3>

                    </Grid>
                </Grid>
            )
        })
    }
    const [value, setValue] = useState(title[0].title);
    const handleChange = (idData) => {
        const currentData = NewsData.find((data) => {
            return data.IDdata === idData
        })
        if (!currentData) return
        setData(currentData)
    }
    const renderTitle = () => {
        return title.map((menu) => {
            return (
                <BottomNavigationAction key={menu.title} value={menu.title} label={menu.label} />
            )
        })
    }
    return (
        <Container className={classes.root} maxWidth="lg">
            <div className={classes.title}>
                <img srcSet={bg} />
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        handleChange(newValue)
                        setValue(newValue);
                    }}
                    showLabels
                >
                    {renderTitle()}
                </BottomNavigation>
            </div>
            <Grid spacing={1} container>
                {renderTopItems()}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8} md={7} lg={8} >
                        <Grid container spacing={3}>
                            {renderBottomItemLeft()}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4} md={5} lg={4} >
                        {renderBottomItemRight()}
                    </Grid>
                </Grid>

            </Grid>
            <div style={{ background: `url(${bg})` }} className="btn-more">
                <Button color="primary" variant="contained">Xem Them</Button>
            </div>
        </Container>
    )
}

export default memo(News)