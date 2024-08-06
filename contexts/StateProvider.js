"use client";

import { createContext, useContext, useState } from "react";

const StateContext = createContext();

let token;
if (typeof window !== "undefined") {
  // Check if window (client-side) is available
  token = localStorage.getItem("authUser"); // Use localStorage if available
} else {
  token = ""; // Set a default value or handle differently for server-side rendering
}

export const ContextProvider = ({ children }) => {
  return (
    <StateContext.Provider
      value={{
        token,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
