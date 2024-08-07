"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useStateContext } from "@/contexts/ContextProvider";
import { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [headerText, setHeaderText] = useState("Dashboard");
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  return (
    <main>
      <div
        className="flex relative"
        onClick={() => {
          if (activeMenu) {
            handleCloseSidebar();
          }
        }}
      >
        {activeMenu && (
          <div className="w-[252px] fixed z-50 bg-white left-0">
            <Sidebar setHeaderText={setHeaderText} />
          </div>
        )}
        <div
          className={`min-h-screen w-full ${
            activeMenu ? "lg:ml-64" : "flex-2"
          }`}
        >
          <div className="fixed lg:static w-full z-20">
            <Header headerText={headerText} />
          </div>
        </div>
        <div
          className={`absolute top-20 transition-all duration-300 ${
            activeMenu
              ? "lg:w-custom w-full overflow-hidden lg:left-[252px]"
              : "w-full lg:left-0"
          }`}
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
