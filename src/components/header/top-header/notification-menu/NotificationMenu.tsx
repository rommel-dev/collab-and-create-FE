import { useQuery } from '@apollo/client';
import { Menu } from '@headlessui/react';
import { GET_NOTIFICATIONS } from 'api/gql/notification/notification.query';
import Badge from './Badge';
import NotificationList from './NotificationList';

const NotificationMenu = () => {
  const { data } = useQuery(GET_NOTIFICATIONS);

  if (data) {
    return (
      <Menu as="div" className="ml-3 relative mt-2 w-10">
        {({ open }) => (
          <div className="">
            <Badge
              // show={show}
              projectInvites={data?.getNotifications}
              // setShow={() => setShow(!show)}
              open={open}
            />
            <NotificationList
              open={open}
              notifications={data?.getNotifications}
            />
          </div>
        )}
      </Menu>
    );
  }

  return <h5>...</h5>;
};

export default NotificationMenu;
