// frontend/src/components/AboutImageCollage.jsx
import React from "react";

export default function AboutImageCollage({
    img1 = "/assets/Images/pexels-brett-sayles-2881232.svg",    // left
    img2 = "/assets/Images/pexels-andres-ayrton-6578391.svg",  // center
    img3 = "/assets/Images/pexels-fauxels-3182834.svg",       // right
    showDecor = true,
}) {
    return (
        <section className="relative py-16 bg-white overflow-hidden">
            {/* subtle large soft background shapes (desktop only) */}
            {showDecor && (
                <>
                    <div
                        aria-hidden
                        className="hidden md:block pointer-events-none absolute -left-16 top-8 w-52 h-52 rounded-full bg-blue-50/60"
                        style={{ filter: "blur(22px)" }}
                    />
                    <div
                        aria-hidden
                        className="hidden md:block pointer-events-none absolute right-0 top-8 w-72 h-72 rounded-full bg-blue-50/20"
                        style={{ filter: "blur(28px)" }}
                    />
                </>
            )}

            <div className="container mx-auto px-6">
                <div className="relative w-full max-w-6xl mx-auto">
                    {/* layout: column on xs, row on md+ */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                        {/* LEFT small image (pulled up) */}
                        <div className="relative md:-translate-y-6 flex-shrink-0">
                            <div className="rounded-lg overflow-hidden shadow-md w-44 h-44 md:w-48 md:h-48 bg-white">
                                <img src={img1} alt="left" className="w-full h-full object-contain block" />
                            </div>

                            {/* top-right blue L accent */}
                            <span
                                className="hidden md:block absolute -top-2 -right-2"
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderTop: "6px solid #1D4ED8",
                                    borderRight: "6px solid #1D4ED8",
                                }}
                                aria-hidden
                            />

                            {/* bottom-left orange L accent */}
                            <span
                                className="hidden md:block absolute -bottom-2 -left-2"
                                style={{
                                    width: 18,
                                    height: 18,
                                    borderLeft: "6px solid #FB923C",
                                    borderBottom: "6px solid #FB923C",
                                }}
                                aria-hidden
                            />
                        </div>

                        {/* CENTER large image with pale square behind */}
                        <div className="relative flex-shrink-0">
                            {/* pale square behind center image */}
                            <div
                                aria-hidden
                                className="hidden md:block absolute -left-10 -top-6"
                                style={{
                                    width: 140,
                                    height: 140,
                                    background: "rgba(226,239,255,0.6)",
                                    borderRadius: 8,
                                    zIndex: 5,
                                }}
                            />

                            <div
                                className="rounded-xl overflow-hidden shadow-2xl bg-white"
                                style={{ width: 420, height: 320, zIndex: 10 }}
                            >
                                <img src={img2} alt="center" className="w-full h-full object-cover block" />
                            </div>

                            {/* small blue corner bracket (top-right) */}
                            <span
                                className="hidden md:block absolute -top-3 right-6"
                                style={{
                                    width: 22,
                                    height: 22,
                                    borderTop: "6px solid #1D4ED8",
                                    borderRight: "6px solid #1D4ED8",
                                }}
                                aria-hidden
                            />
                        </div>

                        {/* RIGHT small image (pushed down) */}
                        <div className="relative md:translate-y-6 flex-shrink-0">
                            <div className="rounded-lg overflow-hidden shadow-md w-44 h-44 md:w-48 md:h-48 bg-white">
                                <img src={img3} alt="right" className="w-full h-full object-contain block" />
                            </div>

                            {/* top-left blue L accent */}
                            <span
                                className="hidden md:block absolute -top-2 -left-2"
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderTop: "6px solid #1D4ED8",
                                    borderLeft: "6px solid #1D4ED8",
                                }}
                                aria-hidden
                            />

                            {/* small orange square accent (bottom-right) */}
                            <span
                                className="hidden md:block absolute -bottom-2 -right-2"
                                style={{
                                    width: 12,
                                    height: 12,
                                    background: "#FB923C",
                                    borderRadius: 3,
                                }}
                                aria-hidden
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* mobile fallback: remove transforms on small screens so stacked items sit naturally */}
            <style>{`
        @media (max-width: 767px) {
          .md\\:-translate-y-6 { transform: none !important; }
          .md\\:translate-y-6 { transform: none !important; }
        }
      `}</style>
        </section>
    );
}
