import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div className="text-center text-red-500">Hello World</div>,
  },
]);