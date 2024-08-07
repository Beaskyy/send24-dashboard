"use client";

import { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
  userProfile: false,
  notification: false,
  // info: {},
};

let token;
if (typeof window !== "undefined") {
  // Check if window (client-side) is available
  token = localStorage.getItem("authUser"); // Use localStorage if available
} else {
  token = ""; // Set a default value or handle differently for server-side rendering
}

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);

  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };
  return (
    <StateContext.Provider
      value={{
        token,
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        // info,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
