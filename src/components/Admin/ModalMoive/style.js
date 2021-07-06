import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: "16px"
    },
    paper: {
        backgroundImage: "linear-gradient(to bottom,rgba(20,50,93,.9),rgba(8,22,48,.9))",
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 2, 2),
    },
    form: {
        "& .form-group": {
            display: "flex",
            background: "#fff",
            borderRadius: "5px",
            position: "relative",
            "& .title": {
                position: "absolute",

                top: 0,
                left: 0,
                transition: "all 0.5s",
            },
            "& .desciption": {
                position: "absolute",
                top: 0,
                left: 0,
                transition: "all 0.5s",
            },
            "& .MuiGrid-root": {
                padding: "10px"
            },
            "& .form-input": {
                display: "flex",
                alignItems: "center",
                "& .hd": {
                    color: "transparent",
                    whiteSpace: "nowrap",
                    width: "50%",
                    transition: "all 0.5s",
                    "&:after": {
                        display: "none"
                    }
                }
            },
            "& textarea": {
                width: "100%",
                outline: "none",
                border: "none",
                fontSize: "16px",
            },
            "& input": {
                width: "100%",
                outline: "none",
                border: "none",
                fontSize: "16px",
            },
            "& label": {
                position: "relative",
                transition: "all 0.5s",
                "&:after": {
                    content: "''",
                    width: 0,
                    height: 0,
                    top: "100%",
                    left: "50%",
                    marginLeft: "-3px",
                    borderLeft: "3px solid transparent",
                    borderRight: "3px solid transparent",
                    borderTop: "3px solid rgba(122, 184, 147, 0)",

                },
            },
        },
        "& .active": {

            "& .title": {
                top: "-100% !important",
                left: "-2% !important",
                flexBasis: "100%",
                maxWidth: "100%",
                transition: "all 0.5s",
                "& label": {
                    background: "#7ab893",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    "&:after": {
                        position: "absolute",
                        borderTop: "4px solid #7ab893"
                    }
                }
            },
            "& .form-input": {
                flexBasis: "100%",
                maxWidth: "100%",
                "& .hd": {
                    width: "0 !important",
                }
            },
            "& .desciption": {
                top: "-65% !important",
                left: "-1% !important",
                flexBasis: "100%",
                maxWidth: "100%",
                transition: "all 0.5s",
                "& label": {
                    background: "#7ab893",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    "&:after": {
                        position: "absolute",
                        borderTop: "4px solid #7ab893"
                    }
                }
            },


        },
        "& .errorMess": {
            margin: "3px 0px",
            height: "20px",
            padding: "0px 5px",
            color: "red"
        },

    },
    inputFile: {
        color: "transparent",
        width: "100px",
        "&::-webkit-file-upload-button": {
            visibility: "hidden"
        },
        "&:before": {
            content: "'Chọn Ảnh'",
            color: "black",
            display: "inline-block",
            background: "linear-gradient(top, #f9f9f9, #e3e3e3)",
            border: "1px solid #999",
            borderRadius: " 3px",
            padding: " 5px 8px",
            outline: "none",
            whiteSpace: "nowrap",
            cursor: "pointer",
            textShadow: "1px 1px #fff",
            fontWeight: "700",
            fontSize: "10pt",
        },

    }
}));

export { useStyles }