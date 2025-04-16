import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "../services/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = Cookies.get("token");
    console.log("🧪 Checking token from cookies:", token);
  
    if (!token) {
      console.log("❌ No token found. Logging out.");
      setUser(null);
      setLoading(false);
      return;
    }
  
    try {
      const response = await api.get("/me");
      console.log("✅ User fetched from /me:", response.data.data);
      setUser(response.data.data);
    } catch (error) {
      console.error("❌ Error fetching user on refresh:", error);
      Cookies.remove("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
