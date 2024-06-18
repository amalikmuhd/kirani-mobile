import { load } from "@/utils/storage";
import axios from "axios";

const Api = axios.create({
  baseURL: "https://whole-monica-buyun-796fa180.koyeb.app/api/",
});

Api.interceptors.request.use(
  async (config) => {
    const storage = await load("token");
    console.log(storage, "storage");
    if (storage) {
      config.headers.Authorization = `Bearer ${storage.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    throw err;
  }
);

export default Api;
