// Hero.jsx
import React from "react";

export default function Hero({ onSubmit }) {
    const bg =
        "/assets/Images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg";

    return (
        <section className="relative">
            <div
                className="h-[520px] bg-center bg-cover flex items-center"
                style={{ backgroundImage: `url('${bg}')` }}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <div className="max-w-lg text-white">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                            Consultation, <br /> Design, & Marketing
                        </h1>
                        <p className="mt-4 text-lg opacity-90">
                            We craft beautiful websites and marketing strategies that convert.
                        </p>
                    </div>

                    <div className="w-full max-w-md bg-[#2e3b66] bg-opacity-95 border border-white/10 rounded-lg p-6 text-white shadow-lg">
                        <h3 className="text-xl font-semibold mb-3">
                            Get a Free Consultation
                        </h3>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const data = Object.fromEntries(new FormData(e.target));
                                onSubmit?.(data);
                            }}
                            className="space-y-3"
                        >
                            <input
                                name="fullName"
                                placeholder="Full Name"
                                className="w-full p-3 rounded border border-white/30 bg-white/5 outline-none"
                            />

                            <input
                                name="email"
                                type="email"
                                placeholder="Enter Email Address"
                                className="w-full p-3 rounded border border-white/30 bg-white/5 outline-none"
                            />

                            <input
                                name="mobile"
                                placeholder="Mobile Number"
                                className="w-full p-3 rounded border border-white/30 bg-white/5 outline-none"
                            />

                            <input
                                name="city"
                                placeholder="Area, City"
                                className="w-full p-3 rounded border border-white/30 bg-white/5 outline-none"
                            />

                            <button
                                type="submit"
                                className="w-full mt-2 bg-orange-500 text-white py-3 rounded-md font-medium"
                            >
                                Get Quick Quote
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
