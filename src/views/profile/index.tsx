"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data: ChartData<"bar"> = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "Votes",
      data: [12, 19, 3],
      backgroundColor: ["red", "blue", "yellow"],
    },
  ],
};

const options: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Bar chart example" },
  },
};

export default function ChartBar() {
  return <Bar data={data} options={options} />;
}
