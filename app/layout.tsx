import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ContextProvider } from "@/contexts/ContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Send 24 Admin Dashboard",
  description: "Admin Dashboard for Send 24",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ContextProvider>{children}</ContextProvider>
      </body>
      <Toaster />
    </html>
  );
}
