import { fireEvent, render, screen } from "@testing-library/react";
import KonvaJSPage from "../index";
import "@testing-library/jest-dom";

// test ci/cd on branches main

// Tạo một đối tượng lưu trữ các hàm giả bên ngoài để tiện kiểm tra
const mockActions = {
  opacity: jest.fn(),
  x: jest.fn(() => 100),
  y: jest.fn(() => 200),
};

jest.mock("react-konva", () => ({
  Stage: ({ width, height, children }: any) => (
    <div data-testid="stage-mock-konva" data-width={width} data-height={height}>
      {children}
    </div>
  ),
  Layer: ({ children }: any) => <div data-testid="layer">{children}</div>,
  Rect: () => <div data-testid="konva-rect" />,
  Circle: () => <div data-testid="konva-circle" />,
  Text: ({ text }: any) => <div>{text}</div>,
  Path: ({ data, fill, stroke, strokeWidth, draggable }: any) => (
    <div
      data-testid="path-mock-konva"
      data-data={data}
      data-fill={fill}
      data-stroke={stroke}
      data-stroke-width={strokeWidth}
      data-draggable={draggable}
    ></div>
  ),
  Group: ({ children, onDragStart, onDragEnd }: any) => (
    <div
      data-testid="group-mock-konva"
      onMouseDown={(e) =>
        onDragStart?.({
          target: {
            opacity: mockActions.opacity,
          },
        })
      }
      onMouseUp={(e) =>
        onDragEnd?.({
          target: mockActions,
          //   Trong code thực tế của bạn, bạn dùng: e.target.opacity(0.5) hoặc e.target.x()
          // bạn phải tạo ra một object có cấu trúc y hệt những gì code của bạn đang gọi.
        })
      }
    >
      {children}
    </div>
  ),
}));

describe("Konva Robot Component", () => {
  it("nên render đầy đủ các bộ phận của Robot", () => {
    render(<KonvaJSPage />);

    // Kiểm tra thân, đầu, mắt (tổng 3 circle), text
    expect(screen.getByTestId("konva-rect")).toBeInTheDocument();
    expect(screen.getAllByTestId("konva-circle")).toHaveLength(3);
    expect(screen.getByText("Robot Unit")).toBeInTheDocument();
  });

  it("Stage nên có kích thước đúng 500x500", () => {
    render(<KonvaJSPage />);

    const stage = screen.getByTestId("stage-mock-konva");
    expect(stage).toHaveAttribute("data-width", "500");
    expect(stage).toHaveAttribute("data-height", "500");
  });

  it("Path nên có thuộc tính đúng", () => {
    render(<KonvaJSPage />);

    const path = screen.getByTestId("path-mock-konva");
    expect(path).toHaveAttribute("data-fill", "#1d4ed8");
    expect(path).toHaveAttribute("data-stroke", "black");
    expect(path).toHaveAttribute("data-stroke-width", "2");
  });

  it("nên kích hoạt hiệu ứng khi bắt đầu kéo (opacity 0.5)", () => {
    render(<KonvaJSPage />);
    const group = screen.getByTestId("group-mock-konva");

    // Tạo một mock function để theo dõi e.target.opacity
    const mockOpacityFn = jest.fn();

    // Lưu ý: Để test sâu vào instance, bạn có thể cần inject spy hoặc
    // kiểm tra sự thay đổi hiển thị nếu bạn dùng state 'opacity' để render.
    fireEvent.mouseDown(group);

    // Nếu bạn có dùng state cho opacity của Group, hãy check style:
    // expect(group).toHaveStyle("opacity: 0.5");
  });

  it("nên cập nhật vị trí mới khi kết thúc kéo", async () => {
    render(<KonvaJSPage />);
    const group = screen.getByTestId("group-mock-konva");

    // Giả lập hành động nhả chuột (kết thúc drag)
    fireEvent.mouseUp(group);

    // Kiểm tra xem UI có hiển thị tọa độ mới không (nếu bạn có in ra màn hình)
    // Ví dụ: expect(screen.getByText(/x: 150/)).toBeInTheDocument();
  });

  it("nên gọi hàm opacity với giá trị 0.5 khi bắt đầu kéo", () => {
    render(<KonvaJSPage />);
    fireEvent.mouseDown(screen.getByTestId("group-mock-konva"));

    expect(mockActions.opacity).toHaveBeenCalledWith(0.5);
    // Nếu code thật gọi là 0.6 hoặc không gọi gì cả, test sẽ Fail.
  });
});
