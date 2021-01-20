import axios from "axios";
console.log(process.env.VUE_APP_SERVER_API);
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_SERVER_API
});

export { axiosInstance };
