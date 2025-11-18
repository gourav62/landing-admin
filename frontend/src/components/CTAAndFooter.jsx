// frontend/src/components/CTAAndFooter.jsx
import React, { useState } from "react";

export default function CTAAndFooter({ onSubscribe }) {
  const [email, setEmail] = useState("");

  return (
    <section className="w-full">

      {/* ============ TOP CTA WITH BACKGROUND IMAGE ============ */}
      <div
        className="w-full bg-cover bg-center py-20 flex flex-col items-center text-center text-white"
        style={{
          backgroundImage: "url('/assets/Images/Rectangle.svg')",
        }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold max-w-2xl leading-relaxed">
          Learn more about our listing process, as well as our
          additional staging and design work.
        </h2>

        <button className="mt-6 px-10 py-2 bg-white text-blue-600 rounded-md shadow hover:bg-gray-100 transition">
          LEARN MORE
        </button>
      </div>

      {/* ============ BLUE NAV / SUBSCRIBE BAR ============ */}
      <div className="w-full bg-blue-600 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row 
                        items-center justify-between gap-6 text-white">

          {/* NAV LINKS */}
          <div className="flex gap-8 text-sm font-light">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Services</a>
            <a href="#" className="hover:underline">Projects</a>
            <a href="#" className="hover:underline">Testimonials</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>

          {/* SUBSCRIBE BOX */}
          <div className="flex items-center gap-2">
            <span className="text-sm">Subscribe Us</span>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              className="px-3 py-2 rounded-md text-black w-48 md:w-60"
            />

            <button
              onClick={() => {
                if (onSubscribe && email) {
                  onSubscribe(email);
                  setEmail("");
                }
              }}
              className="px-5 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ============ DARK FOOTER ============ */}
      <div className="w-full bg-gray-900 py-6 text-gray-300">
        <div className="container mx-auto px-6 flex flex-col md:flex-row 
                        items-center justify-between text-sm">

          {/* COPYRIGHT */}
          <p>All Rights Reserved © 2023</p>

          {/* CENTER LOGO */}
          <div className="flex items-center gap-2">
            <img
              src="/assets/Images/logo.svg"
              alt="Real Trust"
              className="w-28 object-contain brightness-200"
            />
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 items-center">
            <a href="#">
              <img
                src="/assets/Icons/Group-1.svg"
                alt="twitter"
                className="className=w-6 h-6 brightness-200"
              />
            </a>

            <a href="#">
              <img
                src="/assets/Icons/Group.svg"
                alt="instagram"
                className="className=w-6 h-6 brightness-200"
              />
            </a>

            <a href="#">
              <img
                src="/assets/Icons/Frame.svg"
                alt="facebook"
                className="className=w-6 h-6 brightness-200"
              />
            </a>

            <a href="#">
              <img
                src="/assets/Icons/Linkedin.svg"
                alt="linkedin"
                className="className=w-6 h-6 brightness-200"
              />
            </a>
          </div>


        </div>
      </div>

    </section>
  );
}
