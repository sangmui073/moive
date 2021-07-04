import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        margin: "10px 5px",
        padding: "30px 10px",
        textAlign: "right",
        "& button": {
            minWidth: "40px"
        },
        "& .MuiFormControl-root": {
            margin: "0 10px"
        }
    }
}));
export { useStyles }