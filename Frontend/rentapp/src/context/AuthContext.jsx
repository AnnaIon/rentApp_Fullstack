import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../services/axios";

// Create the AuthContext to manage user authentication state
const AuthContext = createContext();

// Provider component to wrap around the app and supply auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // Holds the logged-in user data
  const [loading, setLoading] = useState(true); // Tracks loading state while fetching user

  // Fetch the currently authenticated user from the server using the stored token
  const fetchUser = async () => {
    const token = Cookies.get("token");
    console.log("🧪 Checking token from cookies:", token);

    // If no token exists, treat as logged out
    if (!token) {
      console.log("❌ No token found. Logging out.");
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      // Make request to protected endpoint to retrieve user data
      const response = await api.get("/me");
      console.log("✅ User fetched from /me:", response.data.data);
      setUser(response.data.data);
    } catch (error) {
      // On error (e.g., invalid token), remove token and clear user state
      console.error("❌ Error fetching user on refresh:", error);
      Cookies.remove("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Logout function: removes token and clears user state
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  // Run once on component mount to check for an existing session
  useEffect(() => {
    fetchUser();
  }, []);

  // Provide auth state and actions to child components
  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access the auth context in any component
export const useAuth = () => useContext(AuthContext);
