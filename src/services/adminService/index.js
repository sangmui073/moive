import axios from "axios";
import CyberDomain from "../../assets/Domain";
import * as yup from "yup";
export const moiveSchema = yup.object().shape({

    maPhim: yup.string().required("không được đễ trống").matches(/^[0-9]+$/, "phải là số và không có khoảng trống"),
    tenPhim: yup.string().required("không được đễ trống").min(6, "lớn hơn 6 ký tự"),
    biDanh: yup.string().required("không được đễ trống").min(6, "lớn hơn 6 ký tự"),
    trailer: yup.string().required("không được đễ trống").min(6, "nhìu hơn 6 ký tự"),
    moTa: yup.string().required("Không được để trống").min(8, "lớn hơn 8 ký tự"),
    ngayKhoiChieu: yup.string().required("Không được để trống"),
    danhGia: yup.string().required("không được để trống").matches(/^[0-9]+$/, "phải là số")
})
class AdminService {
    get = (url) => {
        return axios({
            method: "GET",
            url: `${CyberDomain}${url}`
        })
    }
    post = (url, data) => {
        return axios({
            method: "POST",
            url: `${CyberDomain}${url}`,
            data: data
        })
    }

}

export default AdminService;
