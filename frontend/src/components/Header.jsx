import React, { useState } from "react";
import AdminLoginButton from "../components/AdminLoginButton";
import { Link } from "react-router-dom";

export default function Header({ logo = "/assets/logo/real-trust-logo.svg" }) {
    const [open, setOpen] = useState(false);

    const nav = [
        { label: "Home", href: "#" },
        { label: "Services", href: "#services" },
        { label: "About Projects", href: "#projects" },
        { label: "Testimonials", href: "#testimonials" },
    ];

    return (
        <header className="w-full bg-white shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* left: logo */}
                    <div className="flex items-center">
                        <a href="#" className="inline-flex items-center">
                            <img src={logo} alt="Real Trust" className="w-36 h-auto object-contain" />
                        </a>
                    </div>

                    {/* center: nav (desktop) */}
                    <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
                        {nav.map((item) => (
                            <a key={item.href} href={item.href} className="hover:text-blue-600">
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* right buttons */}
                    <div className="flex items-center gap-4">
                        
                        {/* Admin Login Button (desktop) */}
                        <div className="hidden md:block">
                            <AdminLoginButton />
                        </div>

                        {/* Contact button */}
                        <a
                            href="#contact"
                            className="hidden md:inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition"
                        >
                            Contact
                        </a>

                        {/* mobile hamburger */}
                        <button
                            onClick={() => setOpen((s) => !s)}
                            className="md:hidden p-2 rounded-md inline-flex items-center justify-center text-gray-600 hover:bg-gray-100"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {open ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {open && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col gap-2">
                            {nav.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="block px-3 py-2 text-gray-700 rounded hover:bg-gray-50"
                                >
                                    {item.label}
                                </a>
                            ))}

                            {/* Contact (mobile) */}
                            <a
                                href="#contact"
                                onClick={() => setOpen(false)}
                                className="mt-2 inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-md text-center"
                            >
                                Contact
                            </a>

                            {/* Admin Login Button (mobile) */}
                            <div className="mt-3 px-3">
                                <AdminLoginButton />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
