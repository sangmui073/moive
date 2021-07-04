import { Grid, Container } from "@material-ui/core";
import React, { useState } from "react";

import HeaderAdmin from "../../components/Admin/Header";
import SideBar from "../../components/Admin/SildeBar";
import { useStyle } from "./style";

function TemplateAdmin(props) {
  const classes = useStyle();
  const [open, setOpen] = useState(true);

  const { Component } = props;

  return (
    <div >
      <Grid container >
        <Grid item xs={open ? 3 : false}>
          <SideBar open={open} />
        </Grid>
        <Grid item xs={open ? 9 : 12}>
          <HeaderAdmin open={open} setOpen={setOpen} />
          <Container maxWidth={false} className={classes.main}>
            <Component />
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default TemplateAdmin;
