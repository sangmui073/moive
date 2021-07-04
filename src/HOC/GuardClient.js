import React from "react";
import { Redirect } from "react-router";

function GuardClient(props) {
  let user = {};
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }
  if (user.accessToken) {

    return props.children;
  } else {
    return <Redirect to="/Sig-In" />;
  }
}

export default GuardClient;
