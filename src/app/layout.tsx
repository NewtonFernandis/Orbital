import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Orbital",
  description:
    "Orbital uses TLE data to bring real-time tracking of satellites at your fingertips. Follow their paths across Earth with absolute precision.",
  icons: [
    {
      rel: "icon",
      url: "https://cdn-icons-png.flaticon.com/512/7579/7579604.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
