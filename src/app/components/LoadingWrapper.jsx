"use client";
import React from "react";
import LoadingComponent from "./Loading";
import { OAuth } from "../(auth)/configs/Auth";

const LoadingWrapper = ({ children }) => {
  const { Loading } = OAuth();
  if (Loading) {
    return (
      <div className="w-full h-screen fixed top-0 left-0 right-0 bottom-0">
        <LoadingComponent />
      </div>
    );
  }
  return children;
};

export default LoadingWrapper;
