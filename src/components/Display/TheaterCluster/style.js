import { makeStyles } from "@material-ui/core/styles";
import bg from "../../../assets/img/bg-login.jpg"
const useStyles = makeStyles((theme) => {
  return {
    root: {
      margin: "50px auto",
      "& .container-Pager": {

        marginTop: "60px",
        boxShadow: "0px 1px 5px 12px rgba(0,0,0,0.35)",
        [theme.breakpoints.down("md")]: {
          fontSize: "14px"
        },
        [theme.breakpoints.down("xs")]: {
          display: "none"
        },
      },

      "& .utility": {
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid rgba(0, 0, 0, 0.1)",
        [theme.breakpoints.down("md")]: {
          height: "500px"
        },
        [theme.breakpoints.down("xs")]: {
          display: "none",
        },
      },
      "& .mobile-tilte": {
        display: "none",
        [theme.breakpoints.down("xs")]: {
          display: "block",
        },
      },
    },
    title: {
      marginBottom: "50px", textAlign: "center",
      boxShadow: " 0px 20px 5px 0px rgba(0,0,0,0.35)",
      width: "30%",
      margin: "20px auto",
      position: "relative",
      border: "1px solid #fe7900",
      fontSize: "35px",
      padding: "20px 15px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "25px",
        width: "25%",
        marginBottom: "0"
      },
      "&:hover": {
        "& .fist": {
          transform: "scale3d(1.2,1.1,1.3)"
        }
      },
      "& span": {
        position: "absolute",
        top: "-70%",
        width: "auto",
        left: "25%",
        [theme.breakpoints.down("xs")]: {
          top: "-50%",
        },
      },
      "& .fist": {
        transition: "all 0.5s",
        color: "#fe7900",
        backgroundColor: "#fff",

      },
      "& .last": {
        color: "transparent",
        textShadow: "-6px 9px 4px rgba(206,89,55,0.75)",
      },

    },

    moive: {
      height: "90vh",
      overflowY: "scroll",
      "& p": {
        margin: "5px",
      },
      "&::-webkit-scrollbar": {
        width: "0.2em",
        height: "0.2em",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.5)",
        outline: "1px solid rgba(0, 0, 0, 0.1)",
      },
      "& .MuiBottomNavigation-root": {
        // overflowX: "scroll",
        transition: "ease-out .4s",
        height: "100%",
        flexWrap: "wrap",
        "&::-webkit-scrollbar": {
          width: "0.2em",
          height: "0.3em",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.5)",
          outline: "1px solid rgba(0, 0, 0, 0.1)",
        },
      },
      "& .MuiBottomNavigationAction-root": {
        maxWidth: "80px",
        color: "green",
        border: "1px solid",
      },
    },
    system: {
      padding: "4px 8px !important",
      fontSize: "14px",
      height: "90vh",
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        width: "0.2em",
      },
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0,.5)",
        outline: "1px solid rgba(0, 0, 0, 0.1)",
      },
      "& div": {
        padding: "13px 5px",
        marginTop: "8px",
        borderBottom: "1px solid  rgba(0, 0, 0, 0.1)",
        "& h4": {
          margin: "0px 0px",
        },
      },
    },
    logo: {
      "& .MuiBottomNavigation-root": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%"
      },
      "& .MuiButton-label": {
        width: "90%",
      },
      "& .MuiBottomNavigationAction-root": {
        padding: "15px 8px",
        borderBottom: "1px solid  rgba(0, 0, 0, 0.1)",
        margin: "5px 0px",
        minWidth: "auto",
        opacity: "0.3",
        transition: "all 0.6s",
      },
      "& .Mui-selected": {
        opacity: 1,
      },
    },
    mobi: {
      display: "none",
      padding: "15px 0",
      [theme.breakpoints.down("xs")]: {
        display: "block",
        marginBottom: "30px"
      },
      "& img": {
        width: "100%",
        height: "100%",
        display: "block",
      },
      "& .mobi-theaters": {
        display: "block",
        marginTop: "5px",
        padding: "5px 0px",
        "& .mobi-logo": {
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          width: "100%",
          height: "50px",
          "& .MuiButton-text": {
            width: "55px",
          },
          "& p": {
            marginLeft: "10px",
            fontWeight: "bolder",
            textTransform: "uppercase",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 5px",
          },
        },
        "& .mobi-systems": {
          cursor: "pointer",
          position: "relative",
          padding: "5px 0px",
          transition: "all 0.6s",
          opacity: "0",
          height: 0,
          "& .btn-waper": {
            minWidth: "auto",
            width: "70px",
            height: "80px",
          },
          "& p": {
            padding: "5px 5px",
            margin: 0,

          },
          "& .systems": {
            visibility: "hidden",
            transition: "all 0.6s",
            transform: "translateY(-100%)",
            height: 0,
            padding: "5px 10px",
            borderTop: "1px solid  rgba(0, 0, 0, 0.1)",
            "& .moive-wapper": {
              height: 0,

              "& .moive": {
                width: "50%",
                position: "relative",
                transform: "translateY(-100%)",
                height: 0,
                opacity: 0,
                visibility: "hidden",
                display: "inline-flex",
                alignItems: "center",
                borderTop: "1px solid  rgba(0, 0, 0, 0.1)",
                "& .btn-waper": {
                  margin: "8px 0px",
                  height: 0,
                },
              },
            },
            "& .active-moive": {
              height: "100%",
              "& .moive": {
                height: "100% !important",
                opacity: "1 !important",
                visibility: "visible !important",
                transform: "translateY(0%) !important",
                transition: "all 0.6s",
                "& .btn-waper": {
                  height: "100% !important",
                },
              },
            },
          },
        },
        "& .active": {
          height: "100%",
          opacity: 1,
          transition: "all 0.6s",
          "& .systems": {
            height: "100% !important",

            transform: "translateY(0%) !important",
            visibility: "visible !important",
          },
        },
      },
      "& .active-mobile": {
        opacity: "1",
        width: "100%",
        height: "100%",
        visibility: "visible",
        transition: "all ease-out 0.4s",
      },
      "& .hidden-mobile": {

        width: "0",
        height: 0,
        opacity: "0",
        visibility: "hidden",
        transition: "all ease-out 0.4s",
      },
    },

    "@keyframes moving": {
      "0%": {
        textShadow: "-6px 9px 4px rgba(206,89,55,0.75)",
      },
      "25%": {
        textShadow: "0px 9px 4px rgba(206,89,55,0.75)",
      },
      "50%": {
        textShadow: "6px 9px 4px rgba(206,89,55,0.75)",
      },
      "75%": {
        textShadow: "0px 9px 4px rgba(206,89,55,0.75)",
      },
      "100%": {
        textShadow: "-6px 9px 4px rgba(206,89,55,0.75)",
      },

    },

  };
});

export { useStyles };
