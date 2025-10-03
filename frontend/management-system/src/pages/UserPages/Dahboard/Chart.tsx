import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

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
  const data = {
    labels: [
      'Week 1',
      'Week 2',
      'Week 3',
      'Week 4',
      'Week 5',
      'Week 6',
      'Week 7',
      'Week 8',
      'Week 9',
      'Week 10',
    ],
    datasets: [
      {
        label: 'My Line',
        data: [200000, 300000, 400000, 500000, 600000, 700000, 750000, 770000, 790000, 800000],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 123, 255, 0.2)', 
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: 'Competitor',
        data: [300000, 400000, 500000, 600000, 750000, 850000, 900000, 870000, 950000, 920000],
        borderColor: 'red',
        backgroundColor: 'rgba(255, 99, 132, 0.2)', 
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number | string) {
            if (typeof value === 'number') {
              return `${value / 1000}k`;
            }
            return value;
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
