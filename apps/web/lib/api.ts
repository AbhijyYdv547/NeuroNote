import { backendURL } from "@/config/url";


export async function logInUser(form: { email: string; password: string }) {
  const res = await fetch(`${backendURL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  return res.json();
}

export async function signUpUser(form: {
  email: string;
  password: string;
  name: string;
}) {
  const res = await fetch(`${backendURL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  return res.json();
}
