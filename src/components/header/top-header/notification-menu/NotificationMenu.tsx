import { useQuery } from '@apollo/client';
import { Menu } from '@headlessui/react';
import { GET_PROJECTS } from 'api/gql/project/project.query';
import { client } from 'index';
import { IProject } from 'interfaces/project.interface';

import React, { useEffect, useState } from 'react';
import { useFormStore } from 'state/form.store';
import { useUserStore } from 'state/user.store';
import Badge from './Badge';
import NotificationList from './NotificationList';

const NotificationMenu = () => {
  const [show, setShow] = useState(false);
  const { isAuth } = useUserStore();
  const { loading } = useFormStore();

  const [notificatioProjects, setNotificationProjects] = useState([]);

  const data = client.readQuery({
    query: GET_PROJECTS,
  });

  const refreshNotification = () => {
    const data = client.readQuery({
      query: GET_PROJECTS,
    });
    if (data) {
      setNotificationProjects(
        data.getProjects.filter((project: IProject) =>
          project.unconfirmedMembers.some((m) => m._id === isAuth?._id)
        )
      );
    }
  };

  useEffect(() => {
    refreshNotification();
  }, [data]);

  useEffect(() => {
    if (loading === false) {
      refreshNotification();
    }
  }, [loading]);

  if (data) {
    return (
      <Menu as="div" className="ml-3 relative mt-2 w-10">
        {({ open }) => (
          <div className="">
            <Badge
              // show={show}
              projectInvites={notificatioProjects}
              // setShow={() => setShow(!show)}
              open={open}
            />
            <NotificationList
              open={open}
              projectInvites={notificatioProjects}
            />
          </div>
        )}
      </Menu>
    );
  }

  return <h5>...</h5>;
};

export default NotificationMenu;
