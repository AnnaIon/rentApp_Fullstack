import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Homepage from "../pages/Homepage";
import MyProfile from "../pages/MyProfile";
import Favourites from "../pages/Favourites";
import MyFlats from "../pages/MyFlats";
import Auth from "../authentication/Auth";
import AdminRoute from "./AdminRoute";
import AllUsers from "../pages/AllUsers";
import Inbox from "../pages/Inbox";
import ForgotPassword from "../components/password/ForgotPassword";
import UpdatePassword from "../components/password/UpdatePassword";
import ResetPassword from "../components/password/ResetPassword";
const routesArray = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/authentication" />,
      },
      {
        path: "authentication",
        element: <Auth />,
        children: [
          {
            index: true,
            element: <Navigate to="login" />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        path: "homepage",
        element: <Homepage />,
      },
      {
        path: "myflats",
        element: <MyFlats />,
      },
      {
        path: "myprofile",
        element: <MyProfile />,
      },
      {
        path: "favourites",
        element: <Favourites />,
      },
      {
        path: "inbox",
        element: <Inbox />,
      },

      {
        path: "all-users",
        element: <AdminRoute />,
        children: [
          {
            path: "",
            element: <AllUsers />,
          },
        ],
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />
      },
      {
        path: "/update-password",
        element: <UpdatePassword />
      }
      
    ],
  },
];

const Routes = createBrowserRouter(routesArray);

export default Routes;
