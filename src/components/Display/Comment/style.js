import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "70%",
        margin: "0 auto",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
        "& .container-wapcomment": {
            height: "300px",
            marginTop: "30px",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
                width: "5px",
                height: "0.2em",
            },
            "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#fe7900",
                outline: "2px solid rgba(0, 0, 0, 0.1)",
            },
        },
        "& .cm-child": {
            width: "47%",

            [theme.breakpoints.down("sm")]: {
                width: "60%",
            },
            [theme.breakpoints.down("xs")]: {
                width: "100%",
            },
            "& .icon-like": {
                fill: "rgb(150, 150, 150)"
            },
            [theme.breakpoints.down("xs")]: {
                width: "100%",

                marginTop: "15px !important",

            },
        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: "14px",
        "& .MuiFormControl-root": {
            display: "block",
            "& .MuiInput-formControl": {
                display: "block"
            }
        }
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[1],
        borderRadius: "5px",
        padding: theme.spacing(1),
        width: "50%",
        [theme.breakpoints.down("xs")]: {
            width: "90%"
        },
        position: "relative",
        "& .icon-close": {
            position: "absolute",
            top: "-12px",
            right: "-11px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #000",
            borderRadius: "50%",
            width: "25px",
            height: "25px",
            cursor: "pointer"

        }
    },
}));
export { useStyles }