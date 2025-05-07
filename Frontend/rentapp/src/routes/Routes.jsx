import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";

// Pages and components
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

// Password management pages
import ForgotPassword from "../components/password/ForgotPassword";
import UpdatePassword from "../components/password/UpdatePassword";
import ResetPassword from "../components/password/ResetPassword";

// Define route structure
const routesArray = [
  {
    path: "/",
    element: <App />, // Root layout component
    children: [
      {
        index: true,
        element: <Navigate to="/authentication" />, // Redirect root to authentication
      },
      {
        path: "authentication",
        element: <Auth />, // Authentication layout (Login/Register)
        children: [
          {
            index: true,
            element: <Navigate to="login" />, // Default to login if /authentication
          },
          {
            path: "login",
            element: <Login />, // Login page
          },
          {
            path: "register",
            element: <Register />, // Registration page
          },
        ],
      },
      {
        path: "homepage",
        element: <Homepage />, // Main homepage after login
      },
      {
        path: "myflats",
        element: <MyFlats />, // User's own flats
      },
      {
        path: "myprofile",
        element: <MyProfile />, // User profile
      },
      {
        path: "favourites",
        element: <Favourites />, // User's saved flats
      },
      {
        path: "inbox",
        element: <Inbox />, // Chat/inbox feature
      },
      {
        path: "all-users",
        element: <AdminRoute />, // Admin-only route wrapper
        children: [
          {
            path: "",
            element: <AllUsers />, // Admin user management
          },
        ],
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />, // Forgot password form
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />, // Password reset with token
      },
      {
        path: "/update-password",
        element: <UpdatePassword />, // Update password after login
      },
    ],
  },
];

// Create and export browser router instance
const Routes = createBrowserRouter(routesArray);

export default Routes;
