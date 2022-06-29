import React from 'react';
import { useSettingStore } from 'state/setting.store';

const Overlay = () => {
  const { extend, toggleExtend } = useSettingStore();

  if (extend) {
    return (
      <div
        onClick={toggleExtend}
        className="z-20 bg-gray-500 h-screen w-screen absolute top-0 bg-opacity-50 md:hidden"
      ></div>
    );
  }
};

export default Overlay;
