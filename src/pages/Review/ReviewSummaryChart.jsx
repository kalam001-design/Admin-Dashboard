import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ReviewSummaryChart = ({ reviews }) => {
  // স্ট্যাটাস গুলো ক্যালকুলেট করছি
  const approvedCount = reviews.filter(r => r.status === "Approved").length;
  const pendingCount = reviews.filter(r => r.status === "Pending").length;

  const data = {
    labels: ["অনুমোদিত", "অপেক্ষমান"],
    datasets: [
      {
        label: "রিভিউ সংখ্যা",
        data: [approvedCount, pendingCount],
        backgroundColor: ["#198754", "#ffc107"], // সবুজ ও হলুদ
        hoverBackgroundColor: ["#145c32", "#cc9a06"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h4 className="mb-3 text-center">রিভিউ স্ট্যাটাস সারাংশ</h4>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ReviewSummaryChart;
