// frontend/src/components/Newsletter.jsx
import React, { useState } from "react";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    if (!email) return setMsg("Please enter an email");
    try {
      const res = await fetch(API + "/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setMsg("Subscribed!");
        setEmail("");
      } else {
        const j = await res.json();
        setMsg(j.message || "Failed");
      }
    } catch (err) {
      setMsg("Network error");
    }
  };

  return (
    <div className="mt-8">
      <div className="bg-blue-600 rounded-md p-4 flex flex-col md:flex-row items-center gap-3">
        <div className="text-white font-semibold hidden md:block">Subscribe Us</div>

        <div className="flex-1">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            className="w-full md:max-w-xl p-2 rounded border border-white/30 outline-none"
          />
        </div>

        <div>
          <button
            onClick={submit}
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium"
          >
            Subscribe
          </button>
        </div>
      </div>

      {msg && <p className="mt-2 text-sm text-gray-700">{msg}</p>}
    </div>
  );
}
