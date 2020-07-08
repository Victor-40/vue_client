import axios from "axios";

export const HTTP = axios.create({
    baseURL: `http://rum-cherezov-dt:5001/api/`
})