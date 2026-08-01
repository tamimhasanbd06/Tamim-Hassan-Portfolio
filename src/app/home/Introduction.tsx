"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const skills = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Python",
];

const Introduction = () => {
  const [age, setAge] = useState<number>(0);

  useEffect(() => {
    const calculateAge = () => {
      const birthDate = new Date(2010, 5, 6);
      const today = new Date();

      let calculatedAge =
        today.getFullYear() - birthDate.getFullYear();

      const monthDifference =
        today.getMonth() - birthDate.getMonth();

      const birthdayHasNotPassed =
        monthDifference < 0 ||
        (monthDifference === 0 &&
          today.getDate() < birthDate.getDate());

      if (birthdayHasNotPassed) {
        calculatedAge -= 1;
      }

      setAge(calculatedAge);
    };

    calculateAge();

    const ageUpdateInterval = window.setInterval(
      calculateAge,
      86_400_000,
    );

    return () => {
      window.clearInterval(ageUpdateInterval);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black px-4 py-20 text-white sm:px-6 md:px-10 lg:px-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000814] to-black" />

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* Background Glows */}
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-10rem)] w-full max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2 lg:gap-20">
        {/* LEFT CONTENT */}
        <div className="order-2 space-y-6 text-center md:order-1 md:text-left">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>

            <span className="text-xs font-semibold uppercase tracking-[3px] text-cyan-300">
              Available for opportunities
            </span>
          </div>

          {/* Greeting */}
          <p className="text-base font-medium text-gray-400 sm:text-lg">
            Assalamu Alaikum, I&apos;m
          </p>

          {/* Name */}
          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Tamim Hasan
            </span>
          </h1>

          {/* Role */}
          <h2 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
            Frontend Web Developer
          </h2>

          {/* Introduction */}
          <p className="max-w-xl text-sm leading-7 text-gray-300 sm:text-base md:text-lg md:leading-8">
            I&apos;m a passionate frontend developer and Class 12 student,
            focused on creating modern, responsive, and user-friendly digital
            experiences.
          </p>

          {/* Personal Details */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <span className="block text-xs uppercase tracking-[2px] text-gray-500">
                Age
              </span>

              <strong className="mt-2 block text-base text-cyan-300">
                {age > 0 ? `${age} years old` : "Calculating..."}
              </strong>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <span className="block text-xs uppercase tracking-[2px] text-gray-500">
                Education
              </span>

              <strong className="mt-2 block text-base text-cyan-300">
                Class 12 Student
              </strong>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <span className="block text-xs uppercase tracking-[2px] text-gray-500">
                Born
              </span>

              <strong className="mt-2 block text-base text-cyan-300">
                6 June 2010
              </strong>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <span className="block text-xs uppercase tracking-[2px] text-gray-500">
                Focus
              </span>

              <strong className="mt-2 block text-base text-cyan-300">
                Modern Web Applications
              </strong>
            </div>
          </div>

          {/* Description */}
          <p className="max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            I continuously improve my development, creativity, and
            problem-solving skills to build scalable, accessible, and
            high-quality web applications.
          </p>

          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-blue-400/20 bg-blue-400/5 px-4 py-2 text-xs font-medium text-blue-200"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row md:justify-start">
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              View My Projects
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="rounded-xl border border-cyan-400/40 bg-cyan-400/5 px-7 py-3 font-semibold text-cyan-300 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-400/10"
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* RIGHT PROFILE IMAGE */}
        <div className="order-1 flex justify-center md:order-2 md:justify-end">
          <div className="group relative w-full max-w-[430px]">
            {/* Image Glow */}
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-transparent blur-3xl transition duration-500 group-hover:from-blue-500/30 group-hover:via-cyan-400/20" />

            {/* Image Container */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-md">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-[#061225]">
                <Image
                  src="/me.jpg"
                  alt="Tamim Hasan, frontend web developer"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 430px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-blue-500/5" />

                {/* Image Caption */}
                <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                  <p className="text-xs font-semibold uppercase tracking-[3px] text-cyan-300">
                    Frontend Developer
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-white">
                    Building ideas for the web
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
