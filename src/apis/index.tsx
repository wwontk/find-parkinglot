import axios from "axios";

export const axiosDefault = axios.create({
  baseURL: "https://api.data.go.kr",
  headers: {
    "Content-Type": "application/json",
  },
});
