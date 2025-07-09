import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../customHooks/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user, logout} = useAuth();

  const handleLogout = () =>{
    logout()
    .then((res)=>{
        console.log(res);
        Swal.fire("SweetAlert2 is working!");
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  const links = (
    <>
      <li><NavLink to="/" className="px-4 py-2 rounded hover:bg-violet-100">Home</NavLink></li>
      <li><NavLink to="/allPolicy" className="px-4 py-2 rounded hover:bg-violet-100">All Policies</NavLink></li>
      <li><NavLink to="/agents" className="px-4 py-2 rounded hover:bg-violet-100">Agents</NavLink></li>
      <li><NavLink to="/FAQ" className="px-4 py-2 rounded hover:bg-violet-100">FAQ</NavLink></li>
      <li><NavLink to="/dashboard" className="px-4 py-2 rounded hover:bg-violet-100">Dashboard</NavLink></li>
    </>
  );

  return (
    <header className="p-4 bg-white dark:bg-gray-900 dark:text-gray-100 shadow-md">
      <div className="container mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-violet-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-8 h-8">
            <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742z"></path>
          </svg>
          InsuranceApp
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-4 items-center">
          {links}
        </ul>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <Link to='login'>
          <button className="px-4 py-2 text-sm rounded border">Login</button>
          </Link>
          <Link to='register'>
          <button className="px-4 py-2 text-sm font-semibold rounded bg-violet-600 text-white">Register</button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-2 space-y-2 px-4 py-2 bg-white dark:bg-gray-800 shadow rounded-md">
          <ul className="space-y-2">{links}</ul>
          <div className="pt-2 flex flex-col gap-2">
              <Link to='login'>
          <button className="px-4 py-2 text-sm rounded border">Login</button>
          </Link>
          <Link to='register'>
          <button className="px-4 py-2 text-sm font-semibold rounded bg-violet-600 text-white">Register</button>
          </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
