import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shivani Rupnawar - Full Stack Software Engineer",
  description:
    "Portfolio of Shivani Rupnawar - Full Stack Software Engineer specializing in React, Node.js, PostgreSQL, and modern web technologies",
  keywords: ["web developer", "full stack", "React", "Node.js", "portfolio"],
  authors: [{ name: "Shivani Rupnawar" }],
  openGraph: {
    title: "Shivani Rupnawar - Full Stack Software Engineer",
    description: "Portfolio showcasing my work and projects",
    url: "https://yourwebsite.com",
    siteName: "Shivani Rupnawar Portfolio",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
