// ClientCard.jsx
import React from "react";

const looksLikePublicId = (val) => {
  if (typeof val !== "string") return false;
  const trimmed = val.trim();
  // Heuristic: Cloudinary public_id usually contains only alnum, _ - / (folders),
  // no whitespace, and is reasonably long (>=8)
  return /^[A-Za-z0-9_\-\/]{8,250}$/.test(trimmed) && !/\s/.test(trimmed);
};

export default function ClientCard({ client }) {
  // sanitize description for display
  const raw = client?.description || "";
  const description = raw && !looksLikePublicId(raw) ? raw : "";

  return (
    <div className="relative">
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        {client.image ? (
          <img
            src={client.image}
            alt={client.name}
            className="h-12 w-12 rounded-full border-4 border-white object-cover shadow"
            onError={(e) => { e.currentTarget.src = "/assets/placeholder-avatar.png"; }}
          />
        ) : (
          <div className="h-12 w-12 rounded-full border-4 border-white bg-gray-200 shadow" />
        )}
      </div>

      <div className="mt-8 bg-white rounded-xl p-6 pt-10 shadow-md min-h-[200px]">
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {description || "Lorem ipsum dolor sit amet."}
        </p>
        <div className="mt-4">
          <div className="text-sm font-semibold text-blue-700">{client.name}</div>
          <div className="text-xs text-gray-400">{client.designation}</div>
        </div>
      </div>
    </div>
  );
}

