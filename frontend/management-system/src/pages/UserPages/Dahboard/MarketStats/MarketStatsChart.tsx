import React, { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend
);

const LineChart: React.FC = () => {
  const chartRef = useRef<any>(null);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetch("/dummy_json_data/dashboard_json_data/MarketStats.json")
      .then((response) => response.json())
      .then((data) => setChartData(data))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current;
    if (!chart || !chart.ctx) return;

    const ctx = chart.ctx;
    const gradient1 = ctx.createLinearGradient(0, 0, 0, 300);
    gradient1.addColorStop(0, "rgba(255, 171, 45, 0.4)");
    gradient1.addColorStop(1, "rgba(255, 171, 45, 0.0)");

    const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
    gradient2.addColorStop(0, "rgba(0, 173, 163, 0.4)");
    gradient2.addColorStop(1, "rgba(0, 173, 163, 0.0)");

    if (chart.data.datasets[0])
      chart.data.datasets[0].backgroundColor = gradient1;
    if (chart.data.datasets[1])
      chart.data.datasets[1].backgroundColor = gradient2;
    chart.update();
  }, [chartData]);

  const data = chartData
    ? {
        labels: chartData.labels,
        datasets: [
          {
            label: "line1",
            data: chartData.line1,
            borderColor: "#FFAB2D",
            fill: true,
            borderWidth: 4,
            pointRadius: 0,
            stepped: false,
            tension: 0.5,
            borderCapStyle: "round" as const,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "#FFAB2D",
            pointHoverBorderColor: "#283573",
            pointHoverBorderWidth: 4,
          },
          {
            label: "line2",
            data: chartData.line2,
            borderColor: "#00ADA3",
            fill: true,
            borderWidth: 4,
            pointRadius: 0,
            stepped: false,
            tension: 0.5,
            borderCapStyle: "round" as const,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "#00ADA3",
            pointHoverBorderColor: "#283573",
            pointHoverBorderWidth: 4,
          },
        ],
      }
    : { labels: [], datasets: [] };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1f1f3d",
        titleColor: "#fff",
        bodyColor: "#fff",
        displayColors: false,
        padding: 12,
        cornerRadius: 8,
        yAlign: "bottom",
        callbacks: {
          label: (context: any) => `$${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(255,255,255,0.05)" },
        ticks: { color: "white", font: { size: 14, weight: 500 } },
      },
      y: {
        beginAtZero: true,
        max: 800000,
        ticks: {
          color: "white",
          font: { size: 14, weight: 500 },
          stepSize: 200000,
          callback: (tickValue: number | string) =>
            typeof tickValue === "number" ? `${tickValue / 1000}k` : tickValue,
        },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
    elements: {
      line: {
        borderJoinStyle: "round",
        capBezierPoints: true,
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
  };

  return (
    <div className="w-full h-[320px] font-poppins overflowXAuto">
      <Line
        ref={chartRef}
        data={data}
        options={options}
        className="!w-full !h-full min-w-[1000px]"
      />
    </div>
  );
};

export default LineChart;
