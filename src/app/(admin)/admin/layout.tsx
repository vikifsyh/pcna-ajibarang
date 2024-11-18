import Sidebar from "@/components/fragments/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <div className="flex items-center w-full bg-neutral-100">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
