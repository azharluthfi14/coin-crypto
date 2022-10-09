import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SparkLineChart from "../Chart/SparkLineChart";
import useTable from "../hooks/useTable";
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
        <div className="overflow-x-auto w-full rounded-lg bg-white dark:bg-dark-800">
          <table className="w-full">
            <thead className="border-b dark:text-gray-400 dark:border-dark-600">
              <tr>
                {tableHeader.map((item, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="px-6 py-4 font-semibold text-sm uppercase"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-dark-600">
              {slice.map((coin) => (
                <tr
                  key={coin.uuid}
                  onClick={() => handleNavigate(coin.uuid)}
                  className="hover:bg-violet-100  
                  font-normal 
                cursor-pointer dark:hover:bg-dark-700 dark:text-gray-400"
                >
                  <td
                    scope="row"
                    className="flex px-6 py-4 whitespace-nowrap items-center space-x-3 dark:text-slate-300 dark:border-slate-500"
                  >
                    <img
                      className="w-8 h-8"
                      src={coin.iconUrl}
                      alt="icon-coin"
                    />
                    <span>
                      {coin.name} - {coin.symbol}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(coin.price)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(coin.marketCap)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(coin["24hVolume"])}
                    </span>
                  </td>
                  <td className="px-20 py-4 whitespace-nowrap justify-center">
                    {coin.change <= 0 ? (
                      <span
                        className="text-xs w-max flex py-1 px-2 items-center font-bold
                     text-red-500 bg-red-100 rounded-full dark:bg-red-500/20"
                      >
                        {coin.change}%
                      </span>
                    ) : (
                      <span
                        className="text-xs w-max flex py-1 px-2 items-center font-bold 
                    text-emerald-500 bg-emerald-100 rounded-full dark:bg-emerald-500/20"
                      >
                        {coin.change}%
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-1">
                    <div className="w-max">
                      <SparkLineChart
                        data={coin.sparkline
                          .filter((v) => !!v)
                          .map((v) => parseFloat(v))}
                        width={200}
                        height={50}
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
        <div className="mt-10 z-30">
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
