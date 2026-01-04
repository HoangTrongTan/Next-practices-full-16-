import { render, screen } from "@testing-library/react";
import ChartJSPage from "../index";
import "@testing-library/jest-dom";

// 1. Mock module react-chartjs-2
// Mock là tạo ra một phiên bản giả của một thư viện hoặc module.
// Vấn đề: Thư viện react-chartjs-2 và Chart.js rất phức tạp. Nó cần một môi trường trình duyệt thật để vẽ lên thẻ <canvas>.
// Trong môi trường Test (Jest), chúng ta không có trình duyệt thật, nên nếu chạy code thật,
// nó sẽ báo lỗi: "Canvas is not supported".
// Giải pháp: Mock giúp "đánh lừa" ứng dụng. Thay vì chạy logic vẽ đồ thị thật sự,
// nó chỉ chạy một đoạn code giả đơn giản mà Jest có thể hiểu được.
jest.mock("react-chartjs-2", () => ({
  // Trong file code của bạn, bạn dùng component tên là <Chart />:
  // bạn đang nói với Jest rằng: "Khi nào thấy component <Chart /> trong code,
  // đừng dùng cái của thư viện nữa, hãy dùng cái 'hàng giả' mà tôi định nghĩa ở đây nè."
  Chart: ({ data, options, plugins }: any) => (
    <div data-testid="mock-chart">
      <span data-testid="chart-label-count">{data.labels.length}</span>
      {/* Để kiểm tra dữ liệu đầu vào: Bạn không thể nhìn vào một cái hình vẽ (canvas) để biết nó có 10 cột hay không. 
      Nhưng bạn có thể nhìn vào thẻ <span> này để xem số 10 có xuất hiện không. */}
      <span data-testid="chart-dataset-label">{data.datasets[0].label}</span>
    </div>
    // data-testid: Đây là một thuộc tính định danh dành riêng cho việc Testing.4
    // Lợi ích: data-testid giúp thư viện React Testing Library tìm đúng phần tử 
    // trong DOM một cách chính xác và bền vững bằng lệnh: screen.getByTestId("mock-chart").
  ),
}));

describe("ChartJSPage Component", () => {
  // Test 1: Kiểm tra Render cơ bản
  it("nên hiển thị tiêu đề chính của biểu đồ", () => {
    render(<ChartJSPage />);
    const title = screen.getByText(/Thống Kê Hệ Thống Van/i);
    expect(title).toBeInTheDocument();
  });

  // Test 2: Kiểm tra Badge trạng thái
  it("nên hiển thị badge trạng thái Hoạt động", () => {
    render(<ChartJSPage />);
    const statusBadge = screen.getByText("Hoạt động");
    expect(statusBadge).toBeInTheDocument();
    expect(statusBadge).toHaveClass("bg-green-100");
  });

  // Test 3: Kiểm tra dữ liệu được truyền vào Chart
  it("nên truyền đúng 10 nhãn dữ liệu vào biểu đồ", () => {
    render(<ChartJSPage />);
    const labelCount = screen.getByTestId("chart-label-count");
    expect(labelCount.textContent).toBe("10");
  });

  it("nên hiển thị đúng tên Dataset", () => {
    render(<ChartJSPage />);
    const datasetLabel = screen.getByTestId("chart-dataset-label");
    expect(datasetLabel.textContent).toBe("Công suất tiêu thụ (kWh)");
  });

  // Test 4: Kiểm tra nút bấm xem báo cáo
  it("nên có nút xem báo cáo chi tiết", () => {
    render(<ChartJSPage />);
    const button = screen.getByRole("button", {
      name: /xem báo cáo chi tiết/i,
    });
    expect(button).toBeInTheDocument();
  });
});
