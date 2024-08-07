"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import Image from "next/image";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Chart = () => {
  return (
    <div className="px-5 pt-[19px] pb-5 rounded-2xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <p className="text-[#1C1C1C] text-base font-semibold tracking-[-0.36px]">
            Total Orders
          </p>
          <div className="flex justify-center items-center gap-2 bg-[#89D16F] py-1 px-2 text-white rounded-full">
            <span className="text-xs">+ 25%</span>
          </div>
        </div>
      </div>
      <div>
        <Line
          data={{
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
              "",
            ],
            datasets: [
              {
                label: "Users",
                data: [
                  4, 3.5, 1.5, 2.5, 7.5, 5, 7.7, 7.6, 8, 12, 11, 12.5, 11.5,
                ],
                backgroundColor: ["transparent"],
                borderColor: ["#A8C5DA"],
                borderWidth: 3,
                tension: 0.4, // Make the line curved
                pointRadius: 0, // Remove the dots
              },
              {
                label: "Drivers",
                data: [0.9, 2, 1.7, 2.5, 2.7, 3, 5, 6, 6.5, 7.5, 10, 11, 14],
                borderWidth: 3,
                fill: false,
                borderColor: "#F79009",
                tension: 0.4, // Make the line curved
                pointRadius: 0, // Remove the dots
              },
            ],
          }}
          height={230}
          width={200}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false, // Hide the legend
              },
            },
            scales: {
              y: {
                display: true,
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: 15,
                ticks: {
                  stepSize: 5,
                },
              },
              x: {
                grid: {
                  // @ts-ignore
                  drawBorder: false,
                  display: false,
                },
                ticks: {
                  display: true, // Show the months on the x-axis
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
