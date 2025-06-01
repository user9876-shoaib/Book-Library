import React from 'react';

export const Table = ({ className = '', children, ...props }) => {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={`w-full caption-bottom text-sm ${className}`}
        {...props}
      >
        {children}
      </table>
    </div>
  );
};

export const TableHeader = ({ className = '', children, ...props }) => {
  return (
    <thead className={`border-b ${className}`} {...props}>
      {children}
    </thead>
  );
};

export const TableBody = ({ className = '', children, ...props }) => {
  return (
    <tbody className={`last:border-0 ${className}`} {...props}>
      {children}
    </tbody>
  );
};

export const TableHead = ({ className = '', children, ...props }) => {
  return (
    <th
      className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground ${className}`}
      {...props}
    >
      {children}
    </th>
  );
};

export const TableRow = ({ className = '', children, ...props }) => {
  return (
    <tr
      className={`border-b transition-colors hover:bg-muted/50 ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
};

export const TableCell = ({ className = '', children, ...props }) => {
  return (
    <td
      className={`p-4 align-middle ${className}`}
      {...props}
    >
      {children}
    </td>
  );
};