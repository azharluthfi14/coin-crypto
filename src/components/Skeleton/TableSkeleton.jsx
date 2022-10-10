import React from "react";

const TableSkeleton = ({ count }) => {
  return (
    <>
      <div className="overflow-x-auto h-full relative w-full rounded-md bg-white dark:bg-dark-800">
        <table className="w-full text-left animate-pulse">
          <thead className="border-b dark:text-gray-400 dark:border-dark-600">
            <tr>
              <th scope="col" className="py-5 px-7">
                Name
              </th>
              <th scope="col" className="py-5 px-7">
                Price
              </th>
              <th scope="col" className="py-5 px-7">
                Market Cap
              </th>
              <th scope="col" className="py-5 px-7">
                24 Hours Volume
              </th>
              <th scope="col" className="py-5 px-7">
                24 Hours Change
              </th>
              <th scope="col" className="py-5 px-7">
                Chart
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-dark-600">
            {[...Array(count).keys()].map((index) => (
              <tr key={index} className="cursor-wait">
                <td
                  scope="row"
                  className="flex px-6 py-4 whitespace-nowrap items-center space-x-3 dark:text-slate-300 dark:border-slate-500"
                >
                  <div className="rounded-full bg-gray-300 h-10 w-10 dark:bg-dark-700"></div>
                  <div className="h-3 w-20 bg-gray-300 rounded dark:bg-dark-700"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-3 w-28 bg-gray-300 rounded dark:bg-dark-700"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-3 w-28 bg-gray-300 rounded dark:bg-dark-700"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-3 w-28 bg-gray-300 rounded dark:bg-dark-700"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-3 w-28 bg-gray-300 rounded dark:bg-dark-700"></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-3 w-28 bg-gray-300 rounded dark:bg-dark-700"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableSkeleton;
