"use client";

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
    <main>
      <Button variant="outline">Send 24</Button>
    
      <LayoutGrid className="text-sky-500 size-6" />
    </main>
  );
}
