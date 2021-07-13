import { makeStyles } from '@material-ui/core/styles';
import bg from "../../assets/img/bg-login.jpg"
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
        "& .MuiGrid-root": {
            position: "relative",
        },
    },
    messError: {
        padding: "10px 15px",
        top: "-20%",
        right: "0%",
        fontSize: "12px",
        transform: "translate(20%,20%)",
        position: "absolute",
        background: "#fff",
        boxShadow: "0px 0px 10px 1px rgb(0 0 0 / 75%)",
        borderRadius: "200px",
        color: "red",
        "&:after": {
            content: '""',
            position: "absolute", left: "15px",
            bottom: "-22px",
            display: "block",
            borderColor: "#fff transparent transparent transparent",
            borderStyle: "solid",
            borderWidth: "14px",
        },
        [theme.breakpoints.down("md")]: {
            right: "10%",
        },
        [theme.breakpoints.down("xs")]: {
            right: "15%",
        },

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        background: `url(${bg})`,
        backgroundSize: "contain",
        padding: "20px 0px"
    }
}));
export { useStyles }