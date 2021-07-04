import axios from "axios";
import CyberDomain from "../../assets/Domain";
export default class BookingService {
    getListChairs = (maLichChieu) => {
        return axios({
            method: "GET",
            url: `${CyberDomain}QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
        })
    };
    checkOut = (data, token) => {
        return axios({
            method: "POST",
            data: data,
            headers: {
                Authorization: token
            },
            url: `${CyberDomain}QuanLyDatVe/DatVe`
        })
    }
}