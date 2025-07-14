import React from 'react';
import useUserRole from '../../../../customHooks/UserRole';
import Loading from '../Loading';
import { NavLink } from 'react-router-dom';

const AgentSidebar = () => {
    const { role, isLoading } = useUserRole();

  if (isLoading) return <Loading text='Loading..'></Loading>

    return (
        <div className=""> 
          
             {role === 'agent' && (
       
       
          <>
          <ul>
           <li> <NavLink to='/dashboard/assignedCustomers'>
                    Assigned Customers
                </NavLink></li>
                <li>
                    <NavLink to='/dashboard/postBlogs'>
                        Post Blogs
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/manageBlogs'>
                        Manage Blogs
                    </NavLink>
                </li>
                 </ul>
                    </>
         
       
       
      )}
          
        </div>
    );
};

export default AgentSidebar;