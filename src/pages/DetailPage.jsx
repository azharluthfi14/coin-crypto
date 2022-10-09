import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCoinDetailsQuery, useGetCoinHistoryQuery } from "../api/coinApi";
import LineChart from "../components/Chart/LineChart";
import millify from "millify";
import Spinner from "../components/Spinner";

const DetailPage = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("1h");
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const { data, isFetching } = useGetCoinDetailsQuery(coinId);
  const { data: coinHistory } = useGetCoinHistoryQuery({
    coinId,
    timeperiod,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const time = ["3h", "24h", "7d", "30d"];

  if (isFetching) return <Spinner />;

  return (
    <>
      <nav className="flex">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <div
              onClick={() => handleBack()}
              className="inline-flex items-center cursor-pointer hover:underline text-sm 
              font-medium text-gray-700 hover:text-violet-500 dark:text-gray-400"
            >
              Home
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                {data?.data?.coin.name}
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <article className="mt-5">
        <div className="flex items-center space-x-3 mb-5 dark:text-gray-400">
          <img className="w-10 h-10" src={data?.data?.coin.iconUrl} alt="" />
          <span className="font-semibold text-lg">{data?.data?.coin.name}</span>
          <span>{data?.data?.coin.symbol}</span>
        </div>

        <div className="bg-white dark:bg-dark-900 dark:text-gray-200 rounded-md">
          <div className="flex items-center mb-2">
            <h1 className="font-normal">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(data?.data?.coin.price)}{" "}
              USD
            </h1>
            <>
              {data?.data?.coin.change < 0 ? (
                <div className="text-2xl font-normal text-red-500 ml-3">
                  {data?.data?.coin.change}%
                </div>
              ) : (
                <div className="text-2xl font-normal text-emerald-500 ml-3">
                  +{data?.data?.coin.change}%
                </div>
              )}
              <span className="font-semibold text-slate-800 dark:text-gray-400 ml-1">
                (24H)
              </span>
            </>
          </div>
          <div className="mb-5">
            <span className="text-slate-800 font-semibold dark:text-gray-200">
              {new Intl.NumberFormat("en-US", {
                currency: "USD",
                maximumSignificantDigits: 4,
                notation: "compact",
              }).format(data?.data?.coin.btcPrice)}{" "}
              BTC
            </span>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <p className="text-sm">
                {data?.data?.coin.name} Price Chart (USD)
              </p>
              <div className="flex items-center space-x-3">
                {time.map((item) => (
                  <button
                    className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
                    type="submit"
                    key={item}
                    value={item}
                    onClick={(e) => setTimeperiod(e.target.value)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3.5">
              <div className="h-fit">
                <LineChart
                  width={350}
                  height={500}
                  datacoin={coinHistory}
                  bdcolor={data?.data?.coin.change < 0 ? "#ff3e3e" : "#22c55e"}
                />
              </div>
              <div className="mt-5 flex space-x-10 items-center">
                <div>
                  <h5 className="font-semibold mb-1 text-sm text-slate-700 dark:text-slate-300">
                    Market Cap (USD)
                  </h5>
                  <span className="font-semibold text-xl ">
                    ${millify(data?.data?.coin.marketCap, { precision: 3 })}
                  </span>
                </div>
                <div>
                  <h5 className="font-semibold mb-1 text-sm text-slate-700 dark:text-slate-300">
                    24H VOLUME (USD)
                  </h5>
                  <span className="font-semibold text-xl">
                    ${millify(data?.data?.coin["24hVolume"], { precision: 3 })}
                  </span>
                </div>
                <div>
                  <h5 className="font-semibold mb-1 text-sm text-slate-700 dark:text-slate-300">
                    Circulating Supply
                  </h5>
                  <span className="font-semibold text-xl">
                    {millify(data?.data?.coin.supply.circulating, {
                      precision: 3,
                    })}{" "}
                    {data?.data?.coin.symbol}
                  </span>
                </div>
                <div>
                  <h5 className="font-semibold mb-1 text-sm text-slate-700 dark:text-slate-300">
                    Max Supply
                  </h5>
                  {data?.data?.coin.supply.max === null ? (
                    <span className="font-semibold text-xl">N/A</span>
                  ) : (
                    <span className="font-semibold text-xl">
                      {millify(data?.data?.coin.supply.max)}{" "}
                      {data?.data?.coin.symbol}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default DetailPage;
