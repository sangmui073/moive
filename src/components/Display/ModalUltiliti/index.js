import React from "react";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useStyles } from "./style";

export default function ModalUntility(props) {
  const classes = useStyles();
  const { item, open, setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal
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
          <div className={classes.paper}>
            <iframe
              width="100%"
              height="100%"
              src={item}
              loading="true"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              aria-controls
            ></iframe>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
