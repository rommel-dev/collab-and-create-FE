import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import AuthHeader from 'components/auth/AuthHeader';
import LoginFooter from 'components/auth/signin/LoginFooter';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import { useUserStore } from 'state/user.store';
import { SIGNIN } from 'api/gql/user/user.mutation';

const Signin = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const updateIsAuth = useUserStore((state) => state.updateIsAuth);

  const navigate = useNavigate();

  const [loginUser] = useMutation(SIGNIN, {
    update(proxy, result) {
      setFormState({ email: '', password: '' });
      rememberMe
        ? localStorage.setItem('token', result.data.signin)
        : sessionStorage.setItem('token', result.data.signin);
      updateIsAuth();
    },
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onError(err) {
      console.log(err.graphQLErrors[0]);
      setError(err.graphQLErrors[0].message);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { email, password } = formState;
    if (email === '' || password === '') {
      return;
    }
    loginUser();
  };

  const onChangeInput = (event: any) => {
    setError('');
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const unVerifiedHandler = () => {
    localStorage.setItem('email', formState.email);
    navigate('verification');
  };

  return (
    <div className="bg-white min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AuthHeader text="Sign in to your account" />
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px relative">
            <Input
              value={formState.email}
              onChange={onChangeInput}
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
            />
            <Input
              value={formState.password}
              onChange={onChangeInput}
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
            />
            {error ===
            'Please check your email for verification code to proceed' ? (
              <p className="absolute text-xs text-red-500">
                {error}.
                <span
                  onClick={unVerifiedHandler}
                  className="cursor-pointer text-gray-900"
                >
                  Click to enter code.
                </span>
              </p>
            ) : (
              !!error && <p className="text-sm text-red-500">⚠ {error}</p>
            )}
          </div>

          <LoginFooter
            rememberMe={rememberMe}
            setRememberMe={() => setRememberMe(!rememberMe)}
          />

          <Button buttonText="Sign in" />
        </form>
      </div>
    </div>
  );
};

export default Signin;
