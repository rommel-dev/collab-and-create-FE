import React, { useEffect, useState } from 'react';

import { gql, useQuery } from '@apollo/client';
import { Link, NavLink, useParams } from 'react-router-dom';
import { IProject } from 'interfaces/project.interface';
import Project from 'components/projects/Project';
import { GET_PROJECTS } from 'api/gql/project/project.query';
import { useUserStore } from 'state/user.store';

const Projects = () => {
  const { status } = useParams();
  const [filteredProjects, setFilteredProjects] = useState([]);
  const { isAuth } = useUserStore();

  const { data } = useQuery(GET_PROJECTS, {
    variables: { status },
  });

  useEffect(() => {
    if (data) {
      const projects = data.getProjects?.filter(
        (project: IProject) =>
          project.status === status &&
          project.confirmedMembers.some((m) => m._id === isAuth?._id)
      );
      setFilteredProjects(projects);
    }
  }, [data, status]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
      {filteredProjects.map((project: IProject) => {
        return <Project key={project._id} {...project} />;
      })}
    </div>
  );
};

export default Projects;
