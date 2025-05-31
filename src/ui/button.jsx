import React from 'react';
import './button.css';

export const Button = ({ children, type = 'button', className = '', ...props }) => {
  return (
    <button 
      type={type} 
      className={`ui-button ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};