import React from 'react';
import BottomHeader from './bottom-header/BottomHeader';
import TopHeader from './top-header/TopHeader';

const WithUserHeader = () => {
  return (
    <header className="px-6 py-1 border-b-2 border-gray-200">
      <TopHeader />
      <BottomHeader />
    </header>
  );
};

export default WithUserHeader;
