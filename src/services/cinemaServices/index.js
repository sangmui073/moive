import axios from "axios";
import CyberDomain from "../../assets/Domain";
export default class CinemeServices {
  getCinemaList = (url) => {
    return axios({
      method: "GET",
      url: `${CyberDomain}${url}`,
    });
  };
}
