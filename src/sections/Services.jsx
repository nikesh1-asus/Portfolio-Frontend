import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";

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
  const scrollPos = useRef(0);

  // ✅ JUMP-FREE INDUSTRIAL SCROLL LOCK
  useEffect(() => {
    if (activeService) {
      // Capture current scroll position
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      scrollPos.current = scrollY;
      
      // Lock background strictly
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore everything
      const savedPos = scrollPos.current;
      
      // 1. Disable smooth scrolling temporarily to prevent jumps
      const originalScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';

      // 2. Clear fixed styles
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      // 3. Restore scroll position IMMEDIATELY
      if (savedPos !== undefined) {
        window.scrollTo(0, savedPos);
      }

      // 4. Restore original scroll behavior
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [activeService]);

  return (
    <section id="services" className="py-10 md:py-16 px-6 text-center">
      {/* HEADER */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold glow-text">My Services</h2>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
          Delivering high-quality digital solutions with a focus on clean code
          and user experience.
        </p>
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="glass p-6 rounded-2xl flex flex-col items-center group hover:scale-[1.05] transition-all duration-300 relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
              {service.title}
            </h3>

            <button
              onClick={() => setActiveService(service)}
              className="mt-4 flex items-center gap-2 text-primary font-medium hover:underline group/btn"
            >
              View More
              <span className="group-hover/btn:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* ================= MODAL / BOTTOM SHEET ================= */}
      <AnimatePresence>
        {activeService && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveService(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[6000] cursor-pointer"
            />

            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed z-[6001] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-[#0b0f13] border border-white/10 shadow-2xl overflow-hidden rounded-3xl"
            >
              {/* Header / Close Button */}
              <div className="p-6 flex justify-between items-center border-b border-white/5 sticky top-0 bg-[#0b0f13]/90 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white md:text-center md:w-full">
                  {activeService.title}
                </h3>
                <button
                  onClick={() => setActiveService(null)}
                  className="absolute right-6 p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable List Area */}
              <div className="p-8 overflow-y-auto max-h-[60vh]">
                <ul className="space-y-5 text-left mb-8">
                  {activeService.items.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-4"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-base text-gray-200">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="mt-2">
                  <button
                    onClick={() => setActiveService(null)}
                    className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:brightness-110 transition-all text-base shadow-lg"
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
              
              {/* Mobile Handle */}
              <div className="flex justify-center pb-2 md:hidden">
                 <div className="w-12 h-1.5 bg-white/10 rounded-full mt-4 mb-2" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};