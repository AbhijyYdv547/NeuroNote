"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import AuthPage from "@/components/AuthPage";
import { useRedirectIfLoggedIn } from "@/hooks/useRedirectIfLoggedIn";
import axios from "axios"

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null)
  const router = useRouter();

  useRedirectIfLoggedIn();

  async function handleLogin(e:React.FormEvent) {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      if (res.data.message === "Login Successful") {
        router.push("/dashboard");
      } else {
        console.error("Login failed", res.data);
      }
    } catch (err) {
      console.error("Login error", err);
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
