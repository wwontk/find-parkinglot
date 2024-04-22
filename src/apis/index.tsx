import axios from "axios";

export const axiosDefault = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/http://api.data.go.kr",
  headers: {
    "Content-Type": "application/json",
  },
});
