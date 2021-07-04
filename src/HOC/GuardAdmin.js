import React from "react";
import Swal from 'sweetalert2'
import { Redirect } from "react-router-dom";
function GuardAdmin(props) {
  let user = {};
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }
  if (user.maLoaiNguoiDung === "QuanTri") {

    return props.children;
  } else {
    localStorage.removeItem("user");
    Swal.fire({
      title: 'Error!',
      text: 'Không đũ quyền truy cập',
      icon: 'error',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.isDenied || result.isConfirmed) {
        return <Redirect to="/admin" />;
      }
    })
    return <Redirect to="/admin" />;

  }
}

export default GuardAdmin;
