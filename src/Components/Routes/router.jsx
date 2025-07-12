
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
          path: 'agents',
          element: <PrivateRoute>
            <Agents></Agents>
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
    }
    ]
  }
]);