import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { getToken } from "./useAuthToken";

export const useUserData = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  interface TokenPayload {
    userId: string;
  }

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      if (decoded?.userId) {
        setCurrentUser(decoded.userId.toString());
      } else {
        console.warn("Token missing 'userId'");
      }
    } catch (err) {
      console.error("Error decoding token:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { currentUser, loading };
};