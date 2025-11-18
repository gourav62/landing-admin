// frontend/src/components/WhyChooseUs.jsx
import React from "react";

const features = [
    {
        title: "Potential ROI",
        text:
            "We advise on improvements and strategies to raise property value and maximize returns for sellers.",
        icon: "/assets/Icons/home.svg",
    },
    {
        title: "Design",
        text:
            "Clean, modern presentation and staging that highlights each property’s best features.",
        icon: "/assets/Icons/paintbrush-2.svg",
    },
    {
        title: "Marketing",
        text:
            "Targeted campaigns and listing exposure that bring qualified buyers faster.",
        icon: "/assets/Icons/circle-dollar-sign.svg",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="bg-white py-14 relative overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Section Title */}
                <div className="text-center mb-10">
                    <h3 className="text-2xl md:text-3xl font-semibold text-blue-700">
                        Why Choose Us?
                    </h3>
                    <div className="mt-2 w-20 h-1 bg-blue-700 mx-auto rounded"></div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="text-center px-6 py-4 transition-transform hover:-translate-y-1"
                        >
                            {/* Icon Circle */}
                            <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <img
                                    src={f.icon}
                                    alt={f.title + ' icon'}
                                    className="w-7 h-7 object-contain"
                                />
                            </div>

                            <h4 className="text-blue-700 font-semibold text-lg mb-2">
                                {f.title}
                            </h4>

                            <p className="text-sm text-gray-600 leading-relaxed">
                                {f.text}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
