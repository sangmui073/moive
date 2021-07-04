import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    search: {
        position: "relative",
        width: "80%",

        "& input": {
            padding: "5px 0px 5px 10px",
            border: "none",
            fontSize: "18px",
            width: "100%",
            borderBottom: "1px solid",
            "&:focus": {
                borderBottom: "1px solid #f37520",
                outline: "none"
            },
            "&:focus ~ .glass,&:valid ~ .glass": {
                transform: "translateY(-30px)",
                "& span": {
                    color: "#f37520"
                },
                "& svg": {
                    fill: "#f37520"
                }
            },
            "&:focus ~ .close,&:valid ~ .close": {
                "& span": {
                    color: "#f37520"
                },
                "& svg": {
                    fill: "#f37520"
                }
            },
        },
        "& label": {
            position: "absolute",
            transition: "all 0.4s",
            top: 0,
            display: "flex",
            alignItems: "center",

            "& span": {
                fontSize: "14px"
            },
        },
        "& .glass": {
            left: 0,
            pointerEvents: "none",
        },
        "& .close": {
            right: 0,
            pointerEvents: "cursor",
            cursor: "pointer"
        }
    }
}))
export { useStyles }