import React from 'react';

/**
 * Reusable Input component
 */
const Input = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = null,
  icon = null,
  required = false,
  disabled = false,
  className = '',
  autoFocus = false,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
        >
          {icon && <span className="mr-1 text-indigo-500">{icon}</span>}
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
        className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
          error 
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// Create a textarea variant
const Textarea = ({
  id,
  label,
  placeholder = '',
  value,
  onChange,
  error = null,
  icon = null,
  required = false,
  disabled = false,
  className = '',
  rows = 3,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
        >
          {icon && <span className="mr-1 text-indigo-500">{icon}</span>}
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200 ${
          error 
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500'
        } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

Input.Textarea = Textarea;

export default Input;