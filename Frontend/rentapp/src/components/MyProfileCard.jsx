import React from "react";

// Reusable profile card form component for displaying and updating user info
const MyProfileCard = ({
  formTitle,      // Title at the top of the form (e.g. "My Profile")
  fields,         // Array of field configs: id, label, type, placeholder, etc.
  userData,       // Current user data (used to populate input values)
  onChange,       // Handler for input change events
  onSubmit,       // Handler for form submission
  isLoading,      // Boolean for showing loading state on submit button
  submitText,     // Text displayed on the submit button
  extraContent,   // Optional extra JSX below the form (e.g. edit/delete buttons)
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition duration-300 ease-in-out transform text-center w-full max-w-md">
      {/* Form title */}
      <h2 className="text-2xl font-bold mb-6 text-orange-600 drop-shadow-sm">
        {formTitle}
      </h2>

      {/* Form fields */}
      <form onSubmit={onSubmit} className="space-y-5 text-left">
        {fields.map(({ id, label, type, placeholder, ...rest }) => (
          <div key={id}>
            {/* Input label */}
            <label htmlFor={id} className="block text-sm font-semibold mb-1 text-gray-700">
              {label}
            </label>

            {/* Input field */}
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

        {/* Extra content (optional) */}
        {extraContent && <div>{extraContent}</div>}

        {/* Submit button */}
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
