import React from "react";

const SkeletonCard = ({ count }) => {
  return [...Array(count).keys()].map((i) => (
    <div key={i} className="bg-white w-full p-3.5 rounded">
      <div className="animate-pulse">
        <div className="flex justify-between items-center mb-5">
          <div className="rounded-full bg-gray-300 h-12 w-12"></div>
          <div className="h-10 w-32 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-3">
          <div className="h-2.5 w-32 bg-gray-300 rounded"></div>
          <div className="h-2.5 w-40 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  ));
};

export default SkeletonCard;
