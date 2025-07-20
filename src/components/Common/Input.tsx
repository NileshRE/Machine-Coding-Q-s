import React from 'react';

const Input = React.forwardRef<
  // Forwarding Ref to use UseRef in component
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      className="text-lg border border-gray-500 rounded-md p-2 w-12 text-center font-medium"
      {...props}
    />
  );
});

export default Input;
