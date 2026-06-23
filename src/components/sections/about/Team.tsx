"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiGithub as Github, FiLinkedin as Linkedin, FiTwitter as Twitter } from "react-icons/fi";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Alex Rivera",
    role: "Chief Executive Officer & Founder",
    bio: "AI strategist with 10+ years of enterprise automation experience.",
    imageUrl: "https://ik.imagekit.io/edfoalImage/assets/image/service1.jpg",
    links: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "Dr. Sarah Chen",
    role: "Head of AI Research",
    bio: "Former research lead at top AI labs specializing in custom RAG pipelines.",
    imageUrl: "https://ik.imagekit.io/edfoalImage/assets/image/service2.jpg",
    links: { linkedin: "#", github: "#" },
  },
  {
    name: "Marcus Vance",
    role: "Director of Enterprise Engineering",
    bio: "Specialist in high-performance cloud infrastructure and agent orchestration.",
    imageUrl: "https://ik.imagekit.io/edfoalImage/assets/image/service3.jpg",
    links: { linkedin: "#", twitter: "#", github: "#" },
  },
];

export default function Team() {
  return (
    <section className="relative w-full bg-white py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] text-blue-600 uppercase mb-4 block">
            Our Team
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
            The Minds Behind EdFoal
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group bg-zinc-50/80 backdrop-blur-md rounded-3xl p-6 border border-zinc-200/80 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/50 transition-all flex flex-col items-center text-center"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden mb-6 border border-zinc-200 bg-zinc-100">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h3 className="text-lg font-bold text-zinc-900 mb-1">{member.name}</h3>
              <p className="text-xs text-blue-600 font-semibold mb-3">{member.role}</p>
              <p className="text-zinc-600 text-sm leading-relaxed mb-6 font-normal max-w-xs">{member.bio}</p>

              <div className="flex gap-4">
                {member.links.linkedin && (
                  <a href={member.links.linkedin} className="text-zinc-400 hover:text-zinc-800 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.links.twitter && (
                  <a href={member.links.twitter} className="text-zinc-400 hover:text-zinc-800 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {member.links.github && (
                  <a href={member.links.github} className="text-zinc-400 hover:text-zinc-800 transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
