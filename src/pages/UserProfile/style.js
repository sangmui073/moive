import { makeStyles } from "@material-ui/core/styles";
import bg from "../../assets/img/bg-login.jpg"
const useStyles = makeStyles((theme) => ({
    root: {
        padding: "50px 0",
        marginTop: "30px",
        background: `url(${bg})`,
        backgroundSize: "cover",
        height: "auto",
        display: "flex",
        alignItems: "center",

        "& .active-modal": {
            zIndex: "10",
            "& *": {
                animation: `$myfade 500ms ${theme.transitions.easing.easeInOut} 0.2s forwards`,
            }
        }
    },
    menu: {
        display: "flex",

        margin: "0 auto",
        padding: 0,
        justifyContent: "center",
        "& li": {
            boxShadow: "10px 0 0 rgb(0 0 0 / 10%)",
            textDecoration: "none",
            height: "45px",
            background: "#f18720",
            listStyleType: "none",
            lineHeight: "45px",
            transition: "all 0.3s ease-in-out",
            "&:nth-child(1)": {
                borderRadius: "30px 50px 50px 0",
                zIndex: 3
            },
            "&:nth-child(2)": {
                borderRadius: "0 50px 50px 0",
                paddingLeft: "45px",
                marginLeft: "-70px",
                zIndex: 2
            },
            "&:nth-child(3)": {
                borderRadius: "0 30px 0 0",
                paddingLeft: "45px",
                marginLeft: "-70px",
                zIndex: 1
            },
            "&:hover": {
                background: "#fecf06",
                "& a": {
                    color: "black"
                }
            },
            "& a": {
                padding: "0 25px",
                width: "100%",
                height: "100%",
                display: "inline-block",
                color: "#fff",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out"
            }
        },
        "& .active-menu": {
            background: "#fecf06",

            "& a": {
                color: "black"
            }
        }

    },
    profie: {
        display: "flex",
        width: "60%",
        margin: " auto",
        overflowX: "hidden",
        backgroundImage: "linear-gradient(to bottom,rgba(20,50,93,.9),rgba(8,22,48,.9))",
        color: "#fff",
        "& .MuiAvatar-root": {
            width: "100px",
            height: "100px",
            border: "1px solid black"
        },
        "& h3": {
            textAlign: "center",
            background: "#fecf06",
            width: "50%",
            margin: "0px auto 30px auto",
            padding: "8px 10px",
            borderRadius: "10px",
            color: "black",
            boxShadow: "0px 0px 5px 5px rgba(255,255,255,0.35)"
        },
        "& .silider-profie": {
            minWidth: "100%",
            padding: "20px 30px 20px 30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            transition: "all 0.3s ease-in-out",
            "& .btn-save": {
                width: "20%",
                background: "#fecf06",
                margin: "15px auto 5px auto",
                fontWeight: "bold"
            },
            "& p": {
                margin: "23px 0px"
            },
            "& .tickets": {
                background: "#f18720",
                width: "90%",
                padding: "10px 0px 10px 10px",
                margin: "10px 0",
                borderRadius: "5px",
                boxShadow: "0px 10px 5px 0px rgba(0,0,0,0.75)",
                cursor: "pointer",
                animation: `$myfade 500ms ${theme.transitions.easing.easeInOut} 0.2s forwards`,
                opacity: 0,
                transition: "all 0.4s",
                "&:hover": {
                    color: "black",
                    background: "#fecf06"
                }
            },
            "& .pagition": {
                textAlign: "right",
                width: "90%",
                marginRight: "auto",
                "& button": {
                    margin: "5px 5px",
                    backgroundColor: "#fecf06",
                    minWidth: "30px",
                    padding: "5px 8px",
                    boxShadow: "0px 5px 5px 0px rgba(0,0,0,0.35)"
                }
            },
        },

    },
    form: {
        paddingLeft: "30px",
        "& input": {
            background: "#fff",
            fontSize: "14px",
            padding: "10px 14px"
        },
        "& .MuiGrid-item": {
            position: "relative",
            "& .MuiInputLabel-root": {
                fontSize: "14px"
            },
            "& .MuiInputLabel-outlined": {
                top: "-5px"
            }
        },

    },
    messError: {
        padding: "10px 15px",
        top: "-35%",
        right: "-5%",
        fontSize: "12px",
        transform: "translate(20%,20%)",
        position: "absolute",
        background: "#fff",
        boxShadow: "0px 0px 10px 1px rgb(0 0 0 / 75%)",
        borderRadius: "200px",
        color: "red",
        "&:after": {
            content: '""',
            position: "absolute", left: "15px",
            bottom: "-22px",
            display: "block",
            borderColor: "#fff transparent transparent transparent",
            borderStyle: "solid",
            borderWidth: "14px",
        },
        [theme.breakpoints.down("sm")]: {
            right: "5%",
        },
    },
    submit: {
        marginTop: "15px",
        background: "#fecf06",
        color: "black"
    },
    modal: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        position: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "-1",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        "& *": {
            opacity: 0
        },
        "& .MuiDataGrid-root": {
            background: "#fff",
        },
        "& table": {
            width: "40%",
            height: "auto",
            background: "#f18720",
            color: "#fff",
            boxShadow: "0px 3px 22px 0px  rgba(255,255,255,0.75)",
            "& thead": {
                background: "#fecf06",
                boxShadow: "0px 10px 5px -1px rgba(0,0,0,0.2)",
                color: "black",
                padding: "5px 0px",
                "& th": {
                    padding: "5px 0"
                }
            },
            "& tbody": {
                "& td": {
                    verticalAlign: "middle",
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    boxShadow: "inset 0px 0px 10px 10px rgba(0,0,0,0.1)"
                }
            },
            margin: "auto",
            borderRadius: "5px",
            overflowY: "scroll",
            padding: "10px",
            "& tfoot": {
                position: "relative",
                "& .btn-close": {
                    "& button": {
                        lineHeight: "0.75",
                        marginTop: "5px",
                        backgroundColor: "#fecf06",
                        minWidth: "30px",
                        boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.25)"
                    }
                }
            },
            "& .MuiSvgIcon-root": {
                verticalAlign: "bottom",
                margin: "0 5px"
            }
        }
    },
    "@keyframes myfade": {
        "0%": {
            opacity: 0
        },
        "100%": {
            opacity: 1
        }
    }
}))
export { useStyles }