import React from 'react';
import { useSettingStore } from 'state/setting.store';
import MenuList from './MenuList';

const SideDrawer = () => {
  const { extend } = useSettingStore();
  return (
    <aside
      className={`${
        extend ? 'translate-x-0' : '-translate-x-full'
      } md:w-1/3 lg:w-1/5 dark:bg-black bg-gray-100 transform top-0 left-0 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30`}
    >
      <MenuList />
    </aside>
  );
};

export default SideDrawer;
