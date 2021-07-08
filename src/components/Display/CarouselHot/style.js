import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  swapper: {
    width: "82.5%",
    margin: "0 auto",
    height: "350px",
    marginTop: "40px",
    [theme.breakpoints.down("md")]: {
      width: "95%",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    "& .swiper-button-next, .swiper-button-prev": {
      top: "87%",
      "&:after": {
        fontSize: "30px",
        color: "#fff",
        transition: "all 0.6s",
      },
      "&:hover:after": {
        color: "#fe7900",
      },
    },
    "& .swiper-button-prev": {
      left: "35%",
      "&:after": {
        content: "'\\27F5'",
      },
      [theme.breakpoints.down("xs")]: {
        left: "19%",
      },
    },
    "& .swiper-button-next": {
      right: "33.5%",
      top: "86%",
      "&:after": {
        content: "'\\2192'",
      },
      [theme.breakpoints.down("xs")]: {
        right: "19%",
      },
    },
    "& .swiper-slide-active": {
      boxShadow: " 0px 10px 5px 0px rgba(0,0,0,0.6)",
      "& h2": {
        color: "#444444",
        textShadow: "1px 0px 1px #CCCCCC, 0px 1px 1px #EEEEEE, 2px 1px 1px #CCCCCC, 1px 2px 1px #EEEEEE, 3px 2px 1px #CCCCCC, 2px 3px 1px #EEEEEE, 4px 3px 1px #CCCCCC, 3px 4px 1px #EEEEEE, 5px 4px 1px #CCCCCC, 4px 5px 1px #EEEEEE, 6px 5px 1px #CCCCCC, 5px 6px 1px #EEEEEE, 7px 6px 1px #CCCCCC"
      },
      "& .slider-bg": {
        visibility: "visible",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        opacity: 1,
        transform: "scale(1.4)",
      },
      "& .slider-content": {
        transitionDelay: "0.4s",
        opacity: 1,

      },
      [theme.breakpoints.down("xs")]: {
        padding: "0px",
      },
    },
  },
  slider: {
    backgroundSize: "cover",
    height: "100%",
    borderRadius: "10px",
    position: "relative",
    overflow: "hidden",

    "& .slider-bg": {
      visibility: "hidden",
      opacity: "0",
      position: "absolute",
      width: "0%",
      height: "0%",
      top: "50%",
      left: "50%",
      backgroundImage:
        "linear-gradient(to top, #000, transparent 100%)",
      borderRadius: "50%",
      transform: "scale(0.1)",
      transition: "all 0.5s",
    },
    "& .slider-content": {
      opacity: 0,
      textAlign: "center",
      position: "absolute",
      zIndex: 1,
      top: "5%",
      left: "5%",
      height: "90%",
      width: "95%",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",

      "& .slider-btnGroup": {
        marginLeft: "10px",
        "& .MuiButton-root": {
          color: "#fff",
          padding: "6px 15px",
          backgroundColor: "#fe7900",
          fontSize: "0.75rem",
          clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)",
          transition: "0.4s",
          marginTop: "0px",

          "& .MuiSvgIcon-root": {
            fill: "#fff",
            marginRight: "3px",
            transition: "0.4s",


          },
          "&:hover": {
            color: "#fe7900",
            backgroundColor: "#fff",

            "& .MuiSvgIcon-root": {
              fill: "#fe7900",
            },
          },
          [theme.breakpoints.down("xs")]: {
            "&:nth-child(2)": {
              marginTop: "10px",
            },
          },
        },
      },
    },
  },
  btnGroup: {
    backgroundColor: "inherit",
    padding: "30px 0px",
    [theme.breakpoints.down("xs")]: {
      padding: " 0px",
    },

    "& .MuiBottomNavigationAction-root": {
      maxWidth: "100%",
      fontWeight: "bolder",
      color: "#33333",
      textShadow: "2px 2px 0px #FFFFFF, 5px 4px 0px rgba(0,0,0,0.15)",
      "&:nth-child(1)": {
        marginRight: "20px",
        [theme.breakpoints.down("xs")]: {
          marginRight: " 0px",
        },
      },
      "&:hover": {
        animation: `$rubberBand 1s ${theme.transitions.easing.easeInOut}`,
      }
    },
    "& .MuiBottomNavigationAction-root.Mui-selected": {
      color: "#fe7900",
    },
    "& .MuiBottomNavigationAction-label.MuiBottomNavigationAction-iconOnly": {
      opacity: 1,
    },
    "& .MuiBottomNavigationAction-label": {
      fontSize: "1.75rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.30rem",
      },
    },
    "& .MuiBottomNavigationAction-label.Mui-selected": {
      fontSize: "35px",
      [theme.breakpoints.down("xs")]: {
        fontSize: "18px",
      },
    },
    "& .MuiBottomNavigationAction-wrapper": {
      whiteSpace: "nowrap",
    },
  },
  "@keyframes rubberBand": {
    "0%": {
      transform: "scale3d(1,1,1)"
    },
    "35%": {
      transform: "scale3d(1.25,0.75,1)"
    },
    "45%": {
      transform: "scale3d(0.75,1,1)"
    },
    "60%": {
      transform: "scale3d(1.2,0.8,1)"
    },
    "75%": {
      transform: "scale3d(1.05,0.95,1)"
    },
    "100%": {
      transform: "scale3d(1,1,1)"
    },
  },

}));
export { useStyles };
