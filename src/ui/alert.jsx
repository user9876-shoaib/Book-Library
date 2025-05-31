import React from 'react';
import './alert.css';

export const Alert = ({ className = '', children, ...props }) => {
  return (
    <div
      role="alert"
      className={`ui-alert ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const AlertDescription = ({ className = '', ...props }) => {
  return (
    <div
      className={`ui-alert-description ${className}`}
      {...props}
    />
  );
};