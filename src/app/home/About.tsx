type AboutItem = {
  number: string;
  title: string;
  description: string;
};

const aboutItems: AboutItem[] = [
  {
    number: "01",
    title: "Background",
    description:
      "I’m Tamim Hasan, a frontend developer focused on building modern and practical web applications.",
  },
  {
    number: "02",
    title: "Education",
    description:
      "I’m currently a Class 12 student at Johorpur Al-Fatah Darul Uloom Qawmi Madrasa.",
  },
  {
    number: "03",
    title: "Experience",
    description:
      "I develop real-world projects through personal practice and my Programming Hero journey.",
  },
  {
    number: "04",
    title: "Future Goal",
    description:
      "My goal is to become a full-stack engineer and build intelligent, voice-controlled products.",
  },
];

const technologies = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "MongoDB",
  "Python",
  "AI Tools",
];

const About = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black px-4 py-20 text-white sm:px-6 md:px-10 lg:px-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000814] to-black" />

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* Background Glows */}
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-blue-500/20 blur-[130px]" />

      <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

            <span className="text-xs font-semibold uppercase tracking-[3px] text-cyan-300">
              Get to know me
            </span>
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            About{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Me
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base md:text-lg">
            A curious developer, committed student, and future full-stack
            engineer who enjoys transforming ideas into useful digital
            experiences.
          </p>
        </div>

        {/* Main About Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8 lg:p-10">
          {/* Inner Glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* Introduction */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-cyan-300">
                  Frontend Developer
                </p>

                <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                  Building with purpose,
                  <span className="block text-blue-400">
                    learning every day.
                  </span>
                </h2>

                <p className="mt-6 text-sm leading-7 text-gray-400 sm:text-base">
                  My name is Tamim Hasan. I build clean, responsive,
                  and user-focused websites using modern frontend technologies.
                </p>

                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  I care about thoughtful design, reliable code, and creating
                  experiences that are simple for people to use.
                </p>
              </div>

              {/* Quick Information */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="block text-xs uppercase tracking-[2px] text-gray-500">
                    Location
                  </span>

                  <strong className="mt-2 block text-sm text-cyan-300">
                    Bangladesh
                  </strong>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="block text-xs uppercase tracking-[2px] text-gray-500">
                    Current Level
                  </span>

                  <strong className="mt-2 block text-sm text-cyan-300">
                    Class 12
                  </strong>
                </div>
              </div>
            </div>

            {/* Information Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {aboutItems.map((item) => (
                <article
                  key={item.number}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/[0.04]"
                >
                  <span className="font-mono text-xs font-bold text-cyan-400/60">
                    {item.number}
                  </span>

                  <h3 className="mt-4 text-lg font-bold text-white transition-colors group-hover:text-cyan-300">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {item.description}
                  </p>

                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 group-hover:w-full" />
                </article>
              ))}
            </div>
          </div>

          {/* Technology Section */}
          <div className="relative mt-10 border-t border-white/10 pt-8">
            <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[3px] text-gray-500 sm:text-left">
              Technologies I work with
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-blue-400/20 bg-blue-400/5 px-4 py-2 text-xs font-medium text-blue-200 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-sm italic leading-7 text-gray-500 sm:text-base">
            “My ambition is to combine creativity, technology, and intelligent
            systems to build products that improve everyday life.”
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
