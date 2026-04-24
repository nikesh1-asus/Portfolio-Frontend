import { useState } from "react";
 
// ================= DATA =================
const timelineData = {
  education: [
    {
      title: "BSc. Computer System Engineering",
      place: "University of Sunderland, UK",
      period: "2019 — 2023",
    },
    {
      title: "+2 Computer Science",
      place: "Trinity International College, Nepal",
      period: "2017 — 2019",

    }, 
    {
      title: "Secondary Education Examination (SEE)",
      place: "Brighter Academy, Nepal",
      period: "2017",
    }, 

  ],
  work: [
    {
      title: "Full Stack Engineer",
      company: "Ziva Medico Pvt. Ltd.",
      period: "February 2024 — Present",
      description: "Built and maintained multiple React and Node.js applications.",
    },
  ],
};

const skillsData = [
  {
    title: "Web Developer",
    experience: "More than 2 years",
    categories: [
      {
        title: "💻 Programming Languages",
        items: [
          { name: "C", level: 70 },
          { name: "C++", level: 75 },
          { name: "JavaScript", level: 90 },
          { name: "TypeScript", level: 85 },
          { name: "Python", level: 80 },
        ],
      },
      
      {
        title: "🌐 Frontend Development",
        items: [
          { name: "HTML5", level: 95 },
          { name: "CSS3", level: 90 },
          { name: "React", level: 92 },
          { name: "Tailwind", level: 88 },
        ],
      },
      {
        title: "🛠 Backend Development",
        items: [
          { name: "Node.js", level: 85 },
          { name: "Express", level: 80 },
          { name: "Django", level: 75 },
        ],
      },
        {
        title: "🗄️ Databases",
        items: [
          { name: "SQL", level: 70 },
          { name: "MongoDB", level: 75 },
          { name: "PostgreSQL", level: 65 },
          { name: "Redis", level: 60 },
          { name: "Firebase", level: 80 },
          { name: "SQLite", level: 70 },
          { name: "MySQL", level: 65 },
          { name: "GraphQL", level: 60 },
        ],
      },
       {
        title: "🛠️ Tools & Platforms",
        items: [
          { name: "Git", level: 70 },
          { name: "GitHub", level: 65 },
          { name: "Docker", level: 60 },
          { name: "AWS", level: 55 },
          { name: "Linux", level: 80 },
          { name: "VS Code", level: 90 },
          { name: "Postman", level: 75 },
          { name: "Jira", level: 65 },
          { name: "Figma", level: 70 },
        ],
      },

      
    ],
  },
  {
    title: "Photography / Videography",
    experience: "More than 6 years",
    categories: [
      {
        title: "📷 Skills",
        items: [
          { name: "Editing", level: 90 },
          { name: "Lighting", level: 85 },
          { name: "Composition", level: 88 },
        ],
      },
    ],
  },
];

// ================= COMPONENT =================
export const Career = () => {
  const [activeSection, setActiveSection] = useState("skills");
  const [openSkill, setOpenSkill] = useState(null);
  const [openCategory, setOpenCategory] = useState({});

  return (
    <section
      id="career"
      className="py-10 md:py-16 bg-[var(--color-background)] text-[var(--color-foreground)]"
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* ================= HEADING ================= */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10 animate-fade-in-up">
           My{" "}
          <span className="italic text-[var(--color-primary)]">
            Journey
          </span>
        </h2>

        {/* ================= TABS ================= */}
        <div className="flex gap-4 mb-10 justify-center flex-wrap">
          {[
            { key: "skills", label: "🛠️ Skills" },
            { key: "education", label: "🎓 Education" },
            { key: "work", label: "💼 Work" },
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => setActiveSection(btn.key)}
              className={`px-6 py-2 rounded-full border font-semibold transition glow-btn
              ${activeSection === btn.key
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "text-[var(--color-muted-foreground)] border-[var(--color-border)]"
                }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* ================= SKILLS ================= */}
        {activeSection === "skills" && (
          <div className="space-y-6">
            {skillsData.map((group, i) => (
              <div
                key={i}
                className="border border-[var(--color-border)] rounded-2xl p-5 bg-[var(--color-card)] glass"
              >
                {/* Header */}
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setOpenSkill(openSkill === i ? null : i)
                  }
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      {group.title}
                    </h3>
                    <p className="text-sm text-[var(--color-muted-foreground)]">
                      {group.experience}
                    </p>
                  </div>
                  <span>{openSkill === i ? "▲" : "▼"}</span>
                </div>

                {/* Content */}
                {openSkill === i && (
                  <div className="mt-6 space-y-5">
                    {group.categories.map((cat, idx) => {
                      const key = `${i}-${idx}`;
                      const isOpen = openCategory[key];

                      return (
                        <div key={key}>
                          <div
                            className="flex justify-between cursor-pointer"
                            onClick={() =>
                              setOpenCategory((prev) => ({
                                ...prev,
                                [key]: !prev[key],
                              }))
                            }
                          >
                            <h4 className="text-[var(--color-primary)]">
                              {cat.title}
                            </h4>
                            <span>{isOpen ? "−" : "+"}</span>
                          </div>

                          {isOpen && (
                            <div className="mt-4 space-y-4">
                              {cat.items.map((item, j) => (
                                <div key={j} className="animate-fade-in">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>{item.name}</span>
                                    <span>{item.level}%</span>
                                  </div>

                                  {/* Animated Bar */}
                                  <div className="w-full bg-[var(--color-muted)] rounded-full h-2 overflow-hidden">
                                    <div
                                      className="bg-[var(--color-primary)] h-2 rounded-full transition-all duration-700"
                                      style={{
                                        width: isOpen
                                          ? `${item.level}%`
                                          : "0%",
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ================= TIMELINE ================= */}
        {activeSection !== "skills" && (
          <div key={activeSection} className="relative mt-12 pb-12">
            {/* The Continuous Vertical Line (Centered) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[var(--color-primary)] opacity-40 md:w-1 -translate-x-1/2 timeline-glow" />

            <div className="space-y-16">
              {timelineData[activeSection].map((item, i) => {
                const isEven = i % 2 === 0;

                return (
                  <div
                    key={i}
                    style={{ animationDelay: `${i * 0.1}s` }}
                    className="relative animate-fade-in-up flex flex-col items-center"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 w-4 h-4 bg-[var(--color-primary)] rounded-full -translate-x-1/2 z-10 border-4 border-[var(--color-background)] shadow-[0_0_12px_rgba(32,178,166,0.6)]" />

                    {/* Timeline Content Grid */}
                    <div className="grid grid-cols-[1fr_auto_1fr] w-full items-center">
                      
                      {/* Left Side Content */}
                      <div className={`flex flex-col px-4 md:px-12 ${isEven ? "items-end text-right" : "opacity-0 pointer-events-none"}`}>
                        {isEven && (
                          <div className="bg-[var(--color-card)] p-6 rounded-2xl glass hover:glow-border transition-all duration-300 relative group w-full max-w-sm">
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                              {item.title}
                            </h3>
                            <p className="text-sm text-[var(--color-muted-foreground)] mb-3">
                              {activeSection === "education" ? item.place : item.company}
                            </p>
                            <p className="text-xs text-[var(--color-primary)] font-bold bg-[var(--color-primary)]/5 inline-block px-3 py-1 rounded-full">
                              {item.period}
                            </p>
                            {item.description && (
                              <p className="text-xs text-gray-400 mt-4 italic leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Center Spacer */}
                      <div className="w-4 md:w-12" />

                      {/* Right Side Content */}
                      <div className={`flex flex-col px-4 md:px-12 ${!isEven ? "items-start text-left" : "opacity-0 pointer-events-none"}`}>
                        {!isEven && (
                          <div className="bg-[var(--color-card)] p-6 rounded-2xl glass hover:glow-border transition-all duration-300 relative group w-full max-w-sm">
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                              {item.title}
                            </h3>
                            <p className="text-sm text-[var(--color-muted-foreground)] mb-3">
                              {activeSection === "education" ? item.place : item.company}
                            </p>
                            <p className="text-xs text-[var(--color-primary)] font-bold bg-[var(--color-primary)]/5 inline-block px-3 py-1 rounded-full">
                              {item.period}
                            </p>
                            {item.description && (
                              <p className="text-xs text-gray-400 mt-4 italic leading-relaxed">
                                {item.description}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};