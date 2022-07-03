import create from 'zustand';
import { persist } from 'zustand/middleware';

interface Setting {
  extend: boolean;
  toggleExtend: () => void;
}

export const useSettingStore = create(
  persist<Setting>(
    (set) => ({
      extend: true,
      toggleExtend: () => set((state: any) => ({ extend: !state.extend })),
    }),
    {
      name: 'setting',
      getStorage: () => localStorage,
    }
  )
);
