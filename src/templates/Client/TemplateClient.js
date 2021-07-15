import React from "react";
import Header from "../../components/Display/Header";
import Footer from "../../components/Display/Footer"
import { makeStyles } from "@material-ui/core/styles";
import ScrollToTop from "../../components/Display/SrcollToTop";

const useStyles = makeStyles((theme) => ({
  root: {
    "& *": {
      fontFamily: " 'Poppins', sans-serif"
    },
  },
}));
function TemplateClient(props) {
  const classes = useStyles();
  const { Component, booking, home } = props;

  if (booking) {
    return (
      <main className={classes.root}>
        <Component />
      </main>
    )
  }
  if (home) {
    return (
      <>
        <main className={classes.root}>
          <Component />
        </main>
        <Footer />
      </>
    )
  }
  return (
    <div className={classes.root}>
      <header>
        <Header id="back-to-top-anchor" />
      </header>
      <main>
        <Component />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default TemplateClient;
