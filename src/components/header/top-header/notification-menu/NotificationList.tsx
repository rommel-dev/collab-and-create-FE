import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import NotificationItem from './NotificationItem';

const NotificationList = ({ open, notifications, show }: any) => {
  return (
    <Transition
      show={open}
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        as="div"
        static
        className="min-w-max px-4 py-8 overflow-scroll origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 no-scrollbar .no-scrollbar::-webkit-scrollbar min-h-0 max-h-screen"
      >
        {notifications?.map((notification: any) => {
          if (notification.project) {
            return (
              <NotificationItem
                key={notification._id}
                {...notification.project}
              />
            );
          }
          return <h1>Task Invite</h1>;
        })}

        {notifications.length === 0 && (
          <div className="flex items-start justify-center">
            <p className="py-3">-No notification-</p>
          </div>
        )}
      </Menu.Items>
    </Transition>
  );
};

export default NotificationList;
