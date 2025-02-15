import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ContextProvider } from "@/contexts/ContextProvider";
import ClientOnly from "@/components/ClientOnly";
import Providers from "@/providers/provider";

const manrope = Manrope({ subsets: ["latin"] });

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
      <body className={manrope.className}>
        <ClientOnly>
          <Toaster />
          <ContextProvider>
            <Providers>{children}</Providers>
          </ContextProvider>
        </ClientOnly>
      </body>
      <Toaster />
    </html>
  );
}
