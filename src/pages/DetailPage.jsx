import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
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

  const coinDetail = data?.data?.coin;

  const handleClick = (e) => {
    setTimeperiod(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const time = ["1h", "3h", "24h", "7d", "30d"];

  const [readMore, setIsReadMore] = useState(true);
  const handleReadMore = () => {
    setIsReadMore(!readMore);
  };

  if (isFetching)
    return (
      <div className="flex w-full justify-center items-center min-h-[500px]">
        <Spinner />
      </div>
    );

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
          <img className="w-10 h-10" src={coinDetail.iconUrl} alt="" />
          <span className="font-semibold text-lg">{coinDetail.name}</span>
          <span>{coinDetail.symbol}</span>
        </div>

        <div className="bg-white p-3 md:p-5 dark:bg-dark-900 dark:text-gray-200 rounded-md">
          <div className="flex items-center mb-2">
            <h1 className="font-normal">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(coinDetail.price)}{" "}
              USD
            </h1>
            <>
              {coinDetail.change < 0 ? (
                <div className="text-2xl font-normal text-red-500 ml-3">
                  {coinDetail.change}%
                </div>
              ) : (
                <div className="text-2xl font-normal text-emerald-500 ml-3">
                  +{coinDetail.change}%
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
              }).format(coinDetail.btcPrice)}{" "}
              BTC
            </span>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">{coinDetail.name} Price Chart (USD)</p>
              </div>

              <div className="block md:hidden">
                <select
                  onChange={(e) => setTimeperiod(e.target.value)}
                  className="bg-white border border-gray-300 dark:bg-dark-800 dark:border-dark-600 dark:text-gray-200 text-gray-900 text-sm 
                rounded-md focus:ring-violet-500 block w-full"
                >
                  {time.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="hidden md:flex items-center space-x-3">
                {time.map((item) => (
                  <button
                    onClick={handleClick}
                    className={`py-2.5 px-5 text-sm font-medium focus:outline-none
                    rounded-lg border
                ${
                  timeperiod === item
                    ? "bg-violet-500 border-violet-500 text-white"
                    : "bg-white hover:bg-violet-500/20 hover:text-violet-500 text-neutral-800 dark:bg-dark-700 dark:border-dark-500 dark:text-gray-200 dark:hover:bg-dark-800"
                }`}
                    type="submit"
                    key={item}
                    value={item}
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
                  bdcolor={coinDetail.change < 0 ? "#ff3e3e" : "#22c55e"}
                />
              </div>
              <div className="mt-5 grid grid-cols-2 md:flex md:flex-row md:space-x-10 gap-5">
                <div>
                  <h5 className="font-semibold mb-1 text-sm text-slate-700 dark:text-slate-300">
                    Market Cap (USD)
                  </h5>
                  <span className="font-semibold text-xl ">
                    $
                    {coinDetail.marketCap &&
                      millify(coinDetail.marketCap, { precision: 3 })}
                  </span>
                </div>
                <div>
                  <h5 className="font-semibold mb-1 text-sm text-slate-700 dark:text-slate-300">
                    24H VOLUME (USD)
                  </h5>
                  <span className="font-semibold text-xl">
                    $
                    {coinDetail["24hVolume"] &&
                      millify(coinDetail["24hVolume"], { precision: 3 })}
                  </span>
                </div>
                <div>
                  <h5 className="font-semibold mb-1 text-sm text-slate-700 dark:text-slate-300">
                    Circulating Supply
                  </h5>
                  <span className="font-semibold text-xl">
                    {coinDetail?.supply.circulating &&
                      millify(coinDetail?.supply.circulating, {
                        precision: 3,
                      })}{" "}
                    {coinDetail.symbol}
                  </span>
                </div>
                <div>
                  <h5 className="font-semibold mb-1 text-sm text-slate-700 dark:text-slate-300">
                    Max Supply
                  </h5>
                  {coinDetail.supply.max === null ? (
                    <span className="font-semibold text-xl">N/A</span>
                  ) : (
                    <span className="font-semibold text-xl">
                      {millify(coinDetail.supply.max)} {coinDetail.symbol}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="bg-white p-8 w-full rounded mt-10  dark:bg-dark-800 ">
        <div className="flex items-center space-x-3 mb-8">
          <h1 className="dark:text-gray-300">About {coinDetail.name}</h1>
          <h5 className="bg-violet-500 py-1 px-3 md:px-5 text-white text-ms whitespace-nowrap font-semibold rounded">
            Rank #{coinDetail.rank}
          </h5>
        </div>
        <div
          className="relative prose prose-slate dark:prose-invert 
      prose-a:text-violet-500 prose-p:w-full max-w-none"
        >
          {HTMLReactParser(
            readMore
              ? coinDetail.description.slice(0, 500)
              : coinDetail.description
          )}
          <div
            className={`${
              readMore
                ? `read-more-box read-more-light dark:read-more-dark`
                : "text-center"
            }`}
          >
            <button
              onClick={handleReadMore}
              className="py-1.5 px-5 rounded-full text-sm text-white bg-violet-500"
            >
              Show {readMore ? "More" : "Less"}
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

export default DetailPage;
