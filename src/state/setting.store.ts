import create from 'zustand';
import { persist } from 'zustand/middleware';

interface Setting {
  mode: string;
  extend: boolean;
  toggleMode: () => void;
  toggleExtend: () => void;
}

export const useSettingStore = create(
  persist<Setting>(
    (set) => ({
      mode: 'light',
      extend: true,
      toggleMode: () =>
        set((state: any) =>
          state.mode === 'light' ? { mode: 'dark' } : { mode: 'light' }
        ),
      toggleExtend: () =>
        set((state: any) => ({ ...state, extend: !state.extend })),
    }),
    {
      name: 'setting',
      getStorage: () => localStorage,
    }
  )
);
