import React from "react";

const CardSkeleton = ({ count }) => {
  return [...Array(count).keys()].map((i) => (
    <div
      key={i}
      className="bg-white border dark:border-dark-700 w-full p-3.5 rounded dark:bg-dark-800"
    >
      <div className="animate-pulse">
        <div className="flex justify-between items-center mb-5">
          <div className="rounded-full bg-gray-300 h-12 w-12 dark:bg-dark-700"></div>
          <div className="h-10 w-32 bg-gray-300 rounded dark:bg-dark-700"></div>
        </div>
        <div className="space-y-3">
          <div className="h-2.5 w-32 bg-gray-300 rounded dark:bg-dark-700"></div>
          <div className="h-2.5 w-40 bg-gray-300 rounded dark:bg-dark-700"></div>
          <div className="h-2.5 w-48 bg-gray-300 rounded dark:bg-dark-700"></div>
        </div>
      </div>
    </div>
  ));
};

export default CardSkeleton;
