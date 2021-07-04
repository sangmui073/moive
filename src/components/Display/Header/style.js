import { makeStyles } from "@material-ui/core/styles";
const color = {
  textPrimary: "#000",
  bgPrimary: "#fff",
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& header": {
      background: color.bgPrimary,
      "& .MuiPaper-elevation1": {
        boxShadow: "none",
      },
    },
  },
  toolbar: {
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "space-between",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),

    display: "inline-flex",
    background: "radial-gradient(black, transparent)",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  btnGroup: {
    display: "none",
    color: color.textPrimary,
    [theme.breakpoints.up("sm")]: {
      display: "inline-flex",
    },
  },
  icon: {
    marginRight: "10px",
  },
  Card: { maxWidth: 345, marginRight: "10px", background: "inherit" },

  title: {
    display: "none",
  },
}));
export { useStyles };
