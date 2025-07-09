import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../../../customHooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAxios from '../../../../../customHooks/useAxios';
import Swal from 'sweetalert2';


const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const { createUser } = useAuth();
  const axiosInstance = useAxios();

  const [profilePic, setProfilePic] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    try {
      // Step 1: Create Firebase user
      const result = await createUser(data.email, data.password);
      console.log('Firebase user created:', result.user);
      Swal.fire("Registraion Successful!!!")

      // Step 2: Update Firebase profile
    //   await updateUserProfile({
    //     displayName: data.name,
    //     photoURL: profilePic
    //   });

      // Step 3: Store user in database
      const userInfo = {
        name: data.name,
        email: data.email,
        photo: profilePic,
        role: 'user',
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString()
      };

      const res = await axiosInstance.post('/users', userInfo);
      console.log('Saved to DB:', res.data);

      // Step 4: Navigate to original page
      navigate(from, { replace: true });

    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    try {
      const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
      const res = await axios.post(uploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <Helmet>
        <title>Register | Insurance App</title>
        <meta name="description" content="Create a new account on Insurance App to manage your policies easily." />
      </Helmet>

      <h2 className="text-2xl font-semibold mb-4">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' }
            })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value => value === watch('password') || 'Passwords do not match'
            })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
