"use client";

import { useMedia } from "react-use";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { links } from "@/lib/data";
import Image from "next/image";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const isMobile = useMedia("(max-width: 1024px)", false);

  const handleClick = (name: string) => {
    setActiveLink(name);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            variant="outline"
            size="sm"
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
          >
            <Menu className="size-4 text-black" size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col justify-between h-screen px-4">
          <div>
            <div className="pb-10">
              <div>
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={36}
                  height={28}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <nav className="flex flex-col gap-y-2 pt-6">
              {links?.map(({ main, subMenu }) => (
                <div className="mb-6" key={main}>
                  <div>
                    <p className={`text-sm text-[#7A7C7B] font-normal mb-4`}>
                      {main}
                    </p>
                  </div>
                  {subMenu?.map(({ name, icon, href }) => (
                    <div key={name}>
                      <Link
                        href={href}
                        className={`h-8 pt-1.5 pr-[103px] pb-1.5 flex items-center rounded-lg mb-2 cursor-pointer ${
                          activeLink === name
                            ? "bg-[#071A7E0D]"
                            : "hover:bg-[#071A7E0D]"
                        }`}
                        onClick={() => handleClick(name)}
                      >
                        <p className="flex justify-start items-center gap-2 px-2">
                          <Image src={icon} alt="icon" width={20} height={20} />
                          <span
                            className={`text-sm font-normal whitespace-nowrap ${
                              activeLink === name
                                ? "text-[#071A7E]"
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
            </nav>
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
        </SheetContent>
      </Sheet>
    );
  }
  return null
};
