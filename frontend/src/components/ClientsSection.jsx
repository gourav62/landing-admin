// frontend/src/components/ClientsSection.jsx
import React, { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function ClientsSection({ clients: initialClients = null }) {
  const [clients, setClients] = useState(initialClients || []);
  const [loading, setLoading] = useState(!initialClients);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialClients && initialClients.length) return; // parent provided data
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API}/clients`);
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        const data = await res.json();
        if (!cancelled) setClients(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Clients fetch failed:", err);
        if (!cancelled) setError(err.message || "Failed to load clients");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [initialClients]);

  const fallbackAvatar = "/assets/placeholder-avatar.png"; // put a small default avatar here

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="text-gray-500">Loading testimonials…</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="text-red-600">Error loading testimonials: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-blue-600">Happy Clients</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {clients.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No testimonials yet.</div>
          )}

          {clients.map((c) => (
            <div
              key={c._id || c.name}
              className="relative bg-white rounded-xl shadow-lg p-6 text-center flex flex-col items-center"
            >
              {/* Avatar circle */}
              <div className="w-20 h-20 -mt-12 mb-4 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img
                  src={c.image || fallbackAvatar}
                  alt={c.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.src = fallbackAvatar; }}
                />
              </div>

              {/* testimonial text */}
              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
                {c.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              </p>

              {/* name & designation */}
              <div className="text-center mt-auto">
                <div className="text-blue-600 font-semibold">{c.name}</div>
                <div className="text-xs text-gray-400">{c.designation}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
