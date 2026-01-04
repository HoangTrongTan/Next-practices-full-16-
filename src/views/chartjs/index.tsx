"use client";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ChartOptions,
  Tick,
  Plugin,
} from "chart.js";

import { Chart } from "react-chartjs-2";

ChartJs.register({
  // Register necessary components here
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
});

export default function ChartJSPage() {
  const data = {
    // Tạo danh sách nhãn rất dài để gây lỗi chồng lấn
    labels: [
      ["Trạm biến áp", "khu vực miền Bắc 01"],
      ["Trạm biến áp", " khu vực miền Bắc 02"],
      ["Trạm biến áp", " khu vực miền Bắc 03"],
      "Trạm biến áp khu vực miền Bắc 04",
      "Trạm biến áp khu vực miền Bắc 05",
      "Trạm biến áp khu vực miền Bắc 06",
      "Trạm biến áp khu vực miền Bắc 07",
      "Trạm biến áp khu vực miền Bắc 08",
      "Trạm biến áp khu vực miền Bắc 09",
      "Trạm biến áp khu vực miền Bắc 10",
    ],
    datasets: [
      {
        label: "Công suất tiêu thụ (kWh)",
        data: [450, 590, 800, 810, 560, 550, 400, 700, 600, 750],
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions = {
    animation: false,
    scales: {
      x: {
        ticks: {
          padding: 10,
          minRotation: 45,
          autoSkip: false,
          display: false,
          callback: function (value, index, ticks) {
            // console.log("ticks :", ticks);
            const label = this.getLabelForValue(index);
            // Giới hạn độ dài nhãn để tránh chồng lấn
            return "";
          },
        },
      },
    },
  };

  const customLabelPlugin: Plugin = {
    id: "customLabelPlugin",
    afterDatasetsDraw: (chart, args, options) => {
      console.log("chart.getDatasetMeta", chart.getDatasetMeta(0));
      const { ctx, scales: { x, y } } = chart;
      ctx.font = '12px Arial';
      ctx.fillStyle = 'black';

      chart.data.labels?.forEach((label: any, i) => {
        const xPos = x.getPixelForValue(i); // Lấy tọa độ X của cột
        // const yPos = chart.height - 20;    // Tùy chỉnh tọa độ Y theo ý bạn
        const yPos = y.getPixelForValue(i);    // Tùy chỉnh tọa độ Y theo ý bạn
        
        ctx.save();
        ctx.translate(xPos - 150, yPos + 50);
        ctx.rotate(-Math.PI / 4); // Xoay 45 độ nếu muốn
        ctx.fillText(label, 0, 0);
        ctx.restore();
      });
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Khung Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
        {/* Header của Card */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Thống Kê Hệ Thống Van
            </h3>
            <p className="text-sm text-gray-500">
              Dữ liệu cập nhật theo thời gian thực
            </p>
          </div>

          {/* Badge trạng thái */}
          <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
            Hoạt động
          </span>
        </div>

        {/* Khung chứa Chart - Điều chỉnh chiều cao ở đây */}
        <div className="h-[300px] w-full">
          <Chart
            type="bar"
            data={data}
            options={options}
            plugins={[customLabelPlugin]}
          />
        </div>

        {/* Footer của Card (Tùy chọn) */}
        <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end">
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Xem báo cáo chi tiết →
          </button>
        </div>
      </div>
    </div>
  );
}
