// frontend/src/components/ContactForm.jsx
import React, { useState } from "react";
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API + "/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMsg("Submitted — thanks!");
        setForm({ fullName: "", email: "", mobile: "", city: "" });
      } else {
        const j = await res.json();
        setMsg(j.message || "Submit failed");
      }
    } catch (err) {
      setMsg("Network error");
    }
  };

  return (
    <div className="max-w-md">
      <div className="bg-[#3d4b80] rounded-lg p-6 shadow-lg text-white">
        <h3 className="text-2xl font-semibold mb-4 text-center">Get a Free Consultation</h3>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            placeholder="Full Name"
            className="w-full p-3 rounded border border-white/30 bg-white/5 outline-none"
            required
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="Enter Email Address"
            className="w-full p-3 rounded border border-white/30 bg-white/5 outline-none"
            required
          />
          <input
            name="mobile"
            value={form.mobile}
            onChange={onChange}
            placeholder="Mobile Number"
            className="w-full p-3 rounded border border-white/30 bg-white/5 outline-none"
            required
          />
          <input
            name="city"
            value={form.city}
            onChange={onChange}
            placeholder="Area, City"
            className="w-full p-3 rounded border border-white/30 bg-white/5 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full mt-2 bg-orange-500 text-white py-3 rounded-md font-medium shadow"
          >
            Get Quick Quote
          </button>

          {msg && <div className="mt-2 text-sm text-white/90">{msg}</div>}
        </form>
      </div>
    </div>
  );
}

