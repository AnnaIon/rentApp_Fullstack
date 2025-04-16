import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";
import { successToast, errorToast } from "../toastify/toastify";
import Navigation from "../authentication/Navigation";
import UserForm from "../components/Form";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post("/signup", userData);
      successToast("Register successful");
      setTimeout(() => navigate("/authentication/login"), 1500);
    } catch (err) {
      console.error(err);
      errorToast("Failed registration");
    } finally {
      setIsLoading(false);
    }
  };

  const registerFields = [
    { id: "firstName", label: "First Name", type: "text", placeholder: "Your first name" },
    { id: "lastName", label: "Last Name", type: "text", placeholder: "Your last name" },
    { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
    { id: "password", label: "Password", type: "password", placeholder: "Your password" },
    {
      id: "birthDate",
      label: "Birth Date",
      type: "date",
      max: new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0],
    },
  ];

  return (
    <>
      <UserForm
        formTitle="Register"
        fields={registerFields}
        userData={userData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitText="Sign Up"
      />
      <Navigation />
    </>
  );
};

export default Register;
