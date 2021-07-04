import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
        whiteSpace: "nowrap",
        overflowX: "scroll",
        "& img": {
            width: "50px",
            height: "50px"
        },
        "& th": {
            textTransform: "uppercase",
        },
        "& .MuiTableHead-root": {
            backgroundColor: "#545353",
            "& th": {
                color: "#fff",
            },
            "& button": {
                color: "#fff",
            }

        },
        "& button": {
            minWidth: "40px"
        },
        "& .trash": {
            transition: " all 0.4s",
            "&:hover": {
                color: "red"
            }
        },
        "& .edit": {
            transition: " all 0.4s",
            "&:hover": {
                color: "#f37520"
            }
        }
    },
    root: {
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
    },

});
export { useStyles }