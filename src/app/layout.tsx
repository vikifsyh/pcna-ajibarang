import NextAuthProvider from "@/components/auth/authProvider";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Metadata } from "next";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PCNA Ajibarang - Website Resmi PCNA Ajibarang",
  description: "Website Resmi PCNA Ajibarang",
  icons: {
    icon: "/image/footer.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} bg-white`}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
