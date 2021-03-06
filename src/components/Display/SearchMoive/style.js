import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
    "& .MuiInput-underline:before": {
      // display: "none",
      display: "flex",
      alignItems: "center",
    },
    "& .MuiSelect-icon": {
      height: "100%",
    },
    paddingRight: "5px",
    borderRight: "1px solid #000",
    [theme.breakpoints.down("xs")]: {
      borderRight: "none",
      "& option": {
        fontSize: "14px",
        padding: "3px",
      },
      "& .MuiSelect-select": {
        paddingRight: "0px",
      },
    },
  },
  root: {
    padding: "20px",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 10px",
    },
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& button": {
      width: "80%",
      [theme.breakpoints.down("xs")]: {
        width: "50%",
        margin: "10px 0px",
      },
    },
  },
  wapper: {
    width: "80%",
    margin: "0 auto",
    padding: "0 10px",
    border: "1px solid #000",
    borderRadius: "10px",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    "& .MuiInputLabel-formControl": {
      top: "0",
    },
    "& .MuiSelect-icon": {
      top: "calc(20% - 12px)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      border: "none",
      boxShadow: "none",
    },
  },
}));

export { useStyles };
