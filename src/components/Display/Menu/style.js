import { makeStyles } from "@material-ui/core/styles";
const color = {
  textPrimary: "#000",
  textActive: "#fe7900",
};
const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: 500,
      backgroundColor: "inherit",

      "& .MuiButtonBase-root": {
        color: `${color.textPrimary} !important `,
        minWidth: "55px",
        maxWidth: "90px",
        overflowX: "hidden",
        "& span": {

          fontSize: "16px",
        },
        '&:after': {
          content: "''",
          position: 'absolute',
          bottom: 0,
          left: "-100%",
          width: '100%',
          height: '4px',
          display: 'block',
          background: color.textActive,
          transition: "all 0.6s",
        }
      },
      "& .Mui-selected": {
        color: color.textActive,
        "& span .Mui-selected": {
          fontSize: "18px",
        }

      },
      "& button.Mui-selected": {
        transform: "scale(1)",

        transition: "all 0.6s",
        '&:after': {
          content: "''",
          position: 'absolute',
          bottom: 0,
          left: "0",
          width: '100%',
          height: '4px',
          display: 'block',
          background: color.textActive
        }
      },
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "flex",
      },
    },
  };
});
export { useStyles };
