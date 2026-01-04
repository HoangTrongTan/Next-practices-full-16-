"use client";
import { useState } from "react";
import { Stage, Layer, Rect, Group, Circle, Text, Path } from "react-konva";

export default function KonvaJSPage() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <div>
      <Stage width={500} height={500}>
        <Layer>
          {/* <Rect
            x={pos.x}
            y={pos.y}
            width={100}
            height={50}
            fill="blue"
            draggable
            onDragEnd={(e) => {
              const newX = e.target.x();
              const newY = e.target.y();
              setPos({ x: newX, y: newY });
              console.log("New position:", newX, newY);
            }}
          /> */}
          <Path
            data="M10,10 L100,10 C120,50 80,90 100,150 L10,150 Z" // Ví dụ tọa độ
            fill="#1d4ed8" // Màu xanh đậm như hình
            stroke="black"
            strokeWidth={2}
            draggable
          />
          <Group
            // x={pos.x}
            // y={pos.y}
            draggable
            onDragEnd={(e) => {
              setPos({ x: e.target.x(), y: e.target.y() });
              e.target.opacity(1);
            }}
            onDragStart={(e) => {
              //Hiệu ứng khi đc nhấc lên
              e.target.opacity(0.5);
            }}
            onDragMove={(e) => {
              // code here
            }}
          >
            {/* Hình 1: Thân (Hình chữ nhật) */}
            <Rect width={150} height={100} fill="#4F46E5" cornerRadius={10} />

            {/* Hình 2: Đầu (Hình tròn) - Tọa độ tính theo gốc của Group (0,0) */}
            <Circle x={75} y={0} radius={40} fill="#818CF8" />

            {/* Hình 3: Mắt trái */}
            <Circle x={60} y={-10} radius={5} fill="white" />

            {/* Hình 4: Mắt phải */}
            <Circle x={90} y={-10} radius={5} fill="white" />

            {/* Hình 5: Nhãn văn bản */}
            <Text
              text="Robot Unit"
              x={35}
              y={40}
              fill="white"
              fontStyle="bold"
            />
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}

//<Stage> = khung canvas
//<Layer> = lớp vẽ
{
  /* <Rect>, <Circle>, <Text> = hình vẽ */
}
// MMove To: Nhấc bút lên và đặt xuống điểm $(x, y)$. Đây luôn là điểm bắt đầu.
// LLine To: Đặt bút xuống và kẻ một đường thẳng từ điểm hiện tại tới $(x, y)$.
// CCurve To: Vẽ một đường cong Bezier (cần 3 cặp tọa độ để điều chỉnh độ cong).
// ZClose Path: Đóng hình: Kẻ một đường thẳng từ điểm hiện tại quay về điểm xuất phát (M).