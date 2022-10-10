import { useGetCoinsQuery } from "../../api/coinApi";
import StatsSkeleton from "../Skeleton/StatsSkeleton";

const Stats = () => {
  const { data, isFetching } = useGetCoinsQuery(1);
  const info = data?.data?.stats;

  if (isFetching) return <StatsSkeleton />;

  return (
    <div className="bg-white border-b dark:border-dark-800 dark:bg-dark-900">
      <div className="layout text-sm font-semibold h-12 space-x-7 flex flex-row items-center dark:text-gray-400">
        <div>
          Coins : <span className="dark:text-white">{info.totalCoins}</span>
        </div>
        <div>
          Market Cap :{" "}
          <span className="dark:text-white">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(info.totalMarketCap)}{" "}
            USD
          </span>
        </div>
        <div>
          24H Volume :{" "}
          <span className="dark:text-white">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(info.total24hVolume)}{" "}
            USD
          </span>
        </div>
        <div>
          Total Exchanges :{" "}
          <span className="dark:text-white">{info.totalExchanges}</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
