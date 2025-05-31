import React from 'react';
import './label.css';

export const Label = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={`ui-label ${className}`}
      {...props}
    />
  );
});

Label.displayName = 'Label';