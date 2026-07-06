import type { Metadata } from "next";
import "../globals.css";
import LenisProvider from "../components/client/layout/LenisProvider";
import Header from "../components/client/layout/Header";
import Footer from "../components/client/layout/Footer";
import IntroAnimation from "../components/client/animations/IntroAnimation";

export const metadata: Metadata = {
  title: "ABM",
  description: "The Future of Construction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html style={{ overflow: "hidden" }} className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <IntroAnimation />
          <Header />
          {children}
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
