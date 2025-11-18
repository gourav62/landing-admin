// frontend/src/components/AboutSimple.jsx
import React from "react";

/**
 * Simple, clean About cluster section (no dots).
 *
 * Props:
 *  - semicircle: optional decorative ring (kept subtle). Pass null to hide.
 *  - center, topRight, bottomRight: image paths (required)
 */
export default function AboutSimple({
    semicircle = "/assets/semicircle.svg",
    center = "/assets/Images/Ellipse 11.svg",
    topRight = "/assets/Images/Ellipse 12.svg",
    bottomRight = "/assets/Images/Ellipse 13.svg",
}) {
    return (
        <section className="relative overflow-visible py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                    {/* LEFT: heading + text */}
                    <div>
                        <h3 className="text-3xl md:text-4xl text-blue-600 font-semibold mb-4 leading-tight">
                            Not Your Average Realtor
                        </h3>

                        <p className="text-gray-600 max-w-lg text-lg leading-relaxed">
                            We deliver quality services and build strong client relationships for long-term success.
                            Our team focuses on presentation, design and marketing to bring top value to your listings.
                        </p>
                    </div>

                    {/* RIGHT: visual cluster */}
                    <div className="relative w-full h-72 md:h-96 flex justify-center md:justify-end items-center">
                        {/* subtle soft glow/backdrop (keeps design light & elegant) */}
                        <div className="absolute right-10 top-8 w-[380px] h-[380px] rounded-full bg-blue-50/50 blur-3xl pointer-events-none" />

                        {/* optional semicircle (kept very subtle) */}
                        {semicircle && (
                            <img
                                src={semicircle}
                                alt=""
                                className="pointer-events-none absolute right-0 top-0 w-[620px] md:w-[760px] opacity-40"
                                style={{ transform: "translate(8%, -6%)" }}
                            />
                        )}

                        {/* center large image */}
                        <div
                            className="absolute rounded-full overflow-hidden bg-white shadow-2xl"
                            style={{ width: 260, height: 260, right: "18%", top: "6%", border: "8px solid #fff" }}
                        >
                            <img src={center} alt="center" className="w-full h-full object-cover" />
                        </div>

                        {/* top-right small */}
                        <div
                            className="absolute rounded-full overflow-hidden bg-white shadow-lg"
                            style={{ width: 110, height: 110, right: "4%", top: "-6%", border: "6px solid #fff" }}
                        >
                            <img src={topRight} alt="top-right" className="w-full h-full object-cover" />
                        </div>

                        {/* bottom-right small */}
                        <div
                            className="absolute rounded-full overflow-hidden bg-white shadow-lg"
                            style={{ width: 130, height: 130, right: "6%", top: "56%", border: "6px solid #fff" }}
                        >
                            <img src={bottomRight} alt="bottom-right" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
