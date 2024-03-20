// PlanPage.js

import React from "react";
import { useParams } from "react-router-dom";

const PlanPage = () => {
  let { planId } = useParams();

  // Fetch plan details based on planId or use planId to determine what to display
  // For example, you can have an object similar to planDetails in Dashboard and use planId to display the correct plan

  return (
    <div>
      <h2>Plan Page for {planId}</h2>
      {/* Render plan details based on planId */}
    </div>
  );
};

export default PlanPage;
