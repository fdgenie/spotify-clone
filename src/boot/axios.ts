import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.VUE_APP_SERVER_API_DEV
      : process.env.VUE_APP_SERVER_API_PROD
});

export { axiosInstance };
