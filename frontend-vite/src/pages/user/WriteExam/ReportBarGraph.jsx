import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportBarGraph = ({ result }) => {
  // Data for the bar graph
  const data = {
    labels: ['Technical Skills', 'Human Skills', 'Conceptual Skills'],
    datasets: [
      {
        label: 'Marks',
        data: [result.technical, result.human, result.conceptual],
        backgroundColor: ['#1890ff', '#73d13d', '#ffa940'],
        borderColor: ['#1890ff', '#73d13d', '#ffa940'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow height adjustment
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Skills Marks Bar Graph',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Skills',
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 20, // Set the maximum value to 20
        ticks: {
          stepSize: 2, // Define a smaller step size for better readability
        },
        title: {
          display: true,
          text: 'Marks',
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
    },
  };

  return (
    <div style={{ height: '400px' }}> {/* Adjust the container height as needed */}
      <h2 className="text-md">Skills Marks Bar Graph</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ReportBarGraph;
