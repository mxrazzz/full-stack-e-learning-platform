import React from "react";
// Ensure you have this CSS file for styling

const RoadmapPlans = () => {
  // Function to handle "Learn More" button click
  const handleLearnMore = (planId) => {
    console.log(`Learn more about: ${planId}`);
    // Here, implement navigation to plan details or a modal popup
  };

  return (
    <section className="py-6 bg-[#FFF9EC] text-[#5D5D5A]">
      <div className="container mx-auto p-4 sm:p-10">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-semibold text-[#1A365D]">
            Choose Your Path
          </h1>
          <p className="mt-4 px-4 sm:px-8 lg:px-24 text-lg text-[#5D5D5A]">
            Explore the different paths to deepen your understanding of Islam.
            Each plan is tailored to accompany you at every stage of your
            journey.
          </p>
        </div>

        <div className="grid max-w-md grid-cols-1 gap-6 mx-auto sm:gap-8 lg:max-w-full lg:grid-cols-3">
          {/* Explorer Plan */}
          <div className="relative flex flex-col items-center p-8 border rounded-md bg-[#FAF0D7] border-[#E6C300]">
            <span className="absolute top-0 px-6 pt-1 pb-2 font-medium text-lg rounded-b-lg bg-[#1A365D] text-[#FFFAF0]">
              Explorer Plan
            </span>
            <p className="my-6 text-4xl font-bold text-[#1A365D]">FREE</p>
            <ul className="flex-1 space-y-3">
              <li className="text-md text-[#5D5D5A]">Introduction to Islam</li>
              <li className="text-md text-[#5D5D5A]">
                Basic Beliefs and Practices
              </li>
              <li className="text-md text-[#5D5D5A]">
                Understanding the Quran
              </li>
            </ul>
            <button
              onClick={() => handleLearnMore("explorer")}
              className="mt-4 px-4 py-2 text-lg font-semibold uppercase border rounded-lg bg-[#F3D677] text-[#5D5D5A] border-[#E6C300] hover:bg-[#F2E1A1] hover:text-[#5D5D5A]"
            >
              Learn More
            </button>
          </div>

          {/* Revert Plan */}
          <div className="relative flex flex-col items-center p-8 border rounded-md bg-[#FAF0D7] border-[#E6C300]">
            <span className="absolute top-0 px-6 pt-1 pb-2 font-medium text-lg rounded-b-lg bg-[#1A365D] text-[#FFFAF0]">
              Revert Plan
            </span>
            <p className="my-6 text-4xl font-bold text-[#1A365D]">FREE</p>
            <ul className="flex-1 space-y-3">
              <li className="text-md text-[#5D5D5A]">Deepening Faith</li>
              <li className="text-md text-[#5D5D5A]">Prayer and Worship</li>
              <li className="text-md text-[#5D5D5A]">Community Integration</li>
            </ul>
            <button
              onClick={() => handleLearnMore("revert")}
              className="mt-4 px-4 py-2 text-lg font-semibold uppercase border rounded-lg bg-[#F3D677] text-[#5D5D5A] border-[#E6C300] hover:bg-[#F2E1A1] hover:text-[#5D5D5A]"
            >
              Learn More
            </button>
          </div>

          {/* Existing Muslim Plan */}
          <div className="relative flex flex-col items-center p-8 border rounded-md bg-[#FAF0D7] border-[#E6C300]">
            <span className="absolute top-0 px-6 pt-1 pb-2 font-medium text-lg rounded-b-lg bg-[#1A365D] text-[#FFFAF0]">
              Existing Muslim Plan
            </span>
            <p className="my-6 text-4xl font-bold text-[#1A365D]">FREE</p>
            <ul className="flex-1 space-y-3">
              <li className="text-md text-[#5D5D5A]">
                Advanced Quranic Studies
              </li>
              <li className="text-md text-[#5D5D5A]">
                Islamic Law and Jurisprudence
              </li>
              <li className="text-md text-[#5D5D5A]">
                Spiritual and Ethical Development
              </li>
            </ul>
            <button
              onClick={() => handleLearnMore("existing")}
              className="mt-4 px-4 py-2 text-lg font-semibold uppercase border rounded-lg bg-[#F3D677] text-[#5D5D5A] border-[#E6C300] hover:bg-[#F2E1A1] hover:text-[#5D5D5A]"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapPlans;
