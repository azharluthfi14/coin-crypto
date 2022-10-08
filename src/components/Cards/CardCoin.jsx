import { useState, useEffect } from "react";
import { useGetStableCoinsQuery } from "../../api/coinApi";
import { useNavigate } from "react-router-dom";
import SparkLineChart from "../Chart/SparkLineChart";
import CardSkeleton from "../Skeleton/CardSkeleton";

const CardCoin = () => {
  const { data: coinLists, isFetching } = useGetStableCoinsQuery(4);
  const [coins, setCoins] = useState();
  const navigate = useNavigate();

  const handleNavigate = (coinId) => {
    navigate(`/${coinId}`);
  };

  useEffect(() => {
    setCoins(coinLists?.data?.coins);
  }, [coinLists]);

  if (isFetching) return <CardSkeleton count={4} />;

  return (
    <>
      {coins?.map((coin) => (
        <div
          onClick={() => handleNavigate(coin.uuid)}
          key={coin.uuid}
          className="bg-white p-3.5 rounded cursor-pointer"
        >
          <div className="flex justify-between items-center">
            <div>
              <img className="w-9 h-9" src={coin.iconUrl} alt="" />
            </div>
            <div className="w-4/12 h-14">
              <SparkLineChart
                data={coin.sparkline
                  .filter((v) => !!v)
                  .map((v) => parseFloat(v))}
                width={200}
                height={100}
                statusBg={coin.change < 0 ? "transparent" : "transparent"}
                statusBd={coin.change < 0 ? "#ef4444" : "#22c55e"}
              />
            </div>
          </div>
          <div className="mt-3.5">
            <span className="font-semibold">
              {coin.name} - {coin.symbol}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-xl">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(coin.price)}
            </span>
            {coin.change < 0 ? (
              <div className="text-xs w-max flex flex-row items-center font-bold text-red-500 bg-red-100 py-1 px-2 rounded-full ml-3">
                {coin.change}%
              </div>
            ) : (
              <div className="text-xs w-max flex flex-row items-center font-bold text-emerald-500 bg-emerald-100 py-1 px-2  rounded-full ml-3">
                +{coin.change}%
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default CardCoin;
