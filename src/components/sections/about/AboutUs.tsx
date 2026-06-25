'use client'

import React from "react";
import { RobotHero } from "@/components/ui/RobotHero";

export default function AboutUs() {
  return (
    <RobotHero
      id="about-us"
      title={
        <>
          About Us
          <br />
          <span className="text-xl md:text-3xl text-neutral-300 font-semibold mt-2 block">
            Get to Know EdFoal
          </span>
        </>
      }
      subtitle="We’re transforming businesses with custom AI solutions that drive efficiency, innovation, and growth. Let’s unlock your potential with AI built just for you."
    />
  );
}
