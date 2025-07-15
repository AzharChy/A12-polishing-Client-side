import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import useAxios from '../../../../customHooks/useAxios';

const BlogDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blogDetails', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading blog...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        By <span className="font-semibold">{blog.author}</span> • {new Date(blog.publishDate).toLocaleDateString()} • 👁️ {blog.visitCount || 0} views
      </div>
      <div className="prose max-w-none">
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
