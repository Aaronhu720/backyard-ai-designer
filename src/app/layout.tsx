import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Backyard AI Designer — Transform Your Backyard with AI",
  description:
    "Upload your backyard photo, choose your style, and get AI-generated makeover designs with budget estimates in minutes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50">{children}</body>
    </html>
  );
}
