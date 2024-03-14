import React from "react";
import logoImage from "../assets/logo.png";

const HeroSection = () => {
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
          <p className="mt-6 mb-8 text-lg sm:mb-12">
            We make learning about Islam simple
            <br className="hidden md:inline lg:hidden" />
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-8 py-3 text-lg font-semibold rounded bg-[#D4AF37] text-[#1A365D]"
            >
              Choose a Path now!
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-8 py-3 text-lg font-semibold border rounded border-[#C9A567] text-[#5C3D2E]"
            >
              About us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
