"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import AuthPage from "@/components/AuthPage";
import { useRedirectIfLoggedIn } from "@/hooks/useRedirectIfLoggedIn";
import axios from "@/lib/axios"
import { toast } from "sonner"

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null)
  const router = useRouter();

  useRedirectIfLoggedIn();

  async function handleLogin(e:React.FormEvent) {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post("/api/auth/login",{ email, password });
      if (res.data.message === "Login Successful") {
        router.push("/dashboard");
      } else {
        console.error("Login failed", res.data);
      }
      toast("User has been logged in")
    } catch (err: any) {
      toast("Login error.Please try again after some time")
      console.error("Login error", err.response?.data || err);
    }
  }
  

  return (
    <AuthPage
      emailRef={emailRef}
      passwordRef={passwordRef}
      onSubmit={handleLogin}
      login={true}
    />
  );
}
