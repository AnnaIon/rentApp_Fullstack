import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { successToast, errorToast } from "../toastify/toastify";
import api from "../services/axios";
import Navigation from "../authentication/Navigation";
import UserForm from "../components/Form";
import Cookies from "js-cookie"; // For managing auth token cookies

const Login = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuth(); // Access context to update auth state

  // State to store form input values
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");         // Error or info message
  const [isLoading, setIsLoading] = useState(false);  // Loading state for submit button

  // Handle form field changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(""); // Reset error message

    try {
      // Attempt to log in the user
      const res = await api.post("/login", userData);

      // On successful login
      if (res.data.status === "success") {
        Cookies.set("token", res.data.token, { expires: 7 }); // Store token in cookies
        await fetchUser(); // Refresh user info in context
        successToast("Login successful");
        setTimeout(() => navigate("/homepage"), 1000); // Redirect to homepage
      } else {
        // Login failed but request succeeded
        errorToast(res.data.message || "Login failed.");
        setMessage(res.data.message || "Login failed.");
      }
    } catch (err) {
      // Handle unexpected errors
      const errorMsg =
        err.response?.data?.message || "Something went wrong while logging in.";
      errorToast(errorMsg);
      setMessage(errorMsg);
    } finally {
      setIsLoading(false); // Re-enable button
    }
  };

  // Fields to be rendered in the login form
  const loginFields = [
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Your password",
    },
  ];

  return (
    <>
      {/* Login form using reusable UserForm component */}
      <UserForm
        formTitle="Log In"
        fields={loginFields}
        userData={userData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitText="Log In"
        extraContent={
          message && <p className="text-red-200 text-sm text-center">{message}</p>
        }
      />
      
      {/* Login/Register navigation */}
      <Navigation />
    </>
  );
};

export default Login;
