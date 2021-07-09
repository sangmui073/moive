import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#222",
        color: "#949494",
        "& .hd-field": {
            color: "transparent",
            [theme.breakpoints.down("sm")]: {
                display: "none"
            },
        },
        "& .container-ft": {
            [theme.breakpoints.down("md")]: {
                margin: "-15px",
                width: "calc(100% + 68px)"
            },
            "& .tix-product": {
                textAlign: "center"
            },
            "& .tix-app": {
                textAlign: "left"
            }
        },
        "& .tix_text": {
            display: "flex",
            flexDirection: "column",

        },
        "& img": {
            width: "100%",
            height: "100%",
            display: "block"
        },
        "& h4": {
            color: "#fff",
            fontWeight: "normal"
        },
        "& a": {
            textDecoration: "none",
            color: "#949494",
            transition: "color 0.5s",
            "&:hover": {
                color: "#fff"
            }
        },
        "& .logo-img": {
            display: "inline-block",
            width: "35px",
            height: "35px",
            margin: "10px 10px",
            borderRadius: "50%",
            overflow: "hidden",
            background: "#fff",
            transition: "opacity 0.5s",
            "&:hover": {
                opacity: "0.7"
            }
        },
        "& .-app": {
            background: "inherit"
        },
        [theme.breakpoints.down("md")]: {
            "& .sm-multilogo": {
                margin: "0 auto"
            },
        },
        [theme.breakpoints.down("xs")]: {
            "& .sm-multilogo": {
                margin: "0"
            },
        },
    },
    mutilogo: {
        width: "80%",
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
        [theme.breakpoints.down("xs")]: {
            display: "none",
            margin: 0,
            padding: 0
        },
    },


    confirm: {
        borderTop: "1px solid #4a4a4a",
        padding: "30px 15px",
        "& .zion": {
            borderRadius: "10px",
            overflow: "hidden",
            width: "50%",
            [theme.breakpoints.down("xs")]: {
                margin: "auto",
                height: "50px",
                width: "100px",
                marginBottom: "15px"
            },
        },
        "& .boTT": {
            width: "85%"
        },
        "& span": {
            display: "block",
            fontSize: "14px"
        },
        "& h4": {
            margin: "0px 0px 15px 0px"
        },
        "& a": {
            display: "block"
        },
        "& .andress": {
            lineHeight: "25px",
            [theme.breakpoints.down("xs")]: {
                textAlign: "center"
            },
        },
        "& .title-zion": {
            [theme.breakpoints.down("xs")]: {
                textAlign: "center"
            },
        }
    }
}))
export { useStyles }