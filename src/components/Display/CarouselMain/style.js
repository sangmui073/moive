import { makeStyles } from "@material-ui/core/styles";

const textColor = {
  primary: "#fff",
  seconary: "#fe7900",
};
const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    padding: "30px 0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundBlendMode: "darken",
    backgroundSize: "cover",
    backgroundPosition: "center",
    // [theme.breakpoints.down("md")]: {

    //   height: "100%"
    // },
    "& .swiper-container": {
      width: "100%",
      paddingTop: "70px",
      paddingBottom: "50px",
      [theme.breakpoints.down("md")]: {
        paddingTop: "20px",

      },
    },
    "& .swiper-slide": {
      backgroundPosition: "center",
      backgroundSize: "cover",
      width: "35%",
      height: "250px",
      background: "#000",
      opacity: "1",
      zIndex: 10,
      [theme.breakpoints.down("md")]: {
        // height: "35vh",

      },
      [theme.breakpoints.down("sm")]: {
        // height: "30vh",

      },
      [theme.breakpoints.down("xs")]: {
        // height: "25vh",
        width: "50%",
        overflow: "hidden",
      },

      WebkitBoxReflect:
        "below 1px linear-gradient(transparent,transparent, #0006)",
      "& button": {
        width: "100%",
        height: "100%",
        padding: "0",
        border: "0",
        cursor: "pointer",
      },
      "& img": {
        display: "block",
        width: "100%",
        height: "100%",
      },
      "&:hover": {
        opacity: "0.7",
      },
      "& .bgHd": {
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0,
        transform: "translateX(-100%)",
        top: "0%",
        left: "0%",
        transition: "all 0.5s 0.1s",
        backgroundImage:
          "linear-gradient(to bottom, rgb(0 0 0 / 80%), rgb(0 0 0 / 80%))",
        [theme.breakpoints.down("xs")]: {
          display: "flex",
        },
      },

    },
    "& .swiper-slide-active": {
      opacity: "1",
      "& .bgHd": {
        transform: "translateX(0%) !important",
        opacity: "1 !important",
        "& .btnTrailer": {
          color: "#fff",
          "& .MuiButton-iconSizeMedium > *:first-child": {
            fontSize: "35px",
          },
        },
        "& .btnDetails": {
          position: "absolute",
          borderTopLeftRadius: "0",
          borderTopRightRadius: "0",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "auto",
          padding: "10px 5px",
          color: "#fff",
          background:
            "-webkit-gradient(linear, left top, right top, from(#bb511e), to(#f1bc00))",
          background: "linear-gradient(to right, #bb511e, #f1bc00)",
          transition: "all 0.3s ease-in-out ",
        },
      },
    },
    "& .carousel-text": {
      display: "none",
      [theme.breakpoints.down("md")]: {
        margin: "0 auto",
        marginTop: "40px",
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: "0px",
      },
      // [theme.breakpoints.down("xs")]: {
      //   display: "none !important",
      // },
    },

  },

  content: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    color: textColor.primary,
    height: "100%",
    padding: "20px",
    "& h3": {
      color: "#FFFFFF",
      fontSize: "30px",
      // textShadow: "1px 3px 0 #969696, 1px 9px 5px #aba8a8",
      [theme.breakpoints.down("md")]: {
        padding: "10px 0px",
        fontSize: "32px",
      },
      [theme.breakpoints.down("xs")]: {
        padding: "10px 0px",
        fontSize: "26px",
      },
    },
    [theme.breakpoints.down("md")]: {
      height: "250px",
      "& h6": {
        width: "60%"
      }
    },
    [theme.breakpoints.down("xs")]: {
      height: "150px",
      "& h6": {
        display: "none"
      }
    },
    "& button": {
      display: "inline-block",
      textAlign: "center",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      lineHeight: 1.5,
      fontWeight: "bold",
      fontSize: "14px",
      color: "#fff",
      padding: "10px 30px 9px",
      margin: "0 20px 5px 0",
      width: "auto",
      textTransform: "uppercase",
      borderRadius: "50px",
      border: "none",
      background:
        "-webkit-gradient(linear, left top, right top, from(#bb511e), to(#f1bc00))",
      background: "linear-gradient(to right, #bb511e, #f1bc00)",
      transition: "all 0.3s ease-in-out",
      [theme.breakpoints.down("xs")]: {
        display: "none"
      },
    },
  },

}));
export { useStyles };
// anitext: {
//   animation: `$tranX 2000ms ${theme.transitions.easing.easeInOut}  forwards`,
// },
// aniImg: {
//   animation: `$myfade 2000ms ${theme.transitions.easing.easeInOut}  forwards`,
// },
// "@keyframes myfade": {
//   "0%": {
//     opacity: 0,
//     transform: "translateX(100%)",
//   },
//   "50%": {
//     opacity: "0.1"
//   },
//   "75%": {
//     opacity: "0.2"
//   },
//   "100%": {
//     opacity: 1,
//     transform: "translateX(0%)",
//   }
// },
// "@keyframes tranX": {
//   "0%": {
//     transform: "translateX(-100%)",
//     opacity: 0
//   },
//   "75%": {
//     opacity: "0.3"
//   },
//   "100%": {
//     transform: "translateX(0%)",
//     opacity: 1
//   }
// },