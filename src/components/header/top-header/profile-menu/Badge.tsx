import { Menu } from '@headlessui/react';
import React from 'react';

const Badge = ({ open }: any) => {
  return (
    <div
      className={`${
        open
          ? 'border-2 border-indigo-500 rounded-full'
          : 'border-2 border-gray-50 rounded-full'
      }`}
    >
      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none">
        <span className="sr-only">Open user menu</span>

        {/* <img
                    className="h-9 w-9 rounded-full object-cover"
                    src={myInfo?.photo}
                    alt=""
                /> */}
      </Menu.Button>
    </div>
  );
};

export default Badge;
