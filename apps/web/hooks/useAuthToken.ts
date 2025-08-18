import { backendURL } from "@/config/url";
import axios from "axios";

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