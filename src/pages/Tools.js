import React from "react";
import { useNavigate } from "react-router-dom";

const toolsData = [
  {
    title: "Duas",
    description: "Find duas to reflect how you are feeling",
    imageUrl: "../images/dua_card.png", // Placeholder image, replace with actual path
    link: "https://www.islamestic.com/i-am-feeling/",
  },
  {
    title: "Quran",
    description: "Read and listen to the Quran online.",
    imageUrl: "../images/quran.png", // Placeholder image, replace with actual path
    link: "https://quran.com/en",
  },
  {
    title: "Library",
    description: "Explore a vast library of islamic books",
    imageUrl: "../images/library.jpg", // Placeholder image, replace with actual path
    link: "https://www.kalamullah.com/index.html",
  },
  {
    title: "Dhikr Counter",
    description: "A simple tool to count your Dhikr",
    imageUrl: "/images/dhikr.png", // Placeholder image, replace with actual path
    link: "https://www.tasbih.org/",
  },
];

const Tools = () => {
  return (
    <div className="bg-[#333333] p-6">
      <h2 className="text-4xl font-semibold text-white mb-4">Islamic Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {toolsData.map((tool, index) => (
          <a
            key={index}
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col max-w-md rounded-md shadow-md overflow-hidden h-full cursor-pointer"
          >
            <img
              src={tool.imageUrl}
              alt={tool.title}
              className="object-cover object-center w-full h-48"
            />
            <div className="flex flex-col flex-1 p-4 justify-between bg-[#004080]">
              <h3 className="text-xl font-semibold text-white">{tool.title}</h3>
              <p className="text-white text-opacity-90 mt-2">
                {tool.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Tools;
