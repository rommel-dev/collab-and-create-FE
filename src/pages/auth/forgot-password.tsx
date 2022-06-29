import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { FORGOT_PASSWORD } from 'api/gql/user.gql';
import AuthHeader from 'components/auth/AuthHeader';
import Input from 'components/common/Input';
import Button from 'components/common/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [codeAttempt, setCodeAttempt] = useState(0);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [forgotPassword] = useMutation(FORGOT_PASSWORD, {
    update(proxy, result) {
      if (result.data.forgotPassword && !!email) {
        setSearchParams({ email: `${email}` });
        setStep(2);
        setEmail('');
      }
      if (result.data.forgotPassword && !!code) {
        setStep(3);
        setCode('');
      }
      if (result.data.forgotPassword && !!password) {
        setPassword('');
        navigate('/auth/signin');
      }
    },
    variables: {
      email: email ? email : searchParams.get('email'),
      code,
      password,
    },
    onError(err) {
      if (!!code) {
        if (codeAttempt >= 3) {
          setStep(1);
          setError('Maximum code attempt reached. Request new code.');
          setCode('');
        } else {
          setCodeAttempt(codeAttempt + 1);
          setError(err.graphQLErrors[0].message);
        }
      } else {
        setError(err.graphQLErrors[0].message);
      }
    },
  });

  const handleSubmitEmail = (e: any) => {
    e.preventDefault();
    if (email === '') {
      return;
    }
    forgotPassword();
  };

  const handleSubmitCode = (e: any) => {
    e.preventDefault();
    if (code === '') {
      return;
    }
    forgotPassword();
  };

  const handleSubmitPassword = (e: any) => {
    e.preventDefault();
    if (password === '') {
      return;
    }
    forgotPassword();
  };

  return (
    <div className="bg-white min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AuthHeader text={`Forgot Password (Step ${step}/3)`} />
        {step === 1 && (
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmitEmail}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <Input
                value={email}
                onChange={(e) => {
                  setError('');
                  setEmail(e.target.value);
                }}
                label="Enter your email address"
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
              />

              <p className="text-xs text-red-500">{error}</p>
            </div>

            <Button buttonText="Send Code" />
          </form>
        )}

        {step === 2 && (
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmitCode}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="rounded-md shadow-sm -space-y-px">
                <Input
                  value={code}
                  onChange={(e) => {
                    setError('');
                    setCode(e.target.value);
                  }}
                  label="Verification Code"
                  id="verificationCode"
                  name="verificationCode"
                  type="number"
                  placeholder="Email verification code"
                />

                <p className="text-xs text-red-500">{error}</p>
              </div>
            </div>

            <Button buttonText="Confirm" />
          </form>
        )}

        {step === 3 && (
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmitPassword}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="rounded-md shadow-sm -space-y-px">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                />

                <p className="text-xs text-red-500">{error}</p>
              </div>
            </div>

            <Button buttonText="Confirm" />
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
