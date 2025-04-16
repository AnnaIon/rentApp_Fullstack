import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Routes = [
  { label: "Login", icon: <FaSignInAlt />, path: "/authentication/login" },
  { label: "Register", icon: <FaUserPlus />, path: "/authentication/register" },
];

const Navigation = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const routeIndex = Routes.findIndex((route) =>
      location.pathname.includes(route.path)
    );
    if (routeIndex !== -1) {
      setValue(routeIndex);
    }
  }, [location.pathname]);

  const handleChange = (newValue) => {
    setValue(newValue);
    navigate(Routes[newValue].path);
  };

  return (
    <div className="w-full bg-white/20 backdrop-blur-md rounded-xl shadow-lg max-w-md mt-2">
      <div className="flex justify-around items-center p-3">
        {Routes.map((route, index) => (
          <button
            key={route.path}
            onClick={() => handleChange(index)}
            className={`flex flex-col items-center px-4 py-2 transition duration-200 ${
              value === index ? "font-bold text-white" : "text-white/70"
            } hover:text-white`}
          >
            <div className="text-2xl mb-1">{route.icon}</div>
            <span className="text-sm">{route.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
