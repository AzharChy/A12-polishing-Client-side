
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div className="text-red-500">Hello World</div>,
  },
]);