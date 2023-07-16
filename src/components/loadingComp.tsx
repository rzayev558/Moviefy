import React from "react";
import loadingGif from "../assets/loading.svg";
import { relative } from "path";

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <img
        style={{
          width: 200,
          height: 200,
        }}
        src={loadingGif.src}
        alt="Loading"
      />
    </div>
  );
};

export default Loading;
