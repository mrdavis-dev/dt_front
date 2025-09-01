
import React, { useState } from "react";
import { apiFetch } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await apiFetch("/auth/register", "POST", { email, password, full_name: fullName });
      alert("Usuario registrado, ahora logueate.");
      navigate("/login");
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <h2>Registro</h2>
      <input placeholder="Nombre completo" value={fullName} onChange={e=>setFullName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Registrar</button>
    </form>
  );
}
