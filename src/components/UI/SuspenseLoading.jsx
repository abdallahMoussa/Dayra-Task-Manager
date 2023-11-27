import React from "react";
import Loading from "./Loading";

const SuspenseLoading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loading />
    </div>
  );
};

export default SuspenseLoading;
