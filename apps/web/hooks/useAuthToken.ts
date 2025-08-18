import { backendURL } from "@/config/url";
import axios from "axios";

export function getToken() {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}

export function setToken(token: string) {
    if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
    }
}
export async function clearToken() {
 const res = await axios.post(`${backendURL}/api/auth/logout`,{},
  {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true, 
      }
 );
 console.log(res,"Done");
}