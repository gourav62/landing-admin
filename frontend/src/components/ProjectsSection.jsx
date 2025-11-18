import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function ProjectsSection({ projects: initialProjects = null }) {
  const [projects, setProjects] = useState(initialProjects || []);
  const [loading, setLoading] = useState(!initialProjects);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If parent already provided projects, don't fetch
    if (initialProjects && initialProjects.length > 0) return;

    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/projects`);
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        const data = await res.json();
        if (!cancelled) setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load projects", err);
        if (!cancelled) setError(err.message || "Failed to load projects");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [initialProjects]);

  // Small helper to render image (URL or base64)
  const renderImg = (src) => {
    if (!src) return "/assets/placeholder.png";
    // if src already contains data: or a full url, just use it
    return src;
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-700">Our Projects</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-3">
            We know what buyers are looking for and suggest projects that will bring clients top dollar for the sale of their homes.
          </p>
        </div>

        {loading && (
          <div className="text-center py-12 text-gray-400">Loading projects…</div>
        )}

        {error && (
          <div className="text-center py-8 text-red-600">Error: {error}</div>
        )}

        {!loading && !error && (
          <>
            {projects.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No projects yet.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {projects.map((p) => (
                  <article key={p._id || p.name} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                    <div className="h-44 md:h-40 w-full overflow-hidden">
                      <img
                        src={renderImg(p.image)}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = "/assets/placeholder.png"; }}
                      />
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-blue-700 font-semibold text-sm md:text-base mb-1">{p.name}</h3>
                      <p className="text-gray-400 text-xs md:text-sm mb-4">{p.description}</p>
                      <div className="mt-auto">
                        <button type="button" className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 rounded">
                          READ MORE
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
