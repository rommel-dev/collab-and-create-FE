import React from 'react';

interface AuthHeaderProps {
  text: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ text }) => {
  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold dark:text-white-900 text-gray-900">
        {text}
      </h2>
    </div>
  );
};

export default AuthHeader;
