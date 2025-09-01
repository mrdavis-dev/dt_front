import React, { useEffect, useState } from "react";
import { apiFetch } from "../api";

const API_URL = "http://localhost:8000/api";

export default function Requests({ token }) {
  const [requests, setRequests] = useState([]);

  async function loadRequests() {
    const data = await apiFetch("/requests", "GET", null, token);
    setRequests(data);
  }

  async function createRequest() {
    const certType = prompt("Tipo de certificado:", "birth");
    const payload = { certificate_type: certType, data: { name: "Demo User" } };
    await apiFetch("/requests", "POST", payload, token);
    loadRequests();
  }

  async function downloadCert(id) {
    const res = await fetch(`${API_URL}/requests/${id}/certificate`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
      const txt = await res.text();
      alert(`Error al descargar: ${txt}`);
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `certificado_${id}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  useEffect(() => { if (token) loadRequests(); }, [token]);

  return (
    <div>
      <h2>Mis Trámites</h2>
      <button onClick={createRequest}>Nuevo Trámite</button>
      <ul>
        {requests.map(r => (
          <li key={r.id}>
            {r.certificate_type} – {r.status}
            {r.status === "ISSUED" && r.certificate_pdf_path && (
              <button onClick={() => downloadCert(r.id)}>Descargar PDF</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
