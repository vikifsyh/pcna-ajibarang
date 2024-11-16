import "./globals.css";
import Navbar from "@/components/fragments/Navbar";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
