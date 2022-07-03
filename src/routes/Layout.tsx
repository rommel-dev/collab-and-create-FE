import Overlay from 'components/common/Overlay';
import NoUserHeader from 'components/header/NoUserHeader';
import WithUserHeader from 'components/header/WithUserHeader';
import SideDrawer from 'components/side-drawer/SideDrawer';
import { Outlet } from 'react-router-dom';
import { useSettingStore } from 'state/setting.store';
import { useUserStore } from 'state/user.store';

const Layout = () => {
  const isAuth = useUserStore((state) => state.isAuth);
  const { extend, toggleExtend } = useSettingStore();

  if (isAuth) {
    return (
      <div className={`${extend ? 'md:margin-third lg:margin-fifth' : ''} transition-all duration-300 ease-in-out h-full flex bg-white dark:bg-gray-800 flex-col flex-1 min-w-0 flex-shrink-0`}>
        {extend && <div onClick={toggleExtend} className="z-20 bg-gray-500 h-screen w-screen absolute top-0 bg-opacity-50 md:hidden"></div>}
        <SideDrawer />
        <WithUserHeader />

        <Outlet />
      </div>
    );
  }

  return (
    <>
      <NoUserHeader />
      <Outlet />
    </>
  );
};

export default Layout;
