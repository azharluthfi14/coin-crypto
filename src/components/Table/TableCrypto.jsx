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
      <div className="overflow-x-auto relative w-full rounded-md bg-white">
        <table className="w-full text-left">
          <thead className="text-slate-900 border-b text-sm">
            <tr>
              {tableHeader.map((item, i) => (
                <th key={i} scope="col" className="py-5 px-7">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.map((coin) => (
              <tr
                key={coin.uuid}
                onClick={() => handleNavigate(coin.uuid)}
                className="hover:bg-violet-100 font-semibold text-neutral-700 text-sm items-center cursor-pointer"
              >
                <th
                  scope="row"
                  className="flex items-center border-b  space-x-3 p-4"
                >
                  <img className="w-8 h-8" src={coin.iconUrl} alt="" />
                  <span>
                    {coin.name} - {coin.symbol}
                  </span>
                </th>
                <td className="py-1 px-6  border-b">
                  <span>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(coin.price)}
                  </span>
                </td>
                <td className="py-1 px-6 border-b">
                  <span>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(coin.marketCap)}
                  </span>
                </td>
                <td className="py-1 px-6 border-b">
                  <span>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(coin["24hVolume"])}
                  </span>
                </td>
                <td className="py-1 px-6 border-b">
                  {coin.change < 0 ? (
                    <div className="text-xs w-max flex flex-row items-center font-bold text-red-500 bg-red-100 py-1 px-2 rounded-full ml-3">
                      {coin.change}%
                    </div>
                  ) : (
                    <div className="text-xs w-max flex flex-row items-center font-bold text-emerald-500 bg-emerald-100 py-1 px-2  rounded-full ml-3">
                      +{coin.change}%
                    </div>
                  )}
                </td>
                <td className="py-1 border-b">
                  <div className="w-max">
                    <SparkLineChart
                      data={coin.sparkline
                        .filter((v) => !!v)
                        .map((v) => parseFloat(v))}
                      width={200}
                      height={55}
                      statusBg={coin.change < 0 ? "transparent" : "transparent"}
                      statusBd={coin.change < 0 ? "#ef4444" : "#22c55e"}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 justify-center flex">
        <TablePagination
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
        />
      </div>
    </>
  );
};

export default TableCrypto;
