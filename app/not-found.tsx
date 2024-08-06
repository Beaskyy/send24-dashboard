import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
      <div className="flex justify-center items-center h-screen gap-x-6">
        <div className="border-r px-6">
          <h4 className="text-[#555555]">404</h4>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-1">Page Not Found</h1>
          <p className="text-sm text-[#444444] ">
            This page is temporarily unavailable.
          </p>
          <Link
            href="/"
            className="mt-4 text-xs text-[#E87000]"
          >
            Back to Home
          </Link>
        </div>
      </div>
  );
};

export default NotFound;
