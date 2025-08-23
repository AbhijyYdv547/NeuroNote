
import axios from "@/lib/axios";
import { toast } from "sonner";

export async function clearToken() {
  axios.post("/api/auth/logout",{},
  {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true, 
      }
 );
 toast("User has been logged out!")
 
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
      toast("Some error occured")
      console.log("error", err.response?.data || err);
    }
}