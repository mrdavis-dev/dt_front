
import React, { useEffect, useState } from "react";
import { apiFetch } from "../api";

export default function AdminPanel({ token }) {
  const [requests, setRequests] = useState([]);

  async function load() {
    const data = await apiFetch("/admin/requests", "GET", null, token);
    setRequests(data);
  }

  async function updateStatus(id, status) {
    await apiFetch(`/admin/requests/${id}/status`, "PATCH", { status }, token);
    load();
  }

  useEffect(() => { if (token) load(); }, [token]);

  return (
    <div>
      <h2>Panel Admin</h2>
      <ul>
        {requests.map(r => (
          <li key={r.id}>
            {r.id} – {r.certificate_type} – {r.status}
            <button onClick={() => updateStatus(r.id, "ISSUED")}>Emitir</button>
            <button onClick={() => updateStatus(r.id, "REJECTED")}>Rechazar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
