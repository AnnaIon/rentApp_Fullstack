
import { Outlet } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";




function App() {
	const { user, loading } = useAuth();

	return(
		<>
<Outlet context={{ currentUser: user, isAdmin: user?.role === "admin", loading }} />
<ToastContainer/>

		</>
	)
}

export default App;
