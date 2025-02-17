import axios from "axios";

const MyAxios = axios.create({
  baseURL: "http://172.20.10.4:8080/api", //adjust this based on the IP address of your machine
  headers: {
    "Content-Type": "application/json",
  },
});

export default MyAxios;