import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@/NextAuthProvider";
import MainHeader from "@/components/navbar/MainHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gym web app",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainHeader></MainHeader>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
