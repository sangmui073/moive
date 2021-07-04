import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[3],
  },
  alert: {
    display: "flex",
    alignItems: "center",
    "& .MuiSvgIcon-root": {
      width: "2rem",
      height: "2rem",
    },
  },
}));
export { useStyles };
