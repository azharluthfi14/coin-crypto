import { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment/moment";

export const formatValue = (value) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 4,
    notation: "compact",
  }).format(value);

const LineChart = ({ coinHistory, currentPrice, width, height }) => {
  const coinPrice = [];

  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  /* for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString("en-US", dateFormat)
    );
  } */

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      moment(coinHistory?.data?.history[i].timestamp * 1000).format("ll")
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "",
        data: coinPrice,
        fill: false,
        backgroundColor:
          "linear-gradient(to top, rgba(255,0,0,0), rgba(255,0,0,1))",
        borderColor: "#0071bd",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: true,
        reverse: true,
      },
      y: {
        display: true,
      },
    },
    interaction: {
      intersect: false,
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
      afterDraw: (chart) => {
        if (chart.tooltip?._active?.length) {
          let x = chart.tooltip._active[0].element.x;
          let yAxis = chart.scales.y;
          let ctx = chart.ctx;
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, yAxis.top);
          ctx.lineTo(x, yAxis.bottom);
          ctx.lineWidth = 1;
          ctx.strokeStyle = "#ff0000";
          ctx.stroke();
          ctx.restore();
        }
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
    <Line width={width} height={height} data={data} options={options}></Line>
  );
};

export default LineChart;
