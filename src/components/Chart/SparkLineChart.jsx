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
import "chartjs-adapter-moment";

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

const SparkLineChart = ({ data = [], width, height, statusBg, statusBd }) => {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data,
        datasets: [
          {
            data: data,
            fill: true,
            backgroundColor: statusBg,
            borderColor: statusBd,
            borderWidth: 2,
            tension: 0,
            pointRadius: 0,
            pointBackgroundColor: "rgb(22, 22, 22)",
            pointHoverRadius: 3,
            clip: 20,
          },
        ],
      },
      options: {
        chartArea: {
          backgroundColor: "transparent",
        },
        layout: {
          padding: 0,
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
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

  return <canvas ref={canvas} width={width} height={height}></canvas>;
};

export default SparkLineChart;
