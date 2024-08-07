"use client";

import Overview from "@/components/Overview";
import { Button } from "@/components/ui/button";
import { useStateContext } from "@/contexts/ContextProvider";
import { LayoutGrid } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { token } = useStateContext();
  useEffect(() => {
    if (!token) {
      redirect("/login");
    }
  }, [token]);
  return (
    <main className="lg:mt-[52px] mt-8 lg:ml-10 lg:mr-9 mx-4">
      <Overview />
    </main>
  );
}
