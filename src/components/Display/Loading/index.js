import React from "react";
import photo from "../../../assets/img/BeanEater-1s-200px.gif";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => {
  return {
    root: {
      position: "fixed",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(255,255,255,1)",
      zIndex: 9999,
    },
  };
});
export default function Loading() {
  const classes = useStyles();
  const { status } = useSelector((state) => state.loading);
  if (status) {
    return (
      <div className={classes.root}>
        <img src={photo} />
      </div>
    );
  } else {
    return null;
  }
}
