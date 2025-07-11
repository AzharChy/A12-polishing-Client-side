// import React from 'react';
// import { NavLink, Outlet } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import { FiMenu } from 'react-icons/fi';
// import { useState } from 'react';

// const DashboardLayout = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="min-h-screen flex">
//       <Helmet>
//         <title>Dashboard | Insurance App</title>
//       </Helmet>

//       {/* Sidebar */}
//       <aside className={`bg-violet-700 text-white w-64 p-4 space-y-4 md:block ${isOpen ? 'block' : 'hidden'} fixed md:relative z-20`}>
//         <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
//         <NavLink to="/home" className="block py-2 px-4 rounded hover:bg-violet-600">Dashboard Home</NavLink>
//         <NavLink to="/dashboard/my-quotes" className="block py-2 px-4 rounded hover:bg-violet-600">My Quotes</NavLink>
//         <NavLink to="/dashboard/my-applications" className="block py-2 px-4 rounded hover:bg-violet-600">My Applications</NavLink>
//         {/* Add more links as needed */}
//       </aside>

//       {/* Main content */}
//       <div className="flex-1 md:ml-64 w-full">
//         {/* Topbar */}
//         <header className="bg-white shadow px-4 py-3 flex items-center justify-between md:justify-end sticky top-0 z-10">
//           <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
//             <FiMenu className="text-2xl text-violet-700" />
//           </button>
//           <div className="font-semibold">Welcome back 👋</div>
//         </header>

//         {/* Content */}
//         <main className="p-6 bg-gray-50 min-h-screen">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
