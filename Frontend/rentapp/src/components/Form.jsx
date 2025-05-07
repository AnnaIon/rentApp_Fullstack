import React from "react";

// Reusable user form component used for login, registration, etc.
const UserForm = ({
  formTitle,     // Title displayed at the top of the form
  fields,        // Array of field objects (id, label, type, etc.)
  userData,      // Current form values
  onChange,      // Function to handle input changes
  onSubmit,      // Function to handle form submission
  isLoading,     // Boolean to indicate loading/submitting state
  submitText,    // Button text
  extraContent,  // Optional additional JSX (e.g., error message, links)
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden w-full max-w-md">
      <div className="p-8">
        {/* Form header */}
        <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-lg">
          {formTitle}
        </h2>

        {/* Form element */}
        <form onSubmit={onSubmit} className="space-y-5">
          {fields.map(({ id, label, type, placeholder, ...rest }) => (
            <div key={id}>
              {/* Input label */}
              <label htmlFor={id} className="block text-white font-medium mb-2">
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
                className="w-full px-4 py-2 rounded-md border border-white/40 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/80 transition"
                {...rest}
              />
            </div>
          ))}

          {/* Optional extra content (e.g., error message, links) */}
          {extraContent && <div>{extraContent}</div>}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-md font-semibold transition shadow-md ${
              isLoading
                ? "bg-white/30 text-white cursor-not-allowed"
                : "bg-white text-black hover:bg-white/90"
            }`}
          >
            {isLoading ? "Please wait..." : submitText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
