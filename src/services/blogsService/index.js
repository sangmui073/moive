import axios from "axios";


export default class BlogsService {
    getListComment = (resourceUrl) => {
        return axios({
            method: "GET",
            url: resourceUrl
        })
    };
    postComment = (resourceUrl, data) => {
        return axios({
            method: "POST",
            url: resourceUrl,
            data: data
        })
    };
    patchComment = (resourceUrl, data) => {
        return axios({
            method: "PATCH",
            url: resourceUrl,
            data: data
        })
    }
}