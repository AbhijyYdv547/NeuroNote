"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import AuthPage from "@/components/AuthPage";
import { useRedirectIfLoggedIn } from "@/hooks/useRedirectIfLoggedIn";
import axios from "@/lib/axios";


export default function Signup() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useRedirectIfLoggedIn();

  async function register(e: React.FormEvent) {
    e.preventDefault();

    const name = nameRef.current?.value.trim();
    const email = emailRef.current?.value.trim();
    const password = passwordRef.current?.value;

    if (!name || !email || !password) {
      console.error("Please fill in all fields");
      return;
    }

    try {
      const res = await axios.post("/api/auth/signup",{
        email,
        password,
        name,
      }
    );
      if (res.data.message === "Register Successful") {
        router.push("/login");
      } else {
        console.error("Register failed", res.data);
      }
    } catch (err) {
      console.error("Registration error", err);
    }
    }
  

  return (
    <AuthPage
      nameRef={nameRef}
      emailRef={emailRef}
      passwordRef={passwordRef}
      onSubmit={register}
      login={false}
    />
  );
}
