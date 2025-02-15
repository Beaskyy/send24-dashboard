"use client";

import Image from "next/image";
import { useStateContext } from "@/contexts/ContextProvider";
import { Navigation } from "./Navigation";
import { Bell, ChevronDown, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  return (
    <header
      className={`fixed  z-20 w-full bg-[#FAFBFC] transition-all duration-300 shadow-lg shadow-primary/5 ${
        activeMenu ? "lg:left-[252px] lg:w-custom" : "lg:left-0"
      }`}
    >
      <div className="flex justify-between items-center py-[26px]">
        <div className="pl-10">
          
          <div className="lg:hidden">
            <Navigation />
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 pr-[34px]">
          <Bell className="size-6 text-[#5D5D5D]" />
          <div className="flex justify-center items-center gap-2 cursor-pointer">
            <div className="size-8 bg-[#f5f5f5] rounded-full flex justify-center items-center">
              A
            </div>
            <div className="flex">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <ChevronDown className="text-[#5D5D5D] size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
