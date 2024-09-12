import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ContextProvider } from "@/contexts/ContextProvider";
import ClientOnly from "@/components/ClientOnly";
import { SWRProvider } from "@/providers/swr-provider";

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
        <ClientOnly>
          <Toaster />
          <ContextProvider>
            <SWRProvider>{children}</SWRProvider>
          </ContextProvider>
        </ClientOnly>
      </body>
      <Toaster />
    </html>
  );
}
