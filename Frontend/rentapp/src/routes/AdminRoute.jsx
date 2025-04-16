import { Navigate, Outlet, useOutletContext } from "react-router-dom";

function AdminRoute() {  

    const { isAdmin,loading} = useOutletContext();

    if (loading) {
        return <div>Loading...</div>;
    }
    return isAdmin ? <Outlet /> : <Navigate to='/' />; 
}

export default AdminRoute;

