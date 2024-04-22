import axios from "axios";

export const axiosDefault = axios.create({
  baseURL: "http://api.data.go.kr",
  headers: {
    "Content-Type": "application/json",
  },
});
