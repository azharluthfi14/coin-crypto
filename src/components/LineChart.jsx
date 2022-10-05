import { useRef, useEffect } from "react";
import {
  Chart,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  CategoryScale,
} from "chart.js";
Chart.register(
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  CategoryScale
);

export const formatValue = (value) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 4,
    notation: "compact",
  }).format(value);

const LineChart = ({ coinHistory, currentPrice }) => {
  const coinPrice = [];
  const canvas = useRef(null);
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  useEffect(() => {
    const ctx = canvas.current;

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: coinTimestamp,
        datasets: [
          {
            data: coinPrice,
            backgroundColor: "#0071bd",
            borderColor: "#0071bd",
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
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
      },
      interaction: {
        intersect: false,
        mode: "nearest",
      },
      maintainAspectRatio: true,
      resizeDelay: 200,
    });
    return () => chart.destroy();
  });

  return <canvas ref={canvas} data={coinPrice}></canvas>;
};

export default LineChart;
