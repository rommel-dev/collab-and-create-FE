import { Menu } from '@headlessui/react';
import React from 'react';
import Badge from './Badge';
import MenuItems from './MenuItems';

const ProfileMenu = ({ myInfo }: any) => {
  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <Badge open={open} myInfo={myInfo} />
          <MenuItems open={open} />
        </>
      )}
    </Menu>
  );
};

export default ProfileMenu;
