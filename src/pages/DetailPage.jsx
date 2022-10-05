import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCoinDetailsQuery, useGetCoinHistoryQuery } from "../api/coinApi";
import LineChart from "../components/LineChart";
import millify from "millify";

const DetailPage = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("1h");
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  const { data, isFetching } = useGetCoinDetailsQuery(coinId);
  const { data: coinHistory } = useGetCoinHistoryQuery({ coinId, timeperiod });
  const coinDetails = data?.data?.coin;
  useEffect(() => {
    console.log(coinDetails);
  });

  return (
    <>
      <nav className="flex">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <div
              onClick={() => handleBack()}
              className="inline-flex items-center cursor-pointer hover:underline text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              All coin
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
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
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
        <div className="flex items-center space-x-3 mb-5">
          <img className="w-10 h-10" src={data?.data?.coin.iconUrl} alt="" />
          <span className="font-semibold text-lg">{data?.data?.coin.name}</span>
          <span>{data?.data?.coin.symbol}</span>
        </div>

        <div className="bg-white p-5 shadow rounded-md">
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
              <span className="font-semibold text-slate-800 ml-1">(24H)</span>
            </>
          </div>
          <div className="mb-5">
            <span className="text-slate-800 font-semibold">
              {new Intl.NumberFormat("en-US", {
                currency: "USD",
                maximumSignificantDigits: 4,
                notation: "compact",
              }).format(data?.data?.coin.btcPrice)}{" "}
              BTC
            </span>
          </div>

          <div>
            <p className="text-sm">{data?.data?.coin.name} Price Chart (USD)</p>

            <div>
              <LineChart
                currentPrice={millify(data?.data?.coin.price)}
                coinHistory={coinHistory}
              />
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default DetailPage;
