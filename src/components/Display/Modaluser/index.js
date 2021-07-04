import React from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Alert from "@material-ui/lab/Alert";
import { useStyles } from "./style";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

export default function TransitionsModal(props) {
  const { path, param, messenger, user } = useSelector((state) => state.auth);
  let { open, setOpen } = props;
  const history = useHistory();
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };
  const handleRedirect = () => {
    setTimeout(() => {
      if (path === "/") {
        history.push(`/Booking/${param}`);
      } else {
        history.goBack();
      }
    }, 1000);
  };
  const renderMesser = () => {
    if (messenger.isLogin) {
      return (
        <Alert className={classes.alert} severity="success">
          {messenger.mess}
          {handleRedirect()}
        </Alert>
      );
    } else {
      return (
        <Alert className={classes.alert} severity="error">
          {messenger.mess}
        </Alert>
      );
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>{renderMesser()}</div>
        </Fade>
      </Modal>
    </div>
  );
}
