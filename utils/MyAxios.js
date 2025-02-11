import axios from "axios";

const MyAxios = axios.create({
  baseURL: "http://192.168.1.15:8080/api",//adjust this based on the IP address of your machine
  headers: {
    "Content-Type": "application/json",
  },
});

export default MyAxios;