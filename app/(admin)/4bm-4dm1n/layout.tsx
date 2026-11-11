import type { Metadata } from "next";
import "../../../app/globals.css";
import "./admin-fonts.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "ABM | Backend Console",
  description: "ABM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`admin-console antialiased overflow-hidden`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
