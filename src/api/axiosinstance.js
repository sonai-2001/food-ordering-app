import  axios  from "axios";
import { baseUrl } from "./api-detail";

const axiosinstance=axios.create({
    baseURL:baseUrl
})

export default axiosinstance;
