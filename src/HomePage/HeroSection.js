import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo.png";

const HeroSection = () => {
  //smooth scrolls to the roadmap section
  const scrollToRoadmapPlans = () => {
    const roadmapPlans = document.getElementById("roadmap-plans");
    if (roadmapPlans) {
      roadmapPlans.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-[#FFF7E0] text-[#5C3D2E]">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <img
            src={logoImage}
            alt="Logo"
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
          />
        </div>
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
            Welcome to
            <span className="text-[#C9A567]"> Path To Islam </span>
          </h1>
          <div className="mt-6 mb-8 text-lg sm:mb-12">
            <p>
              A fully comprehensive islamic site, aimed at making learning
              simple.
            </p>
            <p>
              We offer not only 100% free online learning modules, but a variety
              of other tools to make life easy.
            </p>
            <br className="hidden md:inline lg:hidden" />
          </div>

          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <button
              onClick={scrollToRoadmapPlans}
              className="px-8 py-3 text-lg font-semibold rounded bg-[#D4AF37] text-[#1A365D]"
            >
              Choose a Path now!
            </button>
            <Link
              to="/about"
              className="px-8 py-3 text-lg font-semibold border rounded border-[#C9A567] text-[#5C3D2E]"
            >
              About us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
