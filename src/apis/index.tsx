import axios from "axios";

export const axiosDefault = axios.create({
  baseURL: "https://proxy.cors.sh/http://api.data.go.kr",
  headers: {
    "Content-Type": "application/json",
  },
});
