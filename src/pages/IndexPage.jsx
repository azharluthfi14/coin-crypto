import { useState, useEffect } from "react";
import { Controller, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetCoinsQuery, useGetStableCoinsQuery } from "../api/coinApi";
import CardCoin from "../components/Cards/CardCoin";
import TableSkeleton from "../components/Skeleton/TableSkeleton";
import CardSkeleton from "../components/Skeleton/CardSkeleton";
import TableCrypto from "../components/Table/TableCrypto";
import "swiper/css/scrollbar";

const IndexPage = () => {
  const { data: coinLists, isFetching } = useGetCoinsQuery(80);
  const { data: stableCoin } = useGetStableCoinsQuery(20);
  const [coins, setCoins] = useState();
  const [stable, setStable] = useState();
  const [controlledSwiper, setControlledSwiper] = useState(null);
  useEffect(() => {
    setCoins(coinLists?.data?.coins);
    setStable(stableCoin?.data.coins);
  }, [coinLists, stableCoin]);

  return (
    <>
      <h5 className="mb-3.5 text-xl font-semibold dark:text-gray-200">
        Top Metaverse Tokens
      </h5>
      <Swiper
        modules={[Controller, Autoplay]}
        controller={{ control: controlledSwiper }}
        spaceBetween={15}
        className="mb-6"
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          1024: {
            slidesPerView: 3,
            spaceBetweenSlides: 150,
          },
          768: {
            slidesPerView: 2,
            spaceBetweenSlides: 200,
          },
          640: {
            slidesPerView: 1,
            spaceBetweenSlides: 200,
          },
        }}
      >
        {isFetching ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <CardSkeleton count={3} />
          </div>
        ) : (
          stable?.map((i) => (
            <SwiperSlide key={i.uuid}>
              <CardCoin coin={i} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
      <h5 className="mb-3.5 text-xl font-semibold dark:text-gray-200">
        Today's Cryptocurrency Prices
      </h5>
      <div className="flex flex-col">
        {isFetching ? (
          <TableSkeleton count={10} />
        ) : (
          <TableCrypto data={coins} rowsPerPage={10} />
        )}
      </div>
    </>
  );
};

export default IndexPage;
