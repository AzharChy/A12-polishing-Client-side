import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../../customHooks/useAuth';
import useAxiosSecure from '../../../../../customHooks/AxiosSecure';


const PostBlog = () => {
  const { user } = useAuth(); 
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '', // <-- author field
  });

  // Fetch user info from backend
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users?email=${user.email}`)
        .then(res => {
          if (res.data?.name) {
            setForm(prev => ({ ...prev, author: res.data.name }));
          } else {
            setForm(prev => ({ ...prev, author: 'Unknown Agent' }));
          }
        })
        .catch(err => {
          console.error('Failed to fetch user info:', err);
          setForm(prev => ({ ...prev, author: 'Unknown Agent' }));
        });
    }
  }, [user?.email, axiosSecure]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.title || !form.content) {
    return Swal.fire('Error', 'Please fill all fields', 'error');
  }

  const blogData = {
    title: form.title,
    content: form.content,
    author: form.author,
       authorEmail: user?.email,
    publishDate: new Date(), //
  };

  try {
    const res = await axiosSecure.post('/blogs', blogData);
    
      await Swal.fire('Success', 'Blog published!', 'success');
      navigate('/dashboard/manageBlogs');
    
  } catch (err) {
    console.error(err);
    Swal.fire('Error', 'Failed to publish blog', 'error');
  }
};


  return (
    <div className="max-w-3xl mx-auto p-6">
      <Helmet>
        <title>Post Blog | Dashboard</title>
      </Helmet>

      <h2 className="text-2xl font-semibold mb-4 text-center">📝 Write a New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            name="content"
            rows={6}
            value={form.content}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Write your blog content here..."
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={form.author}
            readOnly
            className="w-full border p-2 bg-gray-100 rounded"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="px-5 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
          >
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostBlog;
