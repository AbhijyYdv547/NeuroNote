
import axios from "@/lib/axios";

export async function clearToken() {
  axios.post("/api/auth/logout",{},
  {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true, 
      }
 );
 
}


export async function getToken(){
    try {
      const res = await axios.get("/api/room/get-token");
      const {token} = res.data;
      if(!token){
        console.log("Problem occured")
        return;
      }
      return token;
    } catch (err: any) {
      console.error("error", err.response?.data || err);
    }
}