import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import useAuth from '../../../../../customHooks/useAuth';
import useAxiosSecure from '../../../../../customHooks/AxiosSecure';

const ManageBlogs = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formState, setFormState] = useState({ title: '', content: '' });

  // Fetch blogs by agent
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['myBlogs', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs/agent/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Delete blog
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/blogs/${id}`);
    },
    onSuccess: () => {
      toast.success('Blog deleted');
      queryClient.invalidateQueries(['myBlogs', user?.email]);
    },
    onError: () => toast.error('Delete failed'),
  });

  // Update blog
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      await axiosSecure.patch(`/blogs/${id}`, data);
    },
    onSuccess: () => {
      toast.success('Blog updated');
      setIsEditOpen(false);
      queryClient.invalidateQueries(['myBlogs', user?.email]);
    },
    onError: () => toast.error('Update failed'),
  });

  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setFormState({ title: blog.title, content: blog.content });
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    updateMutation.mutate({
      id: editingBlog._id,
      data: formState,
    });
  };

  if (isLoading) return <p className="text-center py-10">Loading your blogs...</p>;

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Manage Blogs | Dashboard</title>
      </Helmet>
      <h2 className="text-2xl font-bold text-center mb-6">My Blog Posts</h2>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t published any blogs yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3">Publish Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-b">
                  <td className="p-3">{blog.title}</td>
                  <td className="p-3 text-center">
                    {new Date(blog.publishDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      onClick={() => openEditModal(blog)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(blog._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded bg-white p-6 shadow space-y-4">
  <DialogTitle className="text-lg font-semibold">Edit Blog</DialogTitle>

  <div>
    <label className="block mb-1 font-medium text-gray-700">Blog Title</label>
    <input
      type="text"
      value={formState.title}
      onChange={(e) => setFormState({ ...formState, title: e.target.value })}
      className="w-full border p-2 rounded"
      placeholder="Enter blog title"
    />
  </div>

  <div>
    <label className="block mb-1 font-medium text-gray-700">Blog Content</label>
    <textarea
      value={formState.content}
      onChange={(e) => setFormState({ ...formState, content: e.target.value })}
      className="w-full border p-2 rounded"
      rows={5}
      placeholder="Write your blog content here..."
    ></textarea>
  </div>

  <div className="flex justify-end gap-3 pt-2">
    <button
      onClick={() => setIsEditOpen(false)}
      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
    >
      Cancel
    </button>
    <button
      onClick={handleUpdate}
      className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
    >
      Save Changes
    </button>
  </div>
</DialogPanel>

        </div>
      </Dialog>
    </div>
  );
};

export default ManageBlogs;
