import React from 'react';

const Progress = ({ progress }: any) => {
  return (
    <div className="my-2">
      <p className="text-gray-700 text-xs">Progress</p>
      <div className="text-base text-gray-400 font-semibold">
        <p>{progress} %</p>
      </div>
    </div>
  );
};

export default Progress;
