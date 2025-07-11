
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
        element: <Quotes></Quotes>
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
    path: 'dashboard',
  }
]);