import React from "react";

const Input = React.forwardRef(({ type, placeholder, ...rest },ref) => {
  return (
    <input
      ref={ref}
      className="w-full h-full focus:outline-none"
      type={type}
      placeholder={placeholder}
      {...rest}
    />
  );
})

export default Input;
