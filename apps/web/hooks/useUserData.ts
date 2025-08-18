import { useState, useEffect } from "react";
import axios from "@/lib/axios";

export const useUserData = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function getUser(){
      setLoading(true);
      const result = await axios.get("/api/auth/me");
      setCurrentUser(result.data.user.name)
      setLoading(false)
    }
    getUser();
  }, []);

  return { currentUser, loading };
};