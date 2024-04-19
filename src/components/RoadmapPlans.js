import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthModal from "./AuthModal";

const RoadmapPlans = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const handleEnroll = async (planId) => {
    if (!isAuthenticated) {
      openModal();
      return;
    }

    try {
      await axios.post("/api/enroll", { planId }, { withCredentials: true });
      alert(`Successfully enrolled in ${planId} plan.`);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("You are already enrolled in this plan.");
        console.log("Already enrolled");
      } else if (error.response && error.response.status === 401) {
        alert("You need to login to enroll in a plan.");
      } else {
        console.error("Enrollment failed", error);
        alert("An error occurred while trying to enroll. Please try again.");
      }
    }
  };

  return (
    <section
      id="roadmap-plans"
      className="py-6 bg-[#FFF9EC] text-[#5D5D5A] flow-background"
    >
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
          <div className="relative flex flex-col items-center p-8 border rounded-md bg-[#FAF0D7] border-[#E6C300] plan-card">
            <span className="absolute top-0 px-6 pt-1 pb-2 font-medium text-lg rounded-b-lg bg-[#1A365D] text-[#FFFAF0]">
              Explorer Plan
            </span>
            <p className="my-6 text-4xl font-bold text-[#1A365D]">FREE</p>
            <ul className="flex-1 space-y-3">
              <li className="text-md text-[#5D5D5A]">Introduction to Islam</li>
              <li className="text-md text-[#5D5D5A]">
                Addressing Misconceptions
              </li>
              <li className="text-md text-[#5D5D5A]">
                Providing proofs for Islam
              </li>
            </ul>
            <button
              onClick={() => handleEnroll("explorer")}
              className="mt-4 px-4 py-2 text-lg font-semibold uppercase border rounded-lg bg-[#F3D677] text-[#5D5D5A] border-[#E6C300] hover:bg-[#F2E1A1] hover:text-[#5D5D5A]"
            >
              Enroll now
            </button>
          </div>

          {/* Revert Plan */}
          <div className="relative flex flex-col items-center p-8 border rounded-md bg-[#FAF0D7] border-[#E6C300] plan-card">
            <span className="absolute top-0 px-6 pt-1 pb-2 font-medium text-lg rounded-b-lg bg-[#1A365D] text-[#FFFAF0] ">
              Revert Plan
            </span>
            <p className="my-6 text-4xl font-bold text-[#1A365D]">FREE</p>
            <ul className="flex-1 space-y-3">
              <li className="text-md text-[#5D5D5A]">
                Perfect for new Reverts
              </li>
              <li className="text-md text-[#5D5D5A]">Teaching the 5 Pillars</li>
              <li className="text-md text-[#5D5D5A]">
                Living life as a Revert
              </li>
            </ul>
            <button
              onClick={() => handleEnroll("revert")}
              className="mt-4 px-4 py-2 text-lg font-semibold uppercase border rounded-lg bg-[#F3D677] text-[#5D5D5A] border-[#E6C300] hover:bg-[#F2E1A1] hover:text-[#5D5D5A]"
            >
              Enroll now
            </button>
          </div>

          {/* Existing Muslim Plan */}
          <div className="relative flex flex-col items-center p-8 border rounded-md bg-[#FAF0D7] border-[#E6C300] plan-card">
            <span className="absolute top-0 px-6 pt-1 pb-2 font-medium text-lg rounded-b-lg bg-[#1A365D] text-[#FFFAF0]">
              Next Steps Plan
            </span>
            <p className="my-6 text-4xl font-bold text-[#1A365D]">FREE</p>
            <ul className="flex-1 space-y-3">
              <li className="text-md text-[#5D5D5A]">
                Understanding correct Aqeedah
              </li>
              <li className="text-md text-[#5D5D5A]">Learning about Fiqh</li>
              <li className="text-md text-[#5D5D5A]">
                Learning & Mastering Arabic
              </li>
            </ul>
            <button
              onClick={() => handleEnroll("existing")}
              className="mt-4 px-4 py-2 text-lg font-semibold uppercase border rounded-lg bg-[#F3D677] text-[#5D5D5A] border-[#E6C300] hover:bg-[#F2E1A1] hover:text-[#5D5D5A]"
            >
              Enroll now
            </button>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default RoadmapPlans;
