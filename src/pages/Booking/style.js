import { makeStyles } from '@material-ui/core/styles';
const style = { border: "rgba(0, 0, 0, 0.3)", color: "#fff", bgOrgance: "rgb(254, 121, 0)" };

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    "& .MuiAppBar-positionStatic": {
      padding: "10px 0px",
      backgroundColor: "#fff",
      color: "#333",
      paddingLeft: "30px",
      "& button": {
        fontSize: "16px"
      },
      "& .Mui-selected": {
        color: "#fb4226"
      }
    }
  },
  choosingChair: {
    position: "relative",
    "& img": {
      display: "block",
      width: "100%",
      height: "100%"
    },
    "& .bg-content": {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0, 0, 0, 0.5)",
      fontSize: "24px",
      "& .content": {
        color: style.color,
        paddingLeft: "10px",
        "& button": {
          background: style.bgOrgance,
          border: "none",
          color: style.color,
          marginRight: "10px",
          borderRadius: "5px",
          fontSize: "20px",
        }
      }
    }
  },
  isBooking: {
    padding: "20px 40px",
    "& .cinema-name": {
      color: "rgba(0, 0, 0, 0.5)",
      "& button": {
        background: style.bgOrgance,
        border: "none",
        color: style.color,
        borderRadius: "5px"
      }
    },
    "& .ticket-type": {
      fontSize: "24px",
      width: "100%",
      padding: "20px 0px",
      marginTop: "70px",
      borderBottom: `1px solid ${style.border}`,
      borderTop: `1px solid ${style.border}`,
      "& .ticket-item": {

        "& td": {
          padding: "10px 0px",
          textAlign: "right",

        },
        "& td:nth-child(2)": {
          color: "green"
        },
        "& span": {
          width: "25px",
          display: "inline-block",
          fontSize: "24px",
          margin: "0px 20px",
          border: `1px solid ${style.border}`,
          padding: "0px 5px",
          textAlign: "center"
        },
        "& button": {
          fontSize: "24px",
          background: style.bgOrgance,
          border: "none",
          color: style.color,
          cursor: "pointer"
        }

      }
    },
    "& .total-price": {
      display: "flex",
      justifyContent: "space-between",
      margin: "40px 0px 20px 0px ",
      boxShadow: "0 0 15px rgb(0 0 0 / 30%)",
      fontSize: "24px",
      borderRadius: "5px",
      overflow: "hidden",
      "& .price": {
        color: "green",
        display: "block"
      },
      "& .btn-total": {

        background: "linear-gradient(223deg,#b4ec51 0,#429321 100%)",

        border: "none",
        outline: "none",
        borderTopRightRadius: "5px",
        borderBottomRightRadius: "5px",
        fontSize: "24px",
        padding: "0px 15px",
        color: style.color,
        cursor: "pointer",
        transition: "all 0.5s",
        "&:hover": {
          color: style.bgOrgance,
        }
      }
    }
  },
  listChairs: {
    color: style.color,
    padding: "40px 10px",
    // backgroundColor: "rgba(0,0, 0, 0.8)",
    backgroundColor: "black",
    "& .clock-name": {
      display: "flex",
      width: "80%",
      margin: "0 auto",
      justifyContent: "space-between"
    },
    "& .screen": {
      width: "90%",
      height: "20px",
      margin: "0 auto",
      background: "#fff",

      boxShadow: "0px 15px 15px -6px rgb(255 252 255)",
    },
    "& .list-chairs": {
      width: "90%",
      padding: "0px 70px",
      justifyContent: "center",
      // clipPath: "polygon(1% 0, 99% 0, 100% 100%, 0 100%)",
      margin: "auto",
      "& .list-string": {
        marginTop: "53px",
        "& .MuiButton-text": {
          padding: "7px 8px",
          fontSize: "16px",
          color: style.color,
          minWidth: "35px"
        }
      },
      "& .table-chairs": {

        margin: "0 auto",
        "& tbody": { width: "100%" },
        "& .MuiSvgIcon-root": {
          width: "35px",
          height: "35px",
          padding: 0,
          minWidth: "auto",
          cursor: "pointer"
        },
        "& .chair": {
          minWidth: "auto",
          padding: 0,
        },
        "& .choice": {
          "& .MuiSvgIcon-root": {
            fill: "red !important",
          }
        },
        "& .number-chair": {
          position: "absolute",
          top: "0",
          left: "0",
          // transform: "translate(-50%,-50%)",
          color: "#fff",
          cursor: "pointer",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      },
      "& .menu-chair": {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
        textAlign: "center",
        "& span": {
          display: "block"
        }
      }
    }
  },
  chairChoice: {
    fill: "#44c020 !important"

  },
  profieBooking: {
    padding: "20px 10px",
    "& .profie-price": {
      color: "green",
      textAlign: "center",
      fontSize: "30px",
      margin: "0px 0px",
      paddingBottom: "10px",
      borderBottom: `1px solid ${style.border}`
    },
    "& .profie-listmoive": {

      borderBottom: `1px solid ${style.border}`,
      paddingBottom: "20px",

    },
    "& .profie-user": {
      borderBottom: `1px solid ${style.border}`,

    }
  }
}));

export { useStyles }