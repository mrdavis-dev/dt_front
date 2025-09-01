
import React, { useState } from "react";
import { apiFetch } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken, setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const data = await apiFetch("/auth/login", "POST", { email, password });
      const token = data.access_token;
      setToken(token);
      const me = await apiFetch("/auth/me", "GET", null, token);
      setRole(me.role);
      navigate("/");
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  );
}
