import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "50%",
    height: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "95%",
      height: "300px",
    },
  },
}));
export { useStyles };
