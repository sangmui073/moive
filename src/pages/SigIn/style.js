import { makeStyles } from "@material-ui/core/styles";
import bg from "../../assets/img/bg-login.jpg"
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `url(${bg})`,
    backgroundSize: "contain",
    padding: "30px 0px",

  },
  wapper: {
    marginTop: theme.spacing(8)
  },
  paper: {
    margin: theme.spacing(2, 8),

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    "& .kep-login-facebook.metro": {
      width: "100%"
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export { useStyles };
