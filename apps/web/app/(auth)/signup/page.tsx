"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthPage from "@/components/AuthPage";
import { useRedirectIfLoggedIn } from "@/hooks/useRedirectIfLoggedIn";
import toast from "react-hot-toast";
import { signUpUser } from "@/lib/api";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useRedirectIfLoggedIn();

  async function handleSignup() {
    setLoading(true);
    try {
      const data = await signUpUser(form);
      if (data.userId) {
        toast.success("Signup successful! Redirecting...");
        setTimeout(() => router.push("/signin"), 1500);
      } else {
        toast.error(data.message || "Signup failed!");
      }
    } catch {
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthPage
      title="Create an Account"
      footer={
        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      }
    >
      <input
        type="text"
        placeholder="Name"
        className="input"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
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
      <button className="btn" onClick={handleSignup} disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </AuthPage>
  );
}
