import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
// import useAuth from '../../../../../customHooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../../../customHooks/useAuth';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [loginError, setLoginError] = useState('');

  const onSubmit = data => {
    setLoginError('');
    signIn(data.email, data.password)
      .then(result => {
        console.log(result.user);
        Swal.fire("Login Successful!");
        navigate(from);
      })
      .catch(error => {
        console.log(error);
        setLoginError(error.message);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <Helmet>
        <title>Login | Insurance App</title>
        <meta
          name="description"
          content="Login to your insurance account to view policies and dashboard."
        />
      </Helmet>

      <h2 className="text-2xl font-semibold mb-4">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
