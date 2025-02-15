"use client";

import { useStateContext } from "@/contexts/ContextProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { links } from "@/lib/data";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const { activeMenu, setActiveMenu, setScreenSize } =
    useStateContext();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  const handleClick = (name: string) => {
    setActiveLink(name);
  };

  return (
    <div
      className={`hidden bg-white lg:flex flex-col justify-between border-r border-[#E1E2E6] min-h-screen h-screen lg:overflow-hidden overflow-auto lg:hover:overflow-auto px-4 z-50 shrink-0 pb-[34px] transition ease-in duration-1000 ${
        !activeMenu ? "lg:hidden" : ""
      }`}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center pt-6 pb-10 bg-white">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={100}
              height={28}
              className="cursor-pointer"
            />
          </Link>
          <div>
            {activeMenu && (
              <button
                aria-label="Toggle menu"
                onClick={() => setActiveMenu(!activeMenu)}
              >
                <Menu className="cursor-pointer size-6" />
              </button>
            )}
          </div>
        </div>
        {links?.map(({ main, subMenu }) => (
          <div className="mb-6" key={main}>
            <div>
              <p className={`text-sm text-[#7A7C7B] font-normal mb-4`}>
                {main}
              </p>
            </div>
            {subMenu?.map(({ name, icon, icon2, href }) => (
              <div key={name}>
                <Link
                  href={href}
                  className={`h-10 pt-1.5 pr-[103px] pb-1.5 flex items-center rounded-lg mb-2 cursor-pointer ${
                    pathname === href
                      ? "bg-[#FFEBEE]"
                      : "hover:bg-[#FFEBEE]"
                  }`}
                  onClick={() => handleClick(name)}
                >
                  <p className="flex justify-start items-center gap-2 px-2">
                    <Image
                      src={activeLink === name ? icon2 : icon}
                      alt="icon"
                      width={20}
                      height={20}
                    />
                    <span
                      className={`text-sm font-medium whitespace-nowrap ${
                        pathname === href
                          ? "text-primary"
                          : "text-[#060809]"
                      }`}
                    >
                      {name}
                    </span>
                  </p>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="py-3 px-4 border border-[#E1E2E6] rounded-md flex justify-start items-center gap-2">
        <div className="size-10 bg-[#FEF3F2] flex shrink-0 justify-center items-center rounded-full">
          <p className="text-black text-sm font-medium leading-5">N.H</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <div>
            <h6 className="text-sm font-medium leading-[21px]">Chris</h6>
            <p className="text-xs text-[#555] font-light leading-[14px]">
              Nguvu Health LLC
            </p>
          </div>
          <div>
            <Image
              src="/images/expand_more.svg"
              alt="profile"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;