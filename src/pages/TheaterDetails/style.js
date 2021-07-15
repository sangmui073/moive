import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: "50px ",

        "& .parent-container": {
            position: "relative",
            paddingTop: "50px",
            "& .-img": {
                height: "320px",
                "& img": {
                    borderRadius: "5px",
                    boxShadow: " -1px 2px 5px 10px rgba(0,0,0,0.35)",
                },
            },
            "& .-content": {
                color: "#fff",
                width: "95%",
                marginLeft: "auto",
                "& p": {
                    fontSize: "20px",
                    [theme.breakpoints.down("xs")]: {
                        height: "100px",
                        overflow: "hidden"
                    },
                },
                "& h1": {
                    fontSize: "25px",
                    marginTop: "45px",
                    [theme.breakpoints.down("xs")]: {
                        height: "80px",
                        overflow: "hidden",
                        marginTop: "35px",
                    },
                },
                "& button": {
                    background: "#fe7900",
                    marginTop: "5px",
                    "& svg": {
                        fill: "#fff",
                    },
                    "& span": {
                        color: "#fff",
                        fontSize: "16px",
                    },
                },
            },
            "& .bg-liner": {
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                backgroundSize: "cover",
                zIndex: "-1",
                filter: "blur(15px)",
            },
        },
        "& img": {
            display: "block",
            width: "100%",
            height: "100%",
        },
    },

    system: {
        padding: "50px 0px",
        "& .container-title": {
            display: "flex",
            justifyContent: "center"
        },
        "& .system-child": {
            borderRight: "1px solid rgba(0,0,0,0.3)",
            // [theme.breakpoints.down("xs")]: {
            //     height: "100%",
            //     overflowY: "hidden",
            // },
            "& .mobile-btnUp.mobile-btnUp": {
                display: "none",

                [theme.breakpoints.down("xs")]: {
                    display: "block",
                    textAlign: "center",
                },
                "& .MuiButton-text": {
                    width: "100%",
                    margin: "0 auto",
                    background: "rgb(254, 121, 0)",
                    color: "#fff",
                    "& .icon-up": {
                        animation: "none",
                        position: "relative",
                        [theme.breakpoints.down("xs")]: {
                            animation: `$tranY 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) infinite both`,

                        },
                    },
                    "& .icon-down": {
                        animation: "none",
                        position: "relative",
                        [theme.breakpoints.down("xs")]: {
                            animation: `$tranY 1.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) infinite reverse both`,
                        },
                    },
                },
            },
            "& .silde": {
                height: "550px",
                overflowY: "scroll",
                overflowX: "hidden",
                "&::-webkit-scrollbar": {
                    width: "5px",
                    height: "0.2em",
                },
                "&::-webkit-scrollbar-track": {
                    boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#fe7900",
                    outline: "2px solid rgba(0, 0, 0, 0.1)",
                },
                [theme.breakpoints.down("xs")]: {
                    height: "210px",
                    overflow: "hidden",
                },
            }
        },
        "& .moive-child": {
            overflowY: "scroll",
            height: "520px",
            [theme.breakpoints.down("xs")]: {
                height: "100%",
                overflowY: "hidden",
            },
        },

        "& .wapper": {
            padding: "15px 10px",
            "& .MuiGrid-grid-sm-5": {
                "&::-webkit-scrollbar": {
                    width: "5px",
                    height: "0.2em",
                },
                "&::-webkit-scrollbar-track": {
                    boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#fe7900",
                    outline: "2px solid rgba(0, 0, 0, 0.1)",
                },
            },
            "& .MuiGrid-grid-sm-7": {
                "&::-webkit-scrollbar": {
                    width: "5px",
                    height: "0.2em",
                },
                "&::-webkit-scrollbar-track": {
                    boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#fe7900",
                    outline: "2px solid rgba(0, 0, 0, 0.1)",
                },
            },
        },
        "& img": {
            display: "block",
            width: "100%",
            height: "100%",
        },
        "& .-andess": {
            opacity: "0.6",
            minHeight: "auto",
            cursor: "pointer",
            transition: "all 0.5s",
            padding: "10px 0px",

            [theme.breakpoints.down("xs")]: {
                minHeight: "100%",
                opacity: 1
            },
            "& .andress-img": {
                height: "80px",
                [theme.breakpoints.down("xs")]: {
                    height: "200px"
                },
            },
            "& p": {
                "& span": {
                    display: "block", fontSize: "14px"
                },
                [theme.breakpoints.down("xs")]: {
                    display: "flex",
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    fontSize: "16px",
                    color: "rgb(254, 121, 0)"
                },
            },
            "&:hover": {
                opacity: 1,
            },
            "&:nth-child(1)": {
                opacity: "1",
                borderBottom: "1px solid rgba(0,0,0,0.3)",
                [theme.breakpoints.down("xs")]: {
                    borderBottom: "none",
                },
            },

        },
        "& .-day": {
            flexWrap: "nowrap",
            whiteSpace: "nowrap",
            padding: "25px 5px",
            borderBottom: "1px solid rgba(0,0,0,0.3)",
            [theme.breakpoints.down("sm")]: {
                flexWrap: "wrap",
                justifyContent: "center",
                alignContent: "center",
                padding: "10px 5px",
            },
            "& button": {
                margin: "0px 5px",
                transition: "all 0.5s",
            },
            "& .active": {
                background: "#fe7900",
                color: "#fff",
            },
        },
        "& .-moive": {
            margin: "10px 0px",
            "& .-logo2d": {
                width: "50px",
                height: "50px",
                marginRight: "10px",
            },
            "& .-img": {
                display: "block",
                padding: "8px 0px 8px 8px",
                "& img": {
                    height: "80px",
                    borderRadius: "5px",
                },
            },
            "& .hour ": {
                visibility: "hidden",
                height: "0",
                padding: "0px 10px",
                margin: "0",
                transition: "all 0.3s",
                "& h3": {
                    padding: "5px 5px",
                    margin: 0,
                    color: "#fe7900",
                    display: "flex",
                    alignItems: "center",
                    opacity: 0,
                },
                "& button": {
                    background: "rgba(0, 0, 0, 0.5)",
                    margin: "5px",
                    color: "#fff",
                    opacity: 0,
                },
            },
            "& .-child": {
                margin: 0,
                display: "flex",
                justifyContent: "space-between",
            },
        },
    },

    active: {
        "& .MuiPaper-root.hour": {
            height: "auto",
            padding: "10px",
            marginTop: "10px",
            visibility: "visible",
            transition: "all 0.2s",
            "& h3": {
                opacity: 1,
                transitionDelay: "0.3s",
            },
            "& button": {
                opacity: 1,
            },
        },
    },
    "@keyframes tranY": {
        "0%": {
            transform: "translateY(0px)",
        },
        // "50%": {
        //     transform: "translateY(-7px)",
        // },
        "100%": {
            transform: "translateY(-7px)"
        }
    },

}));

export { useStyles };
// padding: "10px",
// marginTop: "10px",
