import React from "react";

const MyProfileCard = ({
  formTitle,
  fields,
  userData,
  onChange,
  onSubmit,
  isLoading,
  submitText,
  extraContent,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition duration-300 ease-in-out transform text-center w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-orange-600 drop-shadow-sm">
        {formTitle}
      </h2>
      <form onSubmit={onSubmit} className="space-y-5 text-left">
        {fields.map(({ id, label, type, placeholder, ...rest }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-sm font-semibold mb-1 text-gray-700">
              {label}
            </label>
            <input
              type={type}
              id={id}
              name={id}
              value={userData[id] || ""}
              onChange={onChange}
              placeholder={placeholder}
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              {...rest}
            />
          </div>
        ))}

        {extraContent && <div>{extraContent}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded-md font-semibold transition shadow-md ${
            isLoading
              ? "bg-orange-200 text-white cursor-not-allowed"
              : "bg-orange-600 text-white hover:bg-orange-700"
          }`}
        >
          {isLoading ? "Please wait..." : submitText}
        </button>
      </form>
    </div>
  );
};

export default MyProfileCard;
