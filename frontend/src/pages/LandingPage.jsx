// LandingPage.jsx
import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import Hero from "../components/Hero";
import AboutCluster from "../components/AboutCluster";
import WhyChooseUs from "../components/WhyChooseUs";
import AboutImageCollage from "../components/AboutImageCollage";
import AboutUs from "../components/AboutUs";
import ProjectsSection from "../components/ProjectsSection";
import ClientsSection from "../components/ClientsSection";
import CTAAndFooter from "../components/CTAAndFooter";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function LandingPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch(API + "/projects").then((r) => r.json()).then(setProjects).catch(() => { });
    fetch(API + "/clients").then((r) => r.json()).then(setClients).catch(() => { });
  }, []);

  const handleContactSubmit = async (data) => {
    try {
      await fetch(API + "/contacts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      alert("Thanks! We'll contact you soon.");
    } catch (err) {
      alert("Submit failed");
    }
  };

  const handleSubscribe = async (email) => {
    try {
      await fetch(API + "/subscribers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      alert("Subscribed!");
    } catch (err) {
      alert("Subscribe failed");
    }
  };

  return (
    <div className="bg-white">
      <Header logo="/assets/Images/logo.svg" />
      <Hero onSubmit={handleContactSubmit} />
      <AboutCluster />
      <WhyChooseUs />
      <AboutImageCollage />
      <AboutUs />
      <ProjectsSection projects={projects} />
      <ClientsSection clients={clients} />
      <CTAAndFooter onSubscribe={handleSubscribe} />
    </div>
  );
}
