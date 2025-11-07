import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full min-h-full">
      <Loader className="m-auto animate-spin" />
    </div>
  );
};

export default Loading;
