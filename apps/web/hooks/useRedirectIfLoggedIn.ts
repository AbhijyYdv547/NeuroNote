
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useRedirectIfLoggedIn() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, []);
}
