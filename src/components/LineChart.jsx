import { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";

export const formatValue = (value) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 4,
    notation: "compact",
  }).format(value);

const LineChart = ({ coinHistory, currentPrice, width, height }) => {
  const coinPrice = [];
  const canvas = useRef(null);
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: function () {}, // Disable tooltip title
          label: (context) => formatValue(context.parsed.y),
        },
      },
      legend: {
        display: false,
      },
    },
  };

  //   useEffect(() => {
  //     const ctx = canvas.current;

  //     const chart = new Chart(ctx, {
  //       type: "line",
  //       data: {
  //         labels: coinTimestamp,
  //         datasets: [
  //           {
  //             data: coinPrice,
  //             backgroundColor: "#0071bd",
  //             borderColor: "#0071bd",
  //             fill: false,
  //           },
  //         ],
  //       },
  //       options: {
  //         scales: {
  //           x: {
  //             display: false,
  //           },
  //           y: {
  //             display: coinTimestamp,
  //           },
  //         },
  //         plugins: {
  //           tooltip: {
  //             callbacks: {
  //               title: function () {}, // Disable tooltip title
  //               label: (context) => formatValue(context.parsed.y),
  //             },
  //           },
  //           legend: {
  //             display: false,
  //           },
  //         },
  //       },
  //       interaction: {
  //         intersect: false,
  //         mode: "nearest",
  //       },
  //       maintainAspectRatio: true,
  //       resizeDelay: 10,
  //     });
  //     return () => chart.destroy();
  //   });

  return (
    <Line
      ref={canvas}
      width={width}
      height={height}
      data={data}
      options={options}
    ></Line>
  );
};

export default LineChart;
