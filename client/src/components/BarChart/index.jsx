import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-plugin-datalabels'; // Import the plugin
import "./style.css"

const BarGraph = ({ chartData, options }) => {
  // Customize the options for data labels and x-ticks
  const customOptions = {
    ...options,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      datalabels: {
        display: true,
        color: 'black',
        align: 'top', // Position the data labels at the top of each bar
        anchor: 'center', // Center-align the data labels
        font: {
          size: 12,
          weight: 'bold',
        },
        formatter: (value) => value, // Display the data value on top of the bar
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          autoSkip: false,
          font: {
            size:12, // Adjust the font size for x-ticks
            weight: 'bold', // Make x-ticks bold
          },
        },
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={customOptions} />
    </div>
  );
};

export default BarGraph;
