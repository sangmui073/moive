import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      background: " linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7))",
      padding: "80px 0px",
      marginTop: "50px",
      "& img": {
        width: "100%",
        height: "100%",
        display: "block",
      },
      wordSpacing: "0.5px",
    },
    moiveName: {
      color: "#fff",
    },
    img: {
      boxShadow:
        "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
      borderRadius: "5px",
      "& button": {
        borderRadius: "5px",
      },
      height: "400px",
      width: "300px",

      "& button": {
        height: "100%",
        width: "100%",
        cursor: "pointer",
      },
    },
    review: {
      position: "relative",
    },
    process: {
      width: "100% !important",
      height: "100% !important",
      color: "#fe7900",
      background: "rgba(0,0,0,.1)",
      borderRadius: "50%",
    },
    point: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100% ",
      width: "100% ",
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      "& h1": {
        lineHeight: "88px",
        fontSize: "45px",
        color: "#fff",
      },
    },
    stars: {
      display: "flex",
      justifyContent: "center",
      marginTop: "10px",
      "& .MuiSvgIcon-root": {
        fill: "yellow",
      },
    },
    logo: {
      borderRight: "1px solid rgba(0, 0, 0, 0.2)",
      "& .logo-child": {
        padding: "20px 10px",
        opacity: "0.4",
        borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
        transition: "all 0.5s",
        "& button": {
          border: "none",
          background: "inherit",
          cursor: "pointer",
        },
      },
      "& .active": {
        opacity: "1",
      },
    },
    cine: {
      overflowY: "sroll",
      borderRight: "1px solid rgba(0,0,0,0.1)",
      "& .cine-child": {
        padding: "15px 10px",
        display: "flex",
        opacity: "0.3",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        transition: "all 0.5s",
        "&>:last-child()": {
          borderBottom: "none",
        },
        "& .cine-img": {
          width: "60px",
          height: "60px",
        },
        "& .cine-andress": {
          marginLeft: "10px",
          "& button": {
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "red",
          },
          "& p": {
            margin: 0,
          },
        },
      },
      "& .active": {
        opacity: 1,
      },
    },
    cineDay: {

      padding: "5px",
      "& .cine-date": {
        display: "flex",
        overflowX: "scroll",
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
        "& .btn-day": {
          whiteSpace: "nowrap",
          background: "none",
          border: "none",
          padding: "10px",
          cursor: "pointer",
          opacity: "0.5",
          transition: "all 0.6s",

        },
        "& .active-color": {
          color: "red",
          opacity: "1",
        },
      },
      "& .btn-hour": {
        background: "rgb(239,239,239)",
        border: "none",
        padding: "0px 5px",
        width: "50px",
        height: "40px",
        fontSize: "16px",
        color: "green",
        borderRadius: "5px",
        opacity: "0.5",
        cursor: "pointer",
        transition: "all 0.6s"
      },
      "& .active-hour": {
        opacity: 1,
        background: "green",
        color: "#fff",


      }
    },
  };
});
export { useStyles };
