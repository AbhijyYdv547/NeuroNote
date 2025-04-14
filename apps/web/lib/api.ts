export async function signInUser(form: { email: string; password: string }) {
  const res = await fetch("http://localhost:3001/signin", {
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
  const res = await fetch("http://localhost:3001/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  return res.json();
}
