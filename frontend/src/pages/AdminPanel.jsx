// frontend/src/pages/AdminPanel.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function AdminPanel() {
  const { token, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // lists
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  // loading + messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Project form
  const [projName, setProjName] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projFile, setProjFile] = useState(null);
  const [projPreview, setProjPreview] = useState(null);

  // Client form
  const [clientName, setClientName] = useState("");
  const [clientDesignation, setClientDesignation] = useState("");
  const [clientDesc, setClientDesc] = useState("");
  const [clientFile, setClientFile] = useState(null);
  const [clientPreview, setClientPreview] = useState(null);

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // helper to build headers (include Authorization if token exists)
  const buildHeaders = (extra = {}) => {
    const headers = { ...extra };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
  };

  async function fetchAll() {
    try {
      setLoading(true);
      // include Authorization if token present
      const [pRes, cRes, ctRes, sRes] = await Promise.all([
        fetch(`${API}/projects`, { headers: buildHeaders() }),
        fetch(`${API}/clients`, { headers: buildHeaders() }),
        fetch(`${API}/contacts`, { headers: buildHeaders() }),
        fetch(`${API}/subscribers`, { headers: buildHeaders() }),
      ]);
      const [pJson, cJson, ctJson, sJson] = await Promise.all([
        pRes.ok ? pRes.json() : [],
        cRes.ok ? cRes.json() : [],
        ctRes.ok ? ctRes.json() : [],
        sRes.ok ? sRes.json() : [],
      ]);
      setProjects(Array.isArray(pJson) ? pJson : []);
      setClients(Array.isArray(cJson) ? cJson : []);
      setContacts(Array.isArray(ctJson) ? ctJson : []);
      setSubscribers(Array.isArray(sJson) ? sJson : []);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to fetch admin data" });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3500);
    }
  }

  // preview helpers
  const readPreview = (file, setPreview) => {
    if (!file) return setPreview(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  // handle project file input change
  const onProjFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setProjFile(f);
    readPreview(f, setProjPreview);
  };

  // handle client file input change
  const onClientFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setClientFile(f);
    readPreview(f, setClientPreview);
  };

  // show temporary message
  const flash = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  // --------------------------
  // Submit Project (FormData)
  // --------------------------
  const submitProject = async (e) => {
    e.preventDefault();
    if (!projName || !projDesc) return flash("error", "Fill project name + description");

    try {
      setLoading(true);
      const form = new FormData();
      form.append("name", projName);
      form.append("description", projDesc);
      if (projFile) form.append("image", projFile);

      const res = await fetch(`${API}/projects`, {
        method: "POST",
        headers: buildHeaders(), // do NOT set Content-Type; only Authorization will be added
        body: form,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Status ${res.status}`);
      }
      const created = await res.json();
      setProjects((s) => [created, ...s]);
      setProjName("");
      setProjDesc("");
      setProjFile(null);
      setProjPreview(null);
      flash("success", "Project added");
    } catch (err) {
      console.error(err);
      flash("error", err.message || "Project upload failed");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------
  // Submit Client (FormData)
  // --------------------------
  const submitClient = async (e) => {
    e.preventDefault();
    if (!clientName || !clientDesignation) return flash("error", "Fill client name + designation");

    try {
      setLoading(true);
      const form = new FormData();
      form.append("name", clientName);
      form.append("designation", clientDesignation);
      form.append("description", clientDesc || "");
      if (clientFile) form.append("image", clientFile);

      const res = await fetch(`${API}/clients`, {
        method: "POST",
        headers: buildHeaders(),
        body: form,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Status ${res.status}`);
      }
      const created = await res.json();
      setClients((s) => [created, ...s]);
      setClientName("");
      setClientDesignation("");
      setClientDesc("");
      setClientFile(null);
      setClientPreview(null);
      flash("success", "Client added");
    } catch (err) {
      console.error(err);
      flash("error", err.message || "Client upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Delete handlers
  const removeItem = async (type, id) => {
    if (!confirm("Delete this item?")) return;
    try {
      setLoading(true);
      const res = await fetch(`${API}/${type}/${id}`, {
        method: "DELETE",
        headers: buildHeaders(),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Delete failed");
      }
      if (type === "projects") setProjects((s) => s.filter((p) => p._id !== id));
      if (type === "clients") setClients((s) => s.filter((c) => c._id !== id));
      flash("success", "Deleted");
    } catch (err) {
      console.error(err);
      flash("error", err.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Render UI — simplified and styled with Tailwind (same structure as earlier)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <a href="/" className="text-sm text-gray-600">← Back to site</a>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-sm text-gray-500">Manage projects, clients, contacts and subscriptions</p>
          </div>

          <div className="flex items-center gap-4">
            {user?.username ? (
              <div className="text-sm text-gray-700">
                Signed in as <span className="font-medium">{user.username}</span>
              </div>
            ) : (
              <div className="text-sm text-gray-600">Status: <span className="ml-2 text-green-600">Connected</span></div>
            )}

            <div>
              <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded ${message.type === "success" ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* forms column */}
          <div className="space-y-6">
            {/* Project form */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Add Project</h2>
              <form onSubmit={submitProject} className="space-y-3">
                <input value={projName} onChange={(e) => setProjName(e.target.value)} placeholder="Name" className="w-full px-3 py-2 border rounded" />
                <textarea value={projDesc} onChange={(e) => setProjDesc(e.target.value)} rows={3} placeholder="Description" className="w-full px-3 py-2 border rounded" />
                <div>
                  <input type="file" accept="image/*" onChange={onProjFileChange} />
                  {projPreview && <img src={projPreview} alt="preview" className="w-20 h-20 object-cover rounded mt-2" />}
                </div>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded mt-2">Add Project</button>
              </form>
            </div>

            {/* Client form */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Add Client</h2>
              <form onSubmit={submitClient} className="space-y-3">
                <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Name" className="w-full px-3 py-2 border rounded" />
                <input value={clientDesignation} onChange={(e) => setClientDesignation(e.target.value)} placeholder="Designation" className="w-full px-3 py-2 border rounded" />
                <textarea value={clientDesc} onChange={(e) => setClientDesc(e.target.value)} rows={3} placeholder="Description" className="w-full px-3 py-2 border rounded" />
                <div>
                  <input type="file" accept="image/*" onChange={onClientFileChange} />
                  {clientPreview && <img src={clientPreview} alt="preview" className="w-20 h-20 object-cover rounded-full mt-2" />}
                </div>
                <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded mt-2">Add Client</button>
              </form>
            </div>
          </div>

          {/* lists & tables column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Projects quick list */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Projects ({projects.length})</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projects.map(p => (
                  <div key={p._id || p.name} className="flex items-center gap-3 border rounded p-2">
                    <div className="w-16 h-16 overflow-hidden rounded">
                      <img src={p.image || "/assets/placeholder.png"} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-sm text-gray-500">{(p.description || "").slice(0, 80)}</div>
                    </div>
                    <button className="text-sm text-red-600" onClick={() => removeItem("projects", p._id)}>Delete</button>
                  </div>
                ))}
                {projects.length === 0 && <div className="text-sm text-gray-500">No projects yet</div>}
              </div>
            </div>

            {/* Clients quick list */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Clients ({clients.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {clients.map(c => (
                  <div key={c._id || c.name} className="flex items-center gap-3 border rounded p-2">
                    <div className="w-14 h-14 overflow-hidden rounded-full">
                      <img src={c.image || "/assets/placeholder.png"} alt={c.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{c.name}</div>
                      <div className="text-sm text-gray-500">{c.designation}</div>
                    </div>
                    <button className="text-sm text-red-600" onClick={() => removeItem("clients", c._id)}>Delete</button>
                  </div>
                ))}
                {clients.length === 0 && <div className="text-sm text-gray-500">No clients yet</div>}
              </div>
            </div>

            {/* Contacts table */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Contact Form Responses</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs text-gray-500">Name</th>
                      <th className="px-3 py-2 text-left text-xs text-gray-500">Email</th>
                      <th className="px-3 py-2 text-left text-xs text-gray-500">Mobile</th>
                      <th className="px-3 py-2 text-left text-xs text-gray-500">City</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {contacts.length === 0 && (
                      <tr><td colSpan={4} className="px-3 py-6 text-center text-sm text-gray-400">No responses yet</td></tr>
                    )}
                    {contacts.map(c => (
                      <tr key={c._id || c.email}>
                        <td className="px-3 py-2 text-sm">{c.fullName}</td>
                        <td className="px-3 py-2 text-sm">{c.email}</td>
                        <td className="px-3 py-2 text-sm">{c.mobile}</td>
                        <td className="px-3 py-2 text-sm">{c.city}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Subscribers */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Subscribed Emails</h3>
              <div className="space-y-2">
                {subscribers.length === 0 && <div className="text-sm text-gray-500">No subscribers yet</div>}
                {subscribers.map(s => (
                  <div key={s._id || s.email} className="flex items-center justify-between">
                    <div className="text-sm">{s.email}</div>
                    <div className="text-xs text-gray-400">{new Date(s.createdAt || Date.now()).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500">Tip: For production, consider uploading images to Cloudinary/S3 and store URLs instead of base64 in DB.</div>
      </div>
    </div>
  );
}
