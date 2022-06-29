import React, { useEffect, useState } from 'react';

import { gql, useQuery } from '@apollo/client';
import { Link, NavLink, useParams } from 'react-router-dom';
import { PROJECTS_BY_USER } from 'api/gql/project.gql';
import { IProject } from 'interfaces/project.interface';
import Project from 'components/projects/Project';

const Projects = () => {
  const params = useParams();
  const [filteredProjects, setFilteredProjects] = useState([]);

  const { data } = useQuery(PROJECTS_BY_USER);

  useEffect(() => {
    if (data) {
      const projects = data.projectsByUser?.filter(
        (project: IProject) => project.status === params.status
      );
      console.log('PROJECTS', projects);
      setFilteredProjects(projects);
    }
  }, [data]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredProjects.map((project: IProject) => {
        return <Project key={project._id} {...project} />;
      })}
    </div>
  );
};

export default Projects;
