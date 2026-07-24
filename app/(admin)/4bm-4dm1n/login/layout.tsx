export const metadata = {
  title: "ABM | Backend Console",
  description: "ABM",
};

import "../../../globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;  
}) {
  return (
    <div lang="en" className={`antialiased`}>
      {children}
    </div>
  );
}
