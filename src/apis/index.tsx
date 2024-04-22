import axios from "axios";

export const axiosDefault = axios.create({
  baseURL: "https://proxy.cors.sh/http://api.data.go.kr",
  headers: {
    "Content-Type": "application/json",
    "x-cors-api-key": import.meta.env.VITE_PROXY_TEST_KEY,
  },
});
