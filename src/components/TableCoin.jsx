import { useState, useEffect } from "react";
import SparkLineChart from "./SparkLineChart";
import { useNavigate, redirect } from "react-router-dom";

const calculateRange = (data, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  let i = 1;
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

const useTable = (data, page, rowsPerPage) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice]);

  return { slice, range: tableRange };
};

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className="inline-flex items-center space-x-1">
      {range.map((el, index) => (
        <button
          key={index}
          className={`flex text-sm items-center justify-center rounded w-10 h-10
             border border-gray-300 ${
               page === el
                 ? `bg-violet-500 text-white border-violet-300
                  hover:bg-violet-600`
                 : `text-gray-500 bg-white hover:bg-violet-200`
             }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

const TableCoin = ({ coins = [], rowsPage }) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const { slice, range } = useTable(coins, page, rowsPage);
  const handleNavigate = (coinId) => {
    navigate(`/${coinId}`);
  };

  return (
    <>
      <div className="overflow-x-auto relative w-full rounded-md bg-white">
        <table className="w-full text-left">
          <thead className="text-slate-900 border-b text-sm">
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
        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
        />
      </div>
    </>
  );
};

export default TableCoin;
