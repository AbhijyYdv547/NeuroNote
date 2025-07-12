"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthPage from "../../../components/AuthPage";
import { useRedirectIfLoggedIn } from "../../../hooks/useRedirectIfLoggedIn";
import { setToken } from "../../../hooks/useAuthToken";
import toast from "react-hot-toast";
import { logInUser } from "../../../lib/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useRedirectIfLoggedIn();

  async function handleLogin() {
    setLoading(true);
    try {
      const data = await logInUser(form);
      if (data.token) {
        setToken(data.token);
        toast.success("Logged in successfully!");
        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        toast.error(data.message || "Login failed!");
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
      <button className="btn" onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Log In"}
      </button>
    </AuthPage>
  );
}
