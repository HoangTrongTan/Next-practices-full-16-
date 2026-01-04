import { create } from "zustand";
import { persist } from "zustand/middleware";
import { devtools } from "zustand/middleware";
import { shallow } from "zustand/shallow";

interface BearState {
  bears: number;
  increase: () => void;
  reset: () => void;
}

export const useBearsStore = create<BearState>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  reset: () => set({ bears: 0 }),
}));

// 5. Persist (lưu state vào localStorage)
export const useUserStore = create(
  persist(
    (set) => ({
      name: "Guest",
      setName: (name: string) => set({ name }),
    }),
    {
      name: "user-storage", // unique name
    }
  )
);

// 🧪 6. Async call như boss 👨‍💻
export const useTodoStore = create((set) => ({
  todo: [],
  loading: false,

  fetchTodos: async () => {
    set({ loading: true });
    const res = await fetch("http://api/get");
    const data = await res.json();
    set({ todo: data, loading: false });
  },
}));

// 📌 9. Bonus: DevTools
export const useCounterStore = create(
  devtools((set) => ({
    count: 0,
    incressment: 1,
    increment: () =>
      set(
        (state: any) => ({ count: state.count + state.incressment }),
        false,
        "increment"
      ),
    decrement: () =>
      set(
        (state: any) => ({ count: state.count - state.incressment }),
        false,
        "decrement"
      ),
  }))
);

