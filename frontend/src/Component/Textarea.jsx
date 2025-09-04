import React from "react";

const Textarea = React.forwardRef(({ placeholder, rows = 4, ...rest }, ref) => {
  return (
    <textarea
      ref={ref}
      className="w-full h-full focus:outline-none resize-none"
      placeholder={placeholder}
      rows={rows}
      {...rest}
    />
  );
});

export default Textarea;
