import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/providers/nextAuth";


const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],

})

export const metadata: Metadata = {
  title: "HerKey | India’s Largest Career Engagement Platform for Women",
  description: "HerKey nurtures, supports, and elevates women’s career aspirations with opportunities, learning and communities. Join HerKey now.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable}  antialiased`}
      >
        <NextAuthProvider>

          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
