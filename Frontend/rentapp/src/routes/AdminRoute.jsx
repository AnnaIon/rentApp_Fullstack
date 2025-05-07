import { Navigate, Outlet, useOutletContext } from "react-router-dom";

/**
 * AdminRoute - A route guard component that restricts access to admin-only routes.
 * It uses React Router's <Outlet /> to render child routes if the user is an admin.
 * If not, it redirects the user to the home page.
 */
function AdminRoute() {
  // Access admin status and loading state from parent outlet context
  const { isAdmin, loading } = useOutletContext();

  // Show a loading state until admin status is resolved
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is admin, render nested routes; otherwise, redirect to home
  return isAdmin ? <Outlet /> : <Navigate to='/' />;
}

export default AdminRoute;
