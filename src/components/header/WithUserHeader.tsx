import { gql, useQuery } from '@apollo/client';
import { MY_INFO } from 'api/gql/user/user.query';
import BottomHeader from './bottom-header/BottomHeader';
import TopHeader from './top-header/TopHeader';

const WithUserHeader = () => {
  const { data } = useQuery(MY_INFO, {
    onCompleted(data) {
      console.log(data);
    },
  });

  return (
    <header className="px-6 py-1 border-b-2 border-gray-200">
      <TopHeader myInfo={data?.myInfo} />
      <BottomHeader />
    </header>
  );
};

export default WithUserHeader;
