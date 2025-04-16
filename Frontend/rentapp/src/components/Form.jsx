import React from "react";

const UserForm = ({
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
    <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden w-full max-w-md">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-lg">
          {formTitle}
        </h2>
        <form onSubmit={onSubmit} className="space-y-5">
          {fields.map(({ id, label, type, placeholder, ...rest }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-white font-medium mb-2"
              >
                {label}
              </label>
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

          {extraContent && <div>{extraContent}</div>}

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
