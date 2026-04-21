import { useState, useEffect } from "react";

const servicesData = [
  {
    title: "Web Developer",
    items: [
      "Designing and implementing user interfaces",
      "Developing back-end infrastructure",
      "Integrating data services",
      "Optimizing performance and security",
    ],
  },
  {
    title: "UI/UX Design",
    items: [
      "User research and analysis",
      "Wireframing and prototyping",
      "Design systems",
      "Usability testing",
    ],
  },
  {
    title: "Photography",
    items: [
      "Portrait photography",
      "Event coverage",
      "Photo editing",
      "Lighting setup",
    ],
  },
];

export const Services = () => {
  const [activeService, setActiveService] = useState(null);

  // 🔒 Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = activeService ? "hidden" : "auto";
  }, [activeService]);

  // ⌨️ Close on ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setActiveService(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section id="services" className="py-20 px-6 text-center">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold glow-text">My Services</h2>
        <p className="text-muted-foreground text-sm mt-1">
          What I Offer to Clients
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {servicesData.map((service, index) => (
          <div
            key={index}
            onClick={() => setActiveService(service)}
            className="glass p-6 rounded-xl w-64 cursor-pointer hover:scale-105 transition-all duration-300 glow-border"
          >
            <h3 className="text-xl font-semibold mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              View more →
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeService && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]"
          onClick={() => setActiveService(null)} // click outside closes
        >
          <div
            className="glass-strong w-[90%] max-w-md p-6 rounded-xl relative animate-fade-in-up cursor-default"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveService(null)}
              className="absolute top-3 right-4 text-lg cursor-pointer"
            >
              ✖
            </button>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-4">
              {activeService.title}
            </h3>

            {/* List */}
            <ul className="space-y-2 text-left">
              {activeService.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-teal-400">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};