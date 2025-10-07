import React from "react";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
);

interface PortfolioChartProps {
  activeTime: string;
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ activeTime }) => {
  const [chartLabels, setChartLabels] = useState<string[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    fetch("/dummy_json_data/dashboard_json_data/portfolio_data.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedData = data.minutes.find((item: any) => item.timeValue === activeTime);
        if (selectedData && selectedData.labels && selectedData.line) {
          setChartLabels(selectedData.labels);
          setChartData(selectedData.line);
        }
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, [activeTime]);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "line",
        data: chartData,
        borderColor: "#259DA8",
        borderWidth: 2.5,
        fill: false,
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };
  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#FFFFFF7A",
          font: { size: 17, weight: 500 },
        },
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    elements: {
      line: {
        borderJoinStyle: "round" as const,
        capBezierPoints: true,
      },
    },
  };

  return (
    <div className="w-full h-[320px] overflowXAuto">
      <Line data={data} options={options} className="!w-full !h-full min-w-[1000px]" />
    </div>
  );
};

export default PortfolioChart;
