const API_BASE = "http://localhost:3001";

export async function signup(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function signin(payload: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_BASE}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
