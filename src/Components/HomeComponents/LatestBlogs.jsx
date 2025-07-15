import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../customHooks/useAxios';


const LatestBlogs = () => {
  const axiosPublic = useAxios();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['latestBlogs'],
    queryFn: async () => {
      const res = await axiosPublic.get('/blogs');
      return res.data.slice(0, 4); // show only 4
    }
  });

  if (isLoading) return <p className="text-center py-10">Loading blogs...</p>;

  return (
    <section className="py-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6">Latest Articles</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">
        {blogs.map(blog => (
          <div key={blog._id} className="bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {blog.content.length > 150
                ? blog.content.slice(0, 150) + '...'
                : blog.content}
            </p>
            <Link
              to={`/blogs/${blog._id}`}
              className="text-violet-600 hover:underline font-medium"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/blogs"
          className="inline-block bg-violet-600 text-white px-6 py-2 rounded hover:bg-violet-700"
        >
          View All Articles
        </Link>
      </div>
    </section>
  );
};

export default LatestBlogs;
