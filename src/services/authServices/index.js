import axios from "axios";
import CyberDomain from "../../assets/Domain";
import * as yup from "yup";
export const sigupUserSchema = yup.object().shape({
  taiKhoan: yup.string().required("tài khoản không được đễ trống").min(6, "lớn hơn 6 ký tự"),
  matKhau: yup.string().required("mật khẩu không được đễ trống").min(6, "lớn hơn 6 ký tự"),
  hoTen: yup.string().required("họ tên không được đễ trống").min(6, "lớn hơn 6 ký tự"),
  email: yup.string().required("email không được đễ trống").email("vui lòng nhập đúng định dạng email"),
  soDt: yup.string().required("số dt Không được để trống").matches(/^[0-9]+$/, "phải là số").min(8, "lớn hơn 6 ký tự"),
  maLoaiNguoiDung: yup.string().required("chọn người dùng")
})

class AuthService {
  signIn = (user) => {
    return axios({
      method: "POST",
      data: user,
      url: `${CyberDomain}QuanLyNguoiDung/DangNhap`,
    });
  };
  signUp = (user) => {
    return axios({
      method: "POST",
      data: user,
      url: `${CyberDomain}QuanLyNguoiDung/DangKy`
    })
  };

  getProfie = (user) => {

    return axios({
      method: "POST",
      data: user,
      url: `${CyberDomain}QuanLyNguoiDung/ThongTinTaiKhoan`
    })
  };
  putProfile = (user, token) => {
    return axios({
      method: "PUT",
      url: `${CyberDomain}QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      data: user,
      headers: {
        Authorization: token
      },
    })
  }

}

export default AuthService;
