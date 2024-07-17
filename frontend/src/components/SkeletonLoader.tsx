import { Skeleton } from "@mui/material";
import React from "react";

interface LoaderProps {
  type: "text" | "rectangular" | "rounded" | "circular";
  width: number;
  height: number;
  color: string;
}

const SkeletonLoader: React.FC<LoaderProps> = ({ type = "rectangular", width, height, color="#c3a0ff" }) => {
  return (
    <Skeleton
      variant={type}
      sx={{
        bgcolor: color,
        width: width,
        height: height,
      }}
    />
  );
};

export default SkeletonLoader;
