"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthPage from "../../../components/AuthPage";
import { useRedirectIfLoggedIn } from "../../../hooks/useRedirectIfLoggedIn";
import { setToken } from "../../../hooks/useAuthToken";
import toast from "react-hot-toast";
import { signInUser } from "../../../lib/api";

export default function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useRedirectIfLoggedIn();

  async function handleSignin() {
    setLoading(true);
    try {
      const data = await signInUser(form);
      if (data.token) {
        setToken(data.token);
        toast.success("Signed in successfully!");
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        toast.error(data.message || "Signin failed!");
      }
    } catch {
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthPage
      title="Welcome Back"
      footer={
        <p className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      }
    >
      <input
        type="text"
        placeholder="Email"
        className="input"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="input"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="btn" onClick={handleSignin} disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </AuthPage>
  );
}
