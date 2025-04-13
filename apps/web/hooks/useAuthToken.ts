export function getToken() {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}

export function setToken(token: string) {
    if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
    }
}
export function clearToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}