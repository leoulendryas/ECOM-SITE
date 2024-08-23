import type { Metadata } from "next";
import { Poppins, Lato } from "next/font/google"; 
import "./globals.css";
import '../utils/fontawesome';

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Brand Name",
  description: "Description about brand.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${lato.className}`}>
        {children}
      </body>
    </html>
  );
}
