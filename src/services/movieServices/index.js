import axios from "axios";
import CyberDomain from "../../assets/Domain";
class MoiveService {
  getMoive = (url) => {
    return axios({
      method: "GET",
      url: `${CyberDomain}${url}`,
    });
  };
  getMoiveInfo = (maPhim) => {
    return axios({
      method: "GET",
      url: `${CyberDomain}QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
    });
  };
  getMoiveDetails = (maPhim) => {
    return axios({
      method: "GET",
      url: `${CyberDomain}QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
    });
  };
}

export default MoiveService;
