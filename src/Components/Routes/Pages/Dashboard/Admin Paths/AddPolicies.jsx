import React from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../../../customHooks/AxiosSecure';
import Swal from 'sweetalert2';


const AddPolicies = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const policy = {
      title: data.title,
      category: data.category,
      shortDescription: data.description,
      minAge: parseInt(data.minAge),
      maxAge: parseInt(data.maxAge),
      coverageRange: data.coverageRange,
      termLength: data.duration,
      premium: data.premium,
      image: data.image,
      createdAt: new Date(),
      totalCount: 0
    };

    try {
      const res = await axiosSecure.post('/policies', policy);
      if (res.data?.insertedId) {
        Swal.fire('Policy created successfully!');
        reset();
      }
    } catch (err) {
      toast.error('Failed to create policy');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <Helmet>
        <title>Add New Policy</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-6 text-center">Add New Insurance Policy</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Title */}
        <input
          type="text"
          {...register('title', { required: true })}
          placeholder="Policy Title"
          className="w-full p-2 border rounded"
        />
        {errors.title && <p className="text-red-500 text-sm">Title is required</p>}

        {/* Category */}
        <select
          {...register('category', { required: true })}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="Term Life">Term Life</option>
          <option value="Senior Plan">Senior Plan</option>
          <option value="Child Plan">Child Plan</option>
          <option value="Health Insurance">Health Insurance</option>
          <option value="Auto Insurance">Auto Insurance</option>
          <option value="Homeowners Insurance">Homeowners Insurance</option>
          <option value="Travel Insurance">Travel Insurance</option>
          <option value="Business Insurance">Business Insurance</option>
          <option value="Family Insurance">Family Insurance</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm">Category is required</p>}

        {/* Description */}
        <textarea
          {...register('description', { required: true })}
          placeholder="Short Description"
          className="w-full p-2 border rounded"
        />
        {errors.description && <p className="text-red-500 text-sm">Description is required</p>}

        {/* Age range */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            {...register('minAge', { required: true })}
            placeholder="Minimum Age"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            {...register('maxAge', { required: true })}
            placeholder="Maximum Age"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Coverage */}
        <input
          type="text"
          {...register('coverageRange', { required: true })}
          placeholder="Coverage Range (e.g. $10k–$100k)"
          className="w-full p-2 border rounded"
        />

        {/* Duration */}
        <input
          type="text"
          {...register('duration', { required: true })}
          placeholder="Duration Options (e.g. 5-10 years)"
          className="w-full p-2 border rounded"
        />

        {/* Premium */}
        <input
          type="text"
          {...register('premium', { required: true })}
          placeholder="Base Premium Rate"
          className="w-full p-2 border rounded"
        />

        {/* Image */}
        <input
          type="url"
          {...register('image', { required: true })}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white p-2 rounded font-semibold"
        >
          Add Policy
        </button>
      </form>
    </div>
  );
};

export default AddPolicies;
