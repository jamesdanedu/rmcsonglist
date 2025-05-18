import React from 'react';

/**
 * Reusable Button component
 */
const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  disabled = false,
  fullWidth = false,
  className = '',
  icon = null,
  iconPosition = 'left'
}) => {
  // Base styling for all buttons
  const baseStyles = "py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center";
  
  // Variant-specific styling
  const variantStyles = {
    primary: "bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-600 focus:ring-indigo-500 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
    secondary: "bg-gradient-to-r from-gray-200 to-gray-100 text-gray-800 hover:from-gray-300 hover:to-gray-200 focus:ring-gray-400 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
    success: "bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-700 hover:to-emerald-600 focus:ring-green-500 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
    danger: "bg-gradient-to-r from-red-600 to-pink-500 text-white hover:from-red-700 hover:to-pink-600 focus:ring-red-500 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed",
    text: "bg-transparent text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed",
    icon: "p-3 bg-white border border-gray-200 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
  };
  
  // Width styling
  const widthStyles = fullWidth ? "w-full" : "";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

// Creating additional button variants
Button.Primary = (props) => <Button {...props} variant="primary" />;
Button.Secondary = (props) => <Button {...props} variant="secondary" />;
Button.Success = (props) => <Button {...props} variant="success" />;
Button.Danger = (props) => <Button {...props} variant="danger" />;
Button.Text = (props) => <Button {...props} variant="text" />;
Button.Icon = (props) => <Button {...props} variant="icon" />;

export default Button;