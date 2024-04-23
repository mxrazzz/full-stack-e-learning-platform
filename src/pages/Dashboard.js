import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [enrolledPlans, setEnrolledPlans] = useState([]); //store array of plan ids that user is enrolled in
  const navigate = useNavigate();

  useEffect(() => {
    //fetch enrolled plans and makes sure user is authenticated using "withCredentials"
    const fetchEnrolledPlans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user-plans",
          {
            withCredentials: true,
          }
        );
        setEnrolledPlans(response.data.enrolledPlans); //storing the plans here
      } catch (error) {
        console.error("Failed to fetch enrolled plans", error);
      }
    };

    fetchEnrolledPlans();
  }, []);

  // object stores details about each plan in order to display it
  const planDetails = {
    explorer: {
      name: "Explorer Plan",
      description: "Learn & Explore the basics of the religion",
      imageUrl: "images/explorerPlan.png",
    },
    revert: {
      name: "Revert Plan",
      description: "Help start your new life as a Muslim with this plan",
      imageUrl: "images/revertPlan.png",
    },
    existing: {
      name: "Next Steps Plan",
      description: "Go to the next level in your Islamic journey",
      imageUrl: "images/existingPlan.png",
    },
  };

  return (
    <div className="bg-[#FFF7E0] p-6">
      <h2 className="text-2xl font-semibold text-[#5C3D2E] mb-4">Your Plans</h2>
      {enrolledPlans.length === 0 ? ( //if not enrolled in any plans
        <p>You are not enrolled in any plans.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* maps over all the plans and displays it using a card */}
          {enrolledPlans.map((planId) => (
            <div
              key={planId}
              className="flex flex-col max-w-sm rounded-md shadow-md overflow-hidden h-full bg-[#C9A567]"
            >
              <img
                src={planDetails[planId]?.imageUrl}
                alt="Plans"
                className="object-cover object-center w-full h-48"
              />
              <div className="flex flex-col flex-1 p-4 justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {planDetails[planId]?.name}
                  </h3>
                  <p className="text-white text-opacity-85">
                    {planDetails[planId]?.description}
                  </p>
                </div>
                <button
                  className="mt-4 py-2 px-4 bg-white text-[#C9A567] font-semibold rounded self-center"
                  onClick={() => navigate(`/plans/${planId}`)} // navigate to the desired plan to view its modules
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
