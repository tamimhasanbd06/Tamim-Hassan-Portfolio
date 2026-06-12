import React, { useState, useEffect, useMemo } from "react";

import { IoLogoHtml5 } from "react-icons/io";
import { FaCss3Alt, FaReact, FaGithub, FaCode, FaJsSquare, FaRobot } from "react-icons/fa";
import { LiaNode } from "react-icons/lia";
import { RiNextjsFill } from "react-icons/ri";
import { SiMongodb, SiExpress, SiOpenai, SiGoogle, SiNetlify, SiVercel, SiTailwindcss, SiTypescript } from "react-icons/si";
import { TbBrandVite, TbWind } from "react-icons/tb";


const skills = [
  { id: 1, name: "HTML", desc: "Skills", cat: "skills", icon: <IoLogoHtml5 /> },
  { id: 2, name: "CSS", desc: "Skills", cat: "skills", icon: <FaCss3Alt /> },
  { id: 3, name: "JavaScript", desc: "Skills", cat: "skills", icon: <FaJsSquare /> },
  { id: 38, name: "TypeScript", desc: "Skills", cat: "skills", icon: <SiTypescript /> },
  { id: 4, name: "React", desc: "Skills", cat: "skills", icon: <FaReact /> },
  { id: 5, name: "Next.js", desc: "Skills", cat: "skills", icon: <RiNextjsFill /> },
  { id: 6, name: "Node.js", desc: "Skills", cat: "skills", icon: <LiaNode /> },
  { id: 7, name: "Express", desc: "Skills", cat: "skills", icon: <SiExpress /> },
  { id: 8, name: "MongoDB", desc: "Skills", cat: "skills", icon: <SiMongodb /> },
  { id: 10, name: "Tailwind CSS", desc: "Skills", cat: "skills", icon: <SiTailwindcss /> },
  { id: 11, name: "VS Code", desc: "Tools", cat: "tools", icon: <FaCode /> },
  { id: 12, name: "Vite", desc: "Tools", cat: "tools", icon: <TbBrandVite /> },
  { id: 13, name: "GitHub", desc: "Tools", cat: "tools", icon: <FaGithub /> },
  { id: 14, name: "Vercel", desc: "Tools", cat: "tools", icon: <SiVercel /> },
  { id: 15, name: "Netlify", desc: "Tools", cat: "tools", icon: <SiNetlify /> },
  { id: 16, name: "ChatGPT", desc: "AI", cat: "tools", icon: <SiOpenai /> },
  { id: 17, name: "Gemini", desc: "AI", cat: "tools", icon: <SiGoogle /> },
  { id: 19, name: "Claude", desc: "AI", cat: "tools", icon: <FaRobot /> },
  { id: 20, name: "DeepSeek", desc: "AI", cat: "tools", icon: <FaRobot /> },
  { id: 21, name: "Codex", desc: "AI", cat: "tools", icon: <SiOpenai /> },
  { id: 22, name: "Cursor", desc: "Tools", cat: "tools", icon: <FaCode /> },
  { id: 23, name: "Windsurf", desc: "Tools", cat: "tools", icon: <TbWind /> },
  { id: 24, name: "Antigravity", desc: "Tools", cat: "tools", icon: <FaCode /> },
];

function Dropdown({ value, setValue }) {
  const [open, setOpen] = useState(false);

  const options = [
    { value: "skills", label: "Skills" },
    { value: "tools", label: "Tools" },
  ];

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative w-full md:w-56">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 rounded-xl bg-black border border-white/10 text-white"
      >
        <span>{selected.label}</span>
        <span>⌄</span>
      </button>

      {open && (
        <div className="absolute top-full mt-2 w-full bg-black border border-white/10 rounded-xl overflow-hidden z-50">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                setValue(opt.value);
                setOpen(false);
              }}
              className={`
                px-4 py-3 text-sm cursor-pointer text-white
                ${opt.value === value ? "bg-white/10" : "hover:bg-white/5"}
              `}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Skill() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("skills");
  const [showAll, setShowAll] = useState(false);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1280) setLimit(20);
      else if (w >= 1024) setLimit(15);
      else if (w >= 768) setLimit(12);
      else setLimit(10);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const filtered = useMemo(() => {
    setShowAll(false);
    return skills.filter((s) => {
      const matchCat = s.cat === filter;
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [filter, search]);

  const visible = showAll ? filtered : filtered.slice(0, limit);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">

      <h1 className="text-4xl font-bold text-center mb-8">
        Tech Stack
      </h1>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-3 mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search skills..."
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 outline-none text-white"
        />

        <Dropdown value={filter} setValue={setFilter} />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {visible.map((s) => (
          <div
            key={s.id}
            className="p-4 rounded-xl bg-white/5 border border-white/10
            flex flex-col items-center text-center hover:scale-105 transition"
          >
            <div className="text-3xl text-blue-400 mb-2">
              {s.icon}
            </div>
            <h3 className="text-sm font-semibold">{s.name}</h3>
            <p className="text-xs text-gray-400">{s.desc}</p>
          </div>
        ))}
      </div>

      {filtered.length > limit && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

    </div>
  );
}