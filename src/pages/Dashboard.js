import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import explorerPlanImage from "../assets/explorerPlan.jpg";
import revertPlanImage from "../assets/revertPlan.jpg";
import existingPlanImage from "../assets/existingPlan.jpg";

const Dashboard = () => {
  const [enrolledPlans, setEnrolledPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledPlans = async () => {
      try {
        // Adjust this URL to match your actual API endpoint
        const response = await axios.get("/api/user-plans", {
          withCredentials: true,
        });
        setEnrolledPlans(response.data.enrolledPlans);
      } catch (error) {
        console.error("Failed to fetch enrolled plans", error);
      }
    };
    fetchEnrolledPlans();
  }, []);

  const planDetails = {
    explorer: {
      name: "Explorer Plan",
      description: "Begin your journey with the basics of Islam.",
      imageUrl: explorerPlanImage,
    },
    revert: {
      name: "Revert Plan",
      description: "Strengthen your new faith with foundational knowledge.",
      imageUrl: revertPlanImage,
    },
    existing: {
      name: "Existing Muslim Plan",
      description: "Deepen your understanding and practice of Islam.",
      imageUrl: existingPlanImage,
    },
  };

  return (
    <div className="bg-[#FFF7E0] p-6">
      <h2 className="text-2xl font-semibold text-[#5C3D2E] mb-4">Your Plans</h2>
      {enrolledPlans.length === 0 ? (
        <p>You are not enrolled in any plans.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrolledPlans.map((planId) => (
            <div
              key={planId}
              className="flex flex-col max-w-sm rounded-md shadow-md overflow-hidden h-full bg-[#C9A567]"
            >
              <img
                src={
                  planDetails[planId]?.imageUrl ||
                  "https://source.unsplash.com/random/300x300/?islamic"
                }
                alt="Plan Image"
                className="object-cover object-center w-full h-48"
              />
              <div className="flex flex-col flex-1 p-4 justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {planDetails[planId]?.name}
                  </h3>
                  <p className="text-white text-opacity-90">
                    {planDetails[planId]?.description}
                  </p>
                </div>
                <button
                  className="mt-4 py-2 px-4 bg-white text-[#C9A567] font-semibold rounded self-center"
                  onClick={() => navigate(`/plans/${planId}`)}
                >
                  Start Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
