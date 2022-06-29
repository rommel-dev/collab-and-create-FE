import Logo from 'components/common/Logo';
import React from 'react';
import { Link } from 'react-router-dom';

const NoUserHeader = () => {
  return (
    <header className="px-6 py-2 border-b-2 border-gray-200">
      <div className="flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        <div className="flex gap-3">
          <Link to="/auth/signin">
            <h3>Login</h3>
          </Link>
          <Link to="/auth/signup">
            <h3>Register</h3>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NoUserHeader;
