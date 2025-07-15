import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../../customHooks/useAxios';



const AllBlogs = () => {
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['allBlogs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/blogs');
      return res.data;
    },
  });

  const incrementVisit = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/blogs/visit/${id}`);
    },
    onSuccess: () => {
      // Optionally re-fetch
    }
  });

  const handleReadMore = (id) => {
    incrementVisit.mutate(id);
    navigate(`/blogs/${id}`);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {blogs.map((blog) => (
        <div key={blog._id} className="bg-white border rounded p-4 shadow-md">
          <img src="https://i.ibb.co/jksFz8Ls/reviewr1.jpg" alt="Blog" className="w-full h-40 object-cover mb-3 rounded" />
          <h3 className="text-lg font-bold mb-1">{blog.title}</h3>
          <p className="text-sm text-gray-600 mb-2">
            {blog.content?.slice(0, 150)}...
          </p>
          <div className="text-xs text-gray-500 mb-1">
            By <span className="font-medium text-indigo-600">{blog.author}</span> • {new Date(blog.publishDate).toLocaleDateString()}
          </div>
          <p className="text-xs mb-2">👁️ {blog.visitCount || 0} visits</p>
          <button
            onClick={() => handleReadMore(blog._id)}
            className="text-indigo-600 hover:underline text-sm"
          >
            Read More →
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllBlogs;
