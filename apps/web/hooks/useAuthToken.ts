
import axios from "@/lib/axios";

export async function clearToken() {
  axios.post(`/api/auth/logout`,{},
  {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true, 
      }
 );
 
}