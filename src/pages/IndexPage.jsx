import { useState, useEffect } from "react";
import { useGetCoinsQuery } from "../api/coinApi";
import CardCoin from "../components/Cards/CardCoin";
import TableCoin from "../components/TableCoin";
import TableSkeleton from "../components/Skeleton/TableSkeleton";
import TableCrypto from "../components/Table/TableCrypto";

const IndexPage = () => {
  const { data: coinLists, isFetching } = useGetCoinsQuery(80);
  const [coins, setCoins] = useState();

  useEffect(() => {
    setCoins(coinLists?.data?.coins);
  }, [coinLists]);

  return (
    <>
      <h5 className="mb-3.5 text-xl font-semibold">Top Metaverse Tokens</h5>
      <div className="grid grid-rows-1 md:grid-cols-4 gap-3 mb-10">
        <CardCoin />
      </div>
      <h5 className="mb-3.5 text-xl font-semibold">
        Today's Cryptocurrency Prices
      </h5>
      <div className="flex flex-col">
        {isFetching ? (
          <TableSkeleton />
        ) : (
          <TableCrypto data={coins} rowsPerPage={10} />
        )}
      </div>
    </>
  );
};

export default IndexPage;
