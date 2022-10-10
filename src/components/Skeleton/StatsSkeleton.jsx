import React from "react";

const StatsSkeleton = () => {
  return (
    <div className="bg-white border-b dark:border-dark-800 dark:bg-dark-900">
      <div className="layout h-12 space-x-7 flex flex-row items-center dark:text-gray-400">
        <div>
          <div className="h-2.5 w-32 bg-gray-300 rounded dark:bg-dark-700"></div>
        </div>
        <div>
          <div className="h-2.5 w-32 bg-gray-300 rounded dark:bg-dark-700"></div>
        </div>
        <div>
          <div className="h-2.5 w-32 bg-gray-300 rounded dark:bg-dark-700"></div>
        </div>
        <div>
          <div className="h-2.5 w-32 bg-gray-300 rounded dark:bg-dark-700"></div>
        </div>
      </div>
    </div>
  );
};

export default StatsSkeleton;
