import { motion } from "framer-motion";
import { Activity, Users2, ShieldCheck } from "lucide-react";
import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Career } from "@/sections/Career";
import { Services } from "@/sections/Services";
import { Projects } from "@/sections/Projects";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Career />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />

        {/* Extra Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 text-center max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text tracking-tight">
              Building in Public
            </h2>

            <p className="text-muted-foreground mb-16 max-w-2xl mx-auto text-base md:text-lg opacity-80">
              Passionate about open-source development and contributing to the community
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Active", 
                  desc: "Consistently building projects", 
                  delay: 0,
                  icon: <Activity className="w-7 h-7 text-primary" />,
                  iconAnim: { scale: [1, 1.15, 1] }
                },
                { 
                  title: "Collaborative", 
                  desc: "Open to working with others", 
                  delay: 0.1,
                  icon: <Users2 className="w-7 h-7 text-primary" />,
                  iconAnim: { y: [0, -3, 0] }
                },
                { 
                  title: "Quality Code", 
                  desc: "Clean and maintainable code", 
                  delay: 0.2,
                  icon: <ShieldCheck className="w-7 h-7 text-primary" />,
                  iconAnim: { rotate: [0, 5, -5, 0] }
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: item.delay }}
                  className="glass p-10 rounded-2xl border border-white/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col items-center group"
                >
                  <motion.div
                    animate={item.iconAnim}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-6 p-4 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors"
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16">
              <a
                href="https://github.com/nikesh1-asus"
                target="_blank"
                rel="noreferrer"
                className="glow-btn"
              >
                Check Out My GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll Button */}
      <ScrollToTop />
      
    </div>
  );
}

export default App;