import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCoinsQuery } from "../api/coinApi";
import SparkLineChart from "../components/SparkLineChart";
import Spinner from "../components/Spinner";

const IndexPage = () => {
  const { data: coinLists, isFetching } = useGetCoinsQuery(20);
  const [coins, setCoins] = useState();
  const navigate = useNavigate();

  const handleNavigate = (coinId) => {
    navigate(`/${coinId}`);
  };

  useEffect(() => {
    setCoins(coinLists?.data?.coins);
  }, [coinLists]);

  if (isFetching) return <Spinner />;

  return (
    <>
      <h4 className="mb-5">Today's Cryptocurrency Prices</h4>
      <div className="flex items-center justify-center">
        <div className="overflow-x-auto relative w-full rounded-md shadow bg-white">
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
              {coins?.map((coin) => (
                <tr
                  key={coin.uuid}
                  onClick={() => handleNavigate(coin.uuid)}
                  className="hover:bg-gray-100 text-sm items-center cursor-pointer"
                >
                  <th
                    scope="row"
                    className="flex items-center border-b space-x-3 p-4"
                  >
                    <img className="w-8 h-8" src={coin.iconUrl} alt="" />
                    <span>
                      {coin.name} - {coin.symbol}
                    </span>
                  </th>
                  <td className="py-1 px-6 border-b">
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
                        statusBg={
                          coin.change < 0 ? "transparent" : "transparent"
                        }
                        statusBd={coin.change < 0 ? "#ef4444" : "#22c55e"}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
