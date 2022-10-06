import { Chart, Tooltip } from "chart.js";

Chart.register(Tooltip);

Chart.defaults.plugins.tooltip.titleColor = "#1e293b";
Chart.defaults.plugins.tooltip.bodyColor = "#1e293b";
Chart.defaults.plugins.tooltip.backgroundColor = "#fff";
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.borderColor = "transparent";
Chart.defaults.plugins.tooltip.displayColors = false;
Chart.defaults.plugins.tooltip.mode = "nearest";
Chart.defaults.plugins.tooltip.intersect = false;
Chart.defaults.plugins.tooltip.position = "nearest";
Chart.defaults.plugins.tooltip.caretSize = 0;
Chart.defaults.plugins.tooltip.caretPadding = 20;
Chart.defaults.plugins.tooltip.cornerRadius = 4;
Chart.defaults.plugins.tooltip.padding = 8;

// Register Chart.js plugin to add a bg option for chart area
Chart.register({
  id: "chartAreaPlugin",
  beforeDraw: (chart) => {
    if (
      chart.config.options.chartArea &&
      chart.config.options.chartArea.backgroundColor
    ) {
      const ctx = chart.canvas.getContext("2d");
      const { chartArea } = chart;
      ctx.save();
      ctx.fillStyle = chart.config.options.chartArea.backgroundColor;

      ctx.fillRect(
        chartArea.left,
        chartArea.top,
        chartArea.right - chartArea.left,
        chartArea.bottom - chartArea.top
      );

      ctx.restore();
    }
  },
});
