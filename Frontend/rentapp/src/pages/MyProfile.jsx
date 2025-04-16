import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import UserForm from "../components/Form";
import { useAuth } from "../context/AuthContext";
import api from "../services/axios";
import { successToast, errorToast } from "../toastify/toastify";
import MyProfileCard from "../components/MyProfileCard";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user, fetchUser } = useAuth();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        birthDate: user.birthDate?.split("T")[0] || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const { data } = await api.put("/profile/update", userData);
      successToast("Profile updated!");
      await fetchUser();
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      errorToast("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const profileFields = [
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Your first name",
      readOnly: !isEditing,
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Your last name",
      readOnly: !isEditing,
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
      readOnly: true, 
    },
    {
      id: "birthDate",
      label: "Birth Date",
      type: "date",
      readOnly: !isEditing,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 via-white to-gray-100 pb-10">
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-6">
          <MyProfileCard
            formTitle="My Profile"
            fields={profileFields}
            userData={userData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isLoading={isSaving}
            submitText="Save Changes"
            extraContent={
              <>
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="w-full py-2 mt-4 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 transition shadow"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
            
                <button
                  onClick={() => navigate("/update-password")}
                  className="w-full py-2 mt-2 rounded-md bg-gray-700 text-white font-semibold hover:bg-gray-800 transition shadow"
                >
                  Update Password
                </button>
            
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="w-full py-2 mt-2 rounded-md bg-gray-500 text-white font-semibold hover:bg-gray-600 transition shadow"
                >
                  Forgot Password
                </button>
              </>
            }
            
          />
        </div>
      </div>
      
    </div>
  );
};

export default MyProfile;
