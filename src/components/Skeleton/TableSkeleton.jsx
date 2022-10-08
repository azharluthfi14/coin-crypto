import React from "react";

const TableSkeleton = ({ count }) => {
  return (
    <>
      <div className="overflow-x-auto relative w-full rounded-md bg-white">
        <table className="w-full text-left animate-pulse">
          <thead className="border-b text-sm">
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
          <tbody>
            {Array(10)
              .fill()
              .map((item, i) => (
                <tr key={i} className="text-sm items-center cursor-loading">
                  <th
                    scope="row"
                    className="flex items-center border-b space-x-3 p-4"
                  >
                    <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                    <div className="h-3 w-20 bg-gray-300 rounded"></div>
                  </th>
                  <td className="py-1 px-6 border-b">
                    <div className="h-3 w-28 bg-gray-300 rounded"></div>
                  </td>
                  <td className="py-1 px-6 border-b">
                    <div className="h-3 w-28 bg-gray-300 rounded"></div>
                  </td>
                  <td className="py-1 px-6 border-b">
                    <div className="h-3 w-28 bg-gray-300 rounded"></div>
                  </td>
                  <td className="py-1 px-6 border-b">
                    <div className="h-3 w-28 bg-gray-300 rounded"></div>
                  </td>
                  <td className="py-1 px-6 border-b">
                    <div className="h-3 w-28 bg-gray-300 rounded"></div>
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
