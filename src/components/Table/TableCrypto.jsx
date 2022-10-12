import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import millify from "millify";
import SparkLineChart from "../Chart/SparkLineChart";
import useTable from "../../hooks/useTable";
import TablePagination from "./TablePagination";

const TableCrypto = ({ data = [], rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  const navigate = useNavigate();

  const tableHeader = [
    "Name",
    "Price",
    "Market Cap",
    "24 Hours Volume",
    "24 Hours Change",
    "Chart",
  ];

  const handleNavigate = (coinId) => {
    navigate(`/${coinId}`);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto overflow-y-hidden w-full rounded-lg bg-white dark:bg-dark-800">
          <table className="w-full table-auto min-w-max">
            <thead className="border-b font-semibold text-xs md:text-base whitespace-nowrap uppercase dark:text-gray-400 dark:border-dark-600">
              <tr className="text-center">
                <th className=" py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-center">Price</th>
                <th className=" py-3 px-6 text-center">Market Cap</th>
                <th className=" py-3 px-6 text-center">24 Hours Volume</th>
                <th className=" py-3 px-6 text-center">24 Hours Change</th>
                <th className="hidden relative lg:inline-flex lg:p-3 w-full">
                  <span className="m-auto">Chart</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-600">
              {slice.map((coin) => (
                <tr
                  key={coin.uuid}
                  onClick={() => handleNavigate(coin.uuid)}
                  className="hover:bg-violet-100 w-full font-normal cursor-pointer 
                  dark:hover:bg-dark-700 dark:text-gray-400"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <img
                          className="w-4 h-4 md:w-8 md:h-8"
                          src={coin.iconUrl}
                          alt="icon-coin"
                        />
                      </div>
                      <div className="">
                        <span className="hidden lg:inline">{coin.name} - </span>
                        <span> {coin.symbol}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span>${millify(coin.price, { precision: 3 })}</span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span>${millify(coin.marketCap, { precision: 7 })}</span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <span>${millify(coin["24hVolume"], { precision: 7 })}</span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    {coin.change <= 0 ? (
                      <span
                        className="text-xs w-max py-1 px-2 font-bold
                     text-red-500 bg-red-100 rounded-full dark:bg-red-500/20"
                      >
                        {coin.change}%
                      </span>
                    ) : (
                      <span
                        className="text-xs w-max py-1 px-2   font-bold 
                    text-emerald-500 bg-emerald-100 rounded-full dark:bg-emerald-500/20"
                      >
                        {coin.change}%
                      </span>
                    )}
                  </td>
                  <td className="hidden lg:flex py-3">
                    <div className="relative m-auto h-[9vh] w-[12vw]">
                      <SparkLineChart
                        data={coin.sparkline
                          .filter((v) => !!v)
                          .map((v) => parseFloat(v))}
                        width={180}
                        height={70}
                        statusBg={
                          coin.change <= 0 ? "transparent" : "transparent"
                        }
                        statusBd={coin.change <= 0 ? "#ef4444" : "#22c55e"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-7 text-center">
          <TablePagination
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
          />
        </div>
      </div>
    </>
  );
};

export default TableCrypto;
