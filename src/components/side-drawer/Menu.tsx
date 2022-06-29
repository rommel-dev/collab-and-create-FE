import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = ({ menu, menuGroupText }: any) => {
  const location = useLocation();

  return (
    <Link
      to={`${menu.path}`}
      className={`cursor-pointer flex justify-between items-center 
             rounded-lg px-3 py-2 text-sm font-medium 
            ${
              location.pathname === menu.path
                ? 'text-gray-900 bg-gray-300'
                : 'text-gray-500 bg-gray-200'
            }`}
    >
      {menu.text}

      {/* <span className={`${location.pathname === menu.path ? "text-gray-900" : "text-gray-500"} text-xs font-semibold`}>
            {menuGroupText === "Projects" && projects?.filter(project => project.status === menu.text).length}

            {(menuGroupText === "Tasks" && menu.text === "Personal Tasks" ) && personalTasksCount}
            {(menuGroupText === "Tasks" && menu.text === "Assigned to me" ) && taskAssignToMe?.length}
            {(menuGroupText === "Tasks" && menu.text === "Created by me" ) && taskCreatedByMe?.length}

            {(menuGroupText === "Notes" && menu.text === "Personal Notes" ) && personalNotesCount}
            {(menuGroupText === "Notes" && menu.text === "Created by me" ) && noteCreatedByMe?.length}

            {(menuGroupText === "Devs" && menu.text === "Colleagues") && colleagues?.length}
            {(menuGroupText === "Devs" && menu.text === "Teams") && verifiedTeams?.length}
            </span> */}
    </Link>
  );
};

export default Menu;
