import { useRef, useEffect } from "react";
import {
  Chart,
  LineController,
  LinearScale,
  TimeScale,
  Filler,
  Tooltip,
  LineElement,
  TimeSeriesScale,
  CategoryScale,
} from "chart.js";
import moment from "moment";

Chart.register(
  TimeScale,
  LinearScale,
  LineController,
  Tooltip,
  Filler,
  TimeSeriesScale,
  CategoryScale,
  LineElement
);

const LineChartCoin = ({ datacoin, width, height }) => {
  const canvas = useRef(null);
  let coinPrice = [];
  let coinTimestamp = [];

  for (let index = 0; index < datacoin?.data?.history?.length; index += 1) {
    coinPrice.push(datacoin?.data?.history[index].price);
  }

  for (let index = 0; index < datacoin?.data?.history?.length; index += 1) {
    coinTimestamp.push(
      moment(datacoin?.data?.history[index].timestamp * 1000).format("ll")
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
            tension: 0.1,
            label: "",
            pointRadius: 0,
            borderColor: "#1199fa",
            borderWidth: 1.7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        chartArea: {
          backgroundColor: false,
        },
        scales: {
          x: {
            reverse: true,
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              autoSkipPadding: 48,
              maxRotation: 0,
            },
          },
          y: {
            display: true,
          },
        },
        layout: {
          padding: 30,
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: function () {}, // Disable tooltip title
              //   label: (context) => formatValue(context.parsed.y),
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
    });
    return () => chart.destroy();
  }, [datacoin]);

  return (
    <canvas
      ref={canvas}
      datacoin={datacoin}
      width={width}
      height={height}
    ></canvas>
  );
};

export default LineChartCoin;
