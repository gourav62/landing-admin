// frontend/src/components/AboutUs.jsx
import React from "react";

export default function AboutUs() {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Left faded arrow */}
            <div
                aria-hidden
                className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 opacity-10"
            >
                <img
                    src="/assets/shapes/arrow-left.svg"
                    alt=""
                    className="w-24"
                />
            </div>

            {/* Right faded arrow */}
            <div
                aria-hidden
                className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 opacity-10"
            >
                <img
                    src="/assets/shapes/arrow-right.svg"
                    alt=""
                    className="w-24"
                />
            </div>

            <div className="container mx-auto px-6 text-center max-w-3xl">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-semibold text-blue-600">
                    About Us
                </h2>

                {/* Blue underline */}
                <div className="mx-auto mt-2 mb-6 w-20 h-1 bg-blue-500 rounded-full"></div>

                {/* Paragraph */}
                <p className="text-gray-600 leading-relaxed mb-8">
                    Fifteen years of experience in real estate, excellent customer service
                    and a commitment to work hard, listen and follow through. We provide
                    quality service to build relationships with clients and, more
                    importantly, maintain those relationships by communicating
                    effectively.
                </p>

                {/* Button */}
                <button className="px-6 py-2 border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50 transition">
                    LEARN MORE
                </button>
            </div>
        </section>
    );
}
