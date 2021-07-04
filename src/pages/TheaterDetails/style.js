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
                }
            },
            "& .-content": {
                color: "#fff",
                width: "95%",
                marginLeft: "auto",
                "& p": {
                    fontSize: "20px",
                },
                "& h1": {
                    fontSize: "30px", marginTop: "45px"
                },
                "& button": {
                    background: "#fe7900",
                    marginTop: "5px",
                    "& svg": {
                        fill: "#fff"
                    },
                    "& span": {
                        color: "#fff",
                        fontSize: "16px"
                    }
                }
            },
            "& .bg-liner": {
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                backgroundSize: "cover",
                zIndex: "-1",
                filter: "blur(15px)"
            }
        },
        "& img": {
            display: "block",
            width: "100%",
            height: "100%"
        }
    },

    system: {
        padding: "50px 0px",
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
            }

        },
        "& img": {
            display: "block",
            width: "100%",
            height: "100%"
        },
        "& .-andess": {
            opacity: "0.6",
            cursor: "pointer",
            transition: "opacity 0.5s",
            padding: "10px 0px",
            "&:hover": {
                opacity: 1
            },
            "&:nth-child(1)": {
                opacity: "1",
                borderBottom: "1px solid rgba(0,0,0,0.3)"
            }
        },
        "& .-day": {
            flexWrap: "nowrap",
            whiteSpace: "nowrap",
            padding: "25px 5px",
            borderBottom: "1px solid rgba(0,0,0,0.3)",
            "& button": {
                margin: "0px 5px",
                transition: "all 0.5s",
            },
            "& .active": {
                background: "#fe7900",
                color: "#fff"
            }
        },
        "& .-moive": {
            margin: "10px 0px",
            "& .-logo2d": {
                width: "50px",
                height: "50px",
                marginRight: "10px"
            },
            "& .-img": {
                display: "block",
                padding: "8px 0px 8px 8px",
                "& img": {
                    height: "80px",
                    borderRadius: "5px",
                }
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
                    opacity: 0
                },
            },
            "& .-child": {
                margin: 0,
                display: "flex",
                justifyContent: "space-between"
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
                transitionDelay: "0.3s"
            },
            "& button": {
                opacity: 1,
            }

        }

    }
}))

export { useStyles }
// padding: "10px",
// marginTop: "10px",