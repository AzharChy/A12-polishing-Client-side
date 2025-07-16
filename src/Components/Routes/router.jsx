
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import HomeLayout from "./Pages/HomeLayout";
import AllPolicy from "./Pages/AllPolicies/AllPolicy";
import Agents from "./Pages/Agents/Agents";
import Faq from "./Pages/FAQ/Faq";
import Login from "./Pages/Authentication/Loginregister/Login";
import Register from "./Pages/Authentication/Loginregister/Register";
import PolicyDetails from "./Pages/AllPolicies/PolicyDetails";
import Quotes from "./Pages/AllPolicies/Quotes/Quoters";
import Apply from "./Pages/AllPolicies/Apply Page/Apply";
import PrivateRoute from "./Pages/Authentication/AuthProvider/PrivateRoute";
import DashboardHome from "./Pages/Dashboard/DashboardLayout/DAshboard Pages/DashboardHome";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AdminRoute from "./Pages/Dashboard/Admin and agent route/AdminRoute";
import ManageApplication from "./Pages/Dashboard/Admin Paths/ManageApplication";
import ManageUsers from "./Pages/Dashboard/Admin Paths/ManageUsers";
import ManagePolicies from "./Pages/Dashboard/Admin Paths/ManagePolicies";
import AddPolices from "./Pages/Dashboard/Admin Paths/AddPolicies";
import ManageAgents from "./Pages/Dashboard/Admin Paths/ManageAgents";
import ManageTransactions from "./Pages/Dashboard/Admin Paths/ManageTransactions";
import AgentRoute from "./Pages/Dashboard/Admin and agent route/AgentRoute";
import AssignedCustomers from "./Pages/Dashboard/Agent Paths/AssignedCustomers";
import PostBlogs from "./Pages/Dashboard/Agent Paths/PostBlogs";
import ManageBlogs from "./Pages/Dashboard/Agent Paths/ManageBlogs";
import CustomerRoute from "./Pages/Dashboard/Customer Route/CustomerRoute";
import MyPolicies from "./Pages/Dashboard/Customer Route/MyPolicies";
import PaymentForm from "./Pages/Dashboard/Customer Route/PaymentForm";
import PaymentStatus from "./Pages/Dashboard/Customer Route/PaymentStatus";
import ClaimRequest from "./Pages/Dashboard/Customer Route/ClaimRequest";
import PolicyClearance from "./Pages/Dashboard/Agent Paths/PolicyClearance";
import AdminOrAgentRoute from "./Pages/Dashboard/Admin and agent route/AdminAndAgentRoute";

import AllBlogs from "./Pages/Blogs";
import BlogDetails from "./Pages/FAQ/BlogDetails";

import UserProfile from "../HomeComponents/Profile";
import Unauthorized from "./Pages/unauth&forbidden/Unauthorized";
import Forbidden from "./Pages/unauth&forbidden/Forbidden";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children:[
      {
        index: true,
        Component: HomeLayout
      },
      {
        path: 'allPolicy',
       element: <AllPolicy></AllPolicy>
      },
      
      {
        path: 'blogs',
       element: <AllBlogs />
      },
      {
        path: '/blogs/:id',
      element: <BlogDetails /> // replace with your actual component
      },
      {
          path: 'agents',
          element: <PrivateRoute>
            <Agents></Agents>
          </PrivateRoute>
      },
      {
          path: 'profile',
          element: <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
      },
      {
        path: 'FAQ',
        Component: Faq
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: '/policy/:id',
        Component: PolicyDetails
      },
      {
        path: 'get-quote/:policyId',
        element: <PrivateRoute>
          <Quotes></Quotes>
        </PrivateRoute>
      },
      {
        path: 'apply/:quoteId',
        element: <PrivateRoute>
           <Apply></Apply>
        </PrivateRoute>
      },
      {
        path: 'unauthorized',
        element: <Unauthorized />
      },
      {
        path: 'forbidden',
        element: <Forbidden />
      }
    ]
  },
  {
     path: '/dashboard',
  element: 
  <PrivateRoute>
    <Dashboard />,
    // </PrivateRoute>,
  children: [
    {
      index: true, 
      element: <DashboardHome />
    },
    {
      path: 'applications',
      element:
       <AdminRoute>
        <ManageApplication></ManageApplication>
       </AdminRoute>
    },
    {
      path: 'manageUSers',
      element: <AdminRoute>
        <ManageUsers />
      </AdminRoute>
    },
    {
      path:'managePolicies',
    element: <AdminRoute>
      <ManagePolicies />
    </AdminRoute>
    },
    {
      path: 'addPolicies',
      element: <AdminRoute>
        <AddPolices />
      </AdminRoute>
    },
    {
      path: 'manageAgents',
      element: <AdminRoute>
        <ManageAgents />
      </AdminRoute>
    },
    {
      path: 'manageTransactions',
      element: <AdminRoute>
        <ManageTransactions />
      </AdminRoute>
    },
    {
      path: 'assignedCustomers',
      element: <AgentRoute>
        <AssignedCustomers />
      </AgentRoute>
    },
    {
      path: 'postBlogs',
      
      element: <AdminOrAgentRoute>
        <PostBlogs />
      </AdminOrAgentRoute>
    },
    {
      path: 'policyClearance',
      element: <AgentRoute>
       <PolicyClearance />
      </AgentRoute>
    },
    {
      path: 'manageBlogs',
      element: <AdminOrAgentRoute>
         <ManageBlogs />
      </AdminOrAgentRoute>
    },
    {
      path: 'myPolicies',
      element: <CustomerRoute>
        <MyPolicies />
      </CustomerRoute>
    },
    {
      path: 'paymentForm',
      element: <CustomerRoute>
        <PaymentForm />
      </CustomerRoute>
    },
    {
      path: 'paymentStatus',
      element: <CustomerRoute>
        <PaymentStatus />
      </CustomerRoute>
    },
    {
      path: 'claimRequest',
      element: <CustomerRoute>
        <ClaimRequest />
      </CustomerRoute>
    },
    ]
  }
]);