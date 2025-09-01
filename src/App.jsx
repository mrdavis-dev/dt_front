
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Requests from "./pages/Requests";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  const logout = () => {
    setToken(null);
    setRole(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Inicio</Link>{" | "}
        {!token && <Link to="/login">Login</Link>}{" | "}
        {!token && <Link to="/register">Registro</Link>}{" | "}
        {role === "USER" && <Link to="/requests">Mis Trámites</Link>}{" | "}
        {role === "ADMIN" && <Link to="/admin">Panel Admin</Link>}{" | "}
        {token && <button onClick={logout}>Logout</button>}
      </nav>
      <Routes>
        <Route path="/" element={<h2>Bienvenido a DocuTrack</h2>} />
        <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/requests" element={<Requests token={token} />} />
        <Route path="/admin" element={<AdminPanel token={token} />} />
      </Routes>
    </div>
  );
}
