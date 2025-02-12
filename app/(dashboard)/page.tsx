"use client";

import Overview from "@/components/Overview";
import token from "@/lib/access-token";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (!token) {
      redirect("/login");
    }
  }, [token]);
  return (
    <main className="mt-8 lg:ml-10 lg:mr-9 mx-4">
      <Overview />
    </main>
  );
}
