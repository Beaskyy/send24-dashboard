"use client";

import Image from "next/image";
import { useStateContext } from "@/contexts/ContextProvider";
import { Navigation } from "./Navigation";
import { Menu } from "lucide-react";
// import { ModeToggle } from "./mode-toggle";

const Header = ({headerText}: {headerText: string}) => {
  const { activeMenu, setActiveMenu } = useStateContext();
  return (
    <header
      className={`border-b border-[#06080933] fixed  z-20 w-full bg-white transition-all duration-300 ${
        activeMenu ? "lg:left-[252px] lg:w-custom" : "lg:left-0"
      }`}
    >
      <div className="flex justify-between items-center py-[26px]">
        <div className="pl-10">
          {activeMenu ? (
            <h5 className="hidden lg:flex text-sm font-normal leading-[20.3px] text-[#5D5D5D]">
              {headerText}
            </h5>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <div>
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={100}
                  height={28}
                  className="cursor-pointer"
                />
              </div>
              <div>
                {/* <Image
                  src="/images/keyboard_double_arrow_left.svg"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="cursor-pointer rotate-180"
                  onClick={() => setActiveMenu(!activeMenu)}
                /> */}
                <Menu
                className="cursor-pointer size-6"
                onClick={() => setActiveMenu(!activeMenu)}
              />
              </div>
            </div>
          )}
          <div className="lg:hidden">
            <Navigation />
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-4 pr-[34px]">
          {/* <Image
            src="/images/notifications_none.svg"
            alt="notifications"
            width={24}
            height={24}
            className="cursor-pointer"
          /> */}
          {/* <ModeToggle /> */}
          <div className="flex justify-center items-center gap-2 cursor-pointer">
            <div className="size-8 bg-[#f5f5f5] rounded-full">
              {/* <Image
                src="/images/profile.png"
                alt="profile"
                width={32}
                height={32}
              /> */}
              profile
            </div>
            <div>
              {/* <Image
                src="/images/expand_more.svg"
                alt="profile"
                width={20}
                height={20}
              /> */}
              expand
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
