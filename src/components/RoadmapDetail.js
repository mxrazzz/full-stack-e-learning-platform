import React from "react";
import { useParams } from "react-router-dom";

const RoadmapDetail = () => {
  let { planId } = useParams();

  // Here, you'd fetch or determine the details of the plan based on planId
  return (
    <div>
      <h2>Detail for: {planId}</h2>
      {/* Display detailed information here */}
    </div>
  );
};

export default RoadmapDetail;
