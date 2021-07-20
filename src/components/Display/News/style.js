import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {

        "& img": {
            width: "100%",
            height: "100%",
            display: "block",
        },
        "& a": {
            display: "block",
            height: "100%",
            width: "100%",
            zIndex: "10",
            color: "rgba(0,0,0,0.7)",
            transition: "color 0.4s",
            textDecoration: "none",
            "&:hover": {
                color: "rgb(254, 121, 0)"
            },
        },
        "& h3": {
            color: "rgba(0,0,0,0.7)",
            transition: "color 0.4s",
            height: "45px",
            "&:hover": {
                color: "rgb(254, 121, 0)"
            },
        },
        "& .btn-more": {
            textAlign: "center",
            margin: "30px 0px",
            padding: "50px 0",
            [theme.breakpoints.down("md")]: {
                padding: "25px 0",
                margin: "5px 0"
            },
        }
    },
    items: {
        "& .container-img": {
            overflow: "hidden",
            height: "350px",
            width: "100%",
            borderRadius: "5px",
            boxShadow: "0px 0px 5px 5px rgba(0,0,0,0.2)",
            border: "1px solid rgba(0,0,0,0.2)",
            transition: "all 0.4s",
            [theme.breakpoints.down("sm")]: {
                height: "300px",
            },
            "&:hover": {
                boxShadow: "inset 0px 0px 5px 5px rgba(0,0,0,0.2)"
            },
            "& .img-content": {
                position: "relative",
                transition: "all 0.4s",

                height: "100%",
                width: "100%",
                "&:hover": {
                    transform: "scale(1.1)"
                },
                "& .bg-hd": {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    background: "rgba(8, 8, 8, 0.38)",
                    transition: "all 0.4s",
                    "&:hover": {
                        background: "rgb(200 200 200 / 15%)",
                    }
                },
                "& img": {
                    borderRadius: "5px",
                    objectFit: "cover"
                },
            },
        },
        "& .-bottom": {
            height: "250px"
        },
    },
    extra: {
        "& .-img": {
            "& a": {
                height: "75px",
                width: "85px",
                "& img": {
                    borderRadius: "5px",
                }
            },

        },
        "& .-text": {
            fontWeight: "normal",
            fontSize: "16px"
        }
    },
    title: {

        "& img": {
            height: "150px"
        },
        position: "relative",
        "& .MuiBottomNavigation-root": {
            position: "absolute",
            top: "50%",
            left: "50%",
            background: "inherit",
            transform: "translate(-50%,-50%)",
            width: "60%",
            [theme.breakpoints.down("md")]: {
                width: "90%"
            },
            "& .MuiBottomNavigationAction-root": {
                minWidth: "auto",
                maxWidth: "inherit",
                "& .MuiBottomNavigationAction-label": {
                    fontSize: "30px",
                    WebkitTextFillColor: "#ffff",
                    WebkitTextStrokeColor: "#1f1b1b",
                    WebkitTextStrokeWidth: "1px",
                    letterSpacing: "1px",
                    transition: "all 0.5s",
                    textShadow: "-6px 3px 0px rgba(163, 163, 163, 0.5)",
                    "&:hover": {
                        WebkitTextStrokeColor: "#fe7900",
                    }
                },
                "& .Mui-selected": {
                    transition: "all 0.5s",
                    WebkitTextStrokeColor: "#fe7900",

                }
            }
        }
    }
}));
export { useStyles };