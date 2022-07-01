import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import AuthHeader from 'components/auth/AuthHeader';
import Input from 'components/common/Input';
import Button from 'components/common/Button';
import { SIGN_UP } from 'api/gql/user/user.mutation';

const Signup = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const [addUser] = useMutation(SIGN_UP, {
    update(proxy, result) {
      localStorage.setItem('email', result.data.register.email);
      //   console.log('RESULT', result);
      setFormState({ name: '', email: '', password: '', confirmPassword: '' });
      // history.push('/verification')
    },
    variables: {
      name: formState.name,
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
    const { name, email, password, confirmPassword } = formState;
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords not match!');
      return;
    }
    addUser();
  };

  const onChangeInput = (event: any) => {
    setError('');
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div className="bg-white min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AuthHeader text="New account registration" />
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              value={formState.name}
              onChange={onChangeInput}
              label="Username"
              id="name"
              name="name"
              type="text"
              placeholder="Username"
            />
            <Input
              value={formState.email}
              onChange={onChangeInput}
              label="Email address"
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
            />
            <Input
              value={formState.password}
              onChange={onChangeInput}
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />
            <Input
              value={formState.confirmPassword}
              onChange={onChangeInput}
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />

            {!!error && <p className="text-sm text-red-500 mb-5">⚠ {error}</p>}
          </div>

          <Button buttonText="Register" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
