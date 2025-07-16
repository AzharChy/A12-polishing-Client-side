import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../customHooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../customHooks/AxiosSecure';
import logo from '../../assets/logo.png'


const Navbar = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [dbUser, setDbUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Fetch user from your backend
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users?email=${user.email}`)
        .then(res => {
          setDbUser(res.data);
        })
        .catch(err => {
          console.error('Error fetching user from DB:', err);
        });
    }
  }, [user, axiosSecure]);

 const handleLogout = () => {
  logOut()
    .then(() => {
      Swal.fire('Logged out successfully!');
      navigate('/login'); // Redirect to login page
    })
    .catch((err) => {
      console.log('Logout error:', err);
    });
};


  const links = (
    <>
      <li><NavLink to="/" className="px-4 py-2 rounded hover:bg-violet-100">Home</NavLink></li>
      <li><NavLink to="/allPolicy" className="px-4 py-2 rounded hover:bg-violet-100">All Policies</NavLink></li>
      <li><NavLink to="/agents" className="px-4 py-2 rounded hover:bg-violet-100">Agents</NavLink></li>
      <li><NavLink to="/FAQ" className="px-4 py-2 rounded hover:bg-violet-100">FAQ</NavLink></li>
   {user && 
      <li><NavLink to="/dashboard" className="px-4 py-2 rounded hover:bg-violet-100">Dashboard</NavLink></li>
      }
    </>
  );

  return (
    <header className="p-4 bg-white dark:bg-gray-900 dark:text-gray-100 shadow-md">
      <div className="container mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-violet-600">
          <img src={logo} className='w-8 h-8'></img>
          InsuranceApp
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden lg:flex space-x-4 items-center">{links}</ul>

        {/* User / Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3 relative">
          {user ? (
            <div className="relative">
              <img
                src={dbUser?.photo || '/default-profile.png'}
                alt="Profile"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full border-2 cursor-pointer"
              />
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 p-4">
                  <p className="text-sm font-medium">{dbUser?.name || 'Unnamed User'}</p>
                  <p className="text-xs text-gray-500">{dbUser?.email}</p>
                   <Link to='/profile'>View Profile</Link>
                  <hr className="my-2" />
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 text-sm rounded border">Login</button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 text-sm font-semibold rounded bg-violet-600 text-white">Register</button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden mt-2 space-y-2 px-4 py-2 bg-white dark:bg-gray-800 shadow rounded-md">
          <ul className="space-y-2">{links}</ul>
          <div className="pt-2 flex flex-col gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <img
                    src={dbUser?.photo || '/default-profile.png'}
                    alt="profile"
                    className="w-10 h-10 rounded-full border-2"
                  />
                  <div>
                
                    <p className="text-sm font-medium">{dbUser?.name}</p>
               
                    <p className="text-xs text-gray-500">{dbUser?.email}</p>
                  </div>
                  <div>
                     <Link to='/profile'>View Profile</Link>
                  </div>
                </div>
                <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-4 py-2 text-sm rounded border">Login</button>
                </Link>
                <Link to="/register">
                  <button className="px-4 py-2 text-sm font-semibold rounded bg-violet-600 text-white">Register</button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
