"use client";

import { Button } from "@/components/ui/button";
import { useStateContext } from "@/contexts/StateProvider";
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
    <main className="flex justify-center items-center h-screen">
      <Button variant="outline">Send 24</Button>
    </main>
  );
}
