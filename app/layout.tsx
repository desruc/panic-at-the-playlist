import type { Metadata } from "next";
import { Geist, Rock_Salt } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

const rockSalt = Rock_Salt({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Wedding Song Requests",
  description: "Request songs for our wedding reception playlist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
