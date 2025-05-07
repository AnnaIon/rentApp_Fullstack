import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";
import { successToast, errorToast } from "../toastify/toastify";
import Navigation from "../authentication/Navigation";
import UserForm from "../components/Form";

const Register = () => {
  const navigate = useNavigate(); // React Router navigation hook

  // State to manage form input values
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Indicates whether the form is submitting

  // Handle input changes and update state accordingly
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };

  // Handle form submission and register the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading indicator
    try {
      await api.post("/signup", userData); // Send registration data to backend
      successToast("Register successful"); // Show success toast
      setTimeout(() => navigate("/authentication/login"), 1500); // Redirect to login after short delay
    } catch (err) {
      console.error(err);
      errorToast("Failed registration"); // Show error toast if registration fails
    } finally {
      setIsLoading(false); // Stop loading indicator
    }
  };

  // Fields to render in the form
  const registerFields = [
    { id: "firstName", label: "First Name", type: "text", placeholder: "Your first name" },
    { id: "lastName", label: "Last Name", type: "text", placeholder: "Your last name" },
    { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
    { id: "password", label: "Password", type: "password", placeholder: "Your password" },
    {
      id: "birthDate",
      label: "Birth Date",
      type: "date",
      // Limit date input to only allow users 18+ years old
      max: new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0],
    },
  ];

  return (
    <>
      {/* Form Component with dynamic fields and handlers */}
      <UserForm
        formTitle="Register"
        fields={registerFields}
        userData={userData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitText="Sign Up"
      />

      {/* Navigation bar for login/register switching */}
      <Navigation />
    </>
  );
};

export default Register;
