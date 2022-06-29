import React, { useEffect } from 'react';
import { client } from '..';
import { gql, useQuery } from '@apollo/client';

const Notes = () => {
  // const user = client.readQuery({
  //   query: FIND_USER,
  //   variables: {
  //     email: 'rommel667@gmail.com',
  //   },
  // });

  // useEffect(() => {
  //   console.log('USER', user);
  // }, [user]);

  return <div>Notes</div>;
};

export default Notes;
