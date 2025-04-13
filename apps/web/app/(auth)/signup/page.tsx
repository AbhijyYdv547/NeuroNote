"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useRedirectIfLoggedIn } from "../../../hooks/useRedirectIfLoggedIn";

export default function Signup() {
    const [form, setForm] = useState({ email: "", password: "", name: "" });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSignup() {
        setLoading(true)
        try{
        const res = await fetch("http://localhost:3001/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await res.json();
      if (res.ok) {
        toast.success("Signup successful! Redirecting...");
        setTimeout(() => router.push("/signin"), 1500);
      } else {
        toast.error(data.message || "Signup failed!");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
    }

    useRedirectIfLoggedIn();


    return (
<div className="min-h-screen flex items-center justify-center bg-black text-white">
      <Toaster position="top-center" />
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Create an Account</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span className="ml-2">Signing up...</span>
            </div>
          ) : (
            "Sign Up"
          )}
        </button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );



}
