"use client";

import { useState } from "react";
import { Button, Modal, message } from "antd";
import api from "@/helpers/axiosSetup";

type User = {
  id: string;
  role: string;
};

const TestAuthPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowMe = async () => {
    try {
      const res = await api.get("/get-me");
      console.log(res.data);
      
      setShowModal(true);
    } catch (err) {
      message.warning("Bạn phải login mới xem được thông tin này!");
    }
  };

  const handleLogin = async () => {
    
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-6">
      {/* Button Group bên ngoài dùng Tailwind */}
      <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-xl border border-slate-100">
        <button
          onClick={handleShowMe}
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-100"
        >
          Show me
        </button>
        <button onClick={handleLogin} className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors">
          Login
        </button>
        <button className="px-6 py-2 text-rose-500 hover:bg-rose-50 font-semibold rounded-xl transition-colors">
          Logout
        </button>
      </div>

      <Modal
        title={
          <div className="text-xl font-bold text-slate-800 border-b pb-4 -mx-6 px-6">
            ✨ Basic Modal
          </div>
        }
        open={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        // Custom Footer bằng Tailwind
        footer={[
          <div key="footer" className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setShowModal(false)}
              className="px-5 py-2 text-slate-500 hover:text-slate-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-slate-900 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-all active:scale-95"
            >
              OK, I got it
            </button>
          </div>,
        ]}
        // Tùy chỉnh CSS cho lớp bọc Modal
        centered
        maskClosable
        width={450}
        modalRender={(modal) => (
          <div className="ant-modal-content-custom rounded-2xl overflow-hidden">
            {modal}
          </div>
        )}
      >
        <div className="py-6 space-y-4">
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-indigo-700 font-medium">
              Đây là Modal của Ant Design nhưng đã được "độ" lại lớp áo bằng
              Tailwind CSS.
            </p>
          </div>
          <div className="space-y-2 text-slate-600">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Giữ nguyên được các tính năng Accessiblity.
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Tận dụng sức mạnh Utility của Tailwind.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TestAuthPage;
