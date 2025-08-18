
import { backendURL } from "@/config/url";
import axios from "axios";

const instance = axios.create({
  baseURL: backendURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
