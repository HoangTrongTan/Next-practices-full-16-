// Selector là linh hồn của hiệu năng
// Ví dụ, đừng làm:
// const store = useBearStore();
// Vì sẽ render lại khi bất kỳ state nào đổi.
// Thay vào đó:
// const bears = useBearStore((s) => s.bears);

import { shallow } from "zustand/shallow";
import { useShallow } from "zustand/react/shallow";
import { useBearsStore, useUserStore } from "../../zustands/all-index";
import { useStore } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";

export default function ZustandPage() {
  const bears = useBearsStore((state) => state.bears);
  const increase = useBearsStore((state) => state.increase);
  const reset = useBearsStore((state) => state.reset);

  //persist test
  //   const name = useUserStore((state) => (state as any)state.name);

  // 🧲 1. Dùng selector + shallow để giảm re-render
  const bearsStore = useStoreWithEqualityFn(
    useBearsStore,
    (state) => state.bears,
    shallow
  );

  //   📨 5. Subscribe bên ngoài React
  const store = useStore;
  //   const unsub = store.subscribe(
  //     (state) => state.bears,
  //     (bears) => console.log("New bears:", bears)
  //   );
  //   Nhớ unsub() khi xong

  //   🪄 6. Immer cho setState dịu dàng hơn
  // Không cần clone thủ công nữa 🧊
  //   import { immer } from "zustand/middleware/immer";

  //   const useStore = create(
  //     immer((set) => ({
  //       user: { name: "A", age: 20 },
  //       increase: () =>
  //         set((state) => {
  //           state.user.age++;
  //         }),
  //     }))
  //   );

  return (
    <div>
      <h2>🐻 Bears: {bears}</h2>
      <button onClick={increase}>+1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
