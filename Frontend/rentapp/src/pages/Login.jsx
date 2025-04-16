import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { successToast, errorToast } from "../toastify/toastify";
import api from "../services/axios";
import Navigation from "../authentication/Navigation";
import UserForm from "../components/Form";
import Cookies from "js-cookie"; // Make sure it's imported at the top

const Login = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const [userData, setUserData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await api.post("/login", userData);
      if (res.data.status === "success") {
        Cookies.set("token", res.data.token, { expires: 7 });
        await fetchUser();
        successToast("Login successful");
        setTimeout(() => navigate("/homepage"), 1000);
      } else {
        errorToast(res.data.message || "Login failed.");
        setMessage(res.data.message || "Login failed.");
      }
      
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Something went wrong while logging in.";
      errorToast(errorMsg);
      setMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

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
      <Navigation />
    </>
  );
};

export default Login;
