import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", containerClassName = "", children, ...props }, ref) => {
    return (
      <div className={containerClassName}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-200"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          {...props}
          className={`mt-1 block w-full px-4 py-3 bg-white/5 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm
            ${error
              ? "border-red-400 focus:ring-red-400"
              : "border-gray-300/50 focus:ring-indigo-400 focus:border-indigo-400"}
            ${className}`}
        />

        {children}

        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
